import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import {
  ADMIN_COOKIE,
  isAdminAuthEnabled,
  isValidAdminToken,
} from "../../../lib/adminAuth";
import { isValidProductArea } from "../../../lib/productOptions";

const PRODUCT_IMAGES_BUCKET = "prodotti";

function isAuthorized(request) {
  if (!isAdminAuthEnabled()) {
    return true;
  }

  return isValidAdminToken(request.cookies.get(ADMIN_COOKIE)?.value);
}

function unauthorized() {
  return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
}

function getRequiredString(formData, key) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function getCleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isUploadedFile(value) {
  return (
    value &&
    typeof value.name === "string" &&
    typeof value.size === "number" &&
    value.size > 0
  );
}

async function uploadProductImage(imageFile) {
  const safeName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const fileName = `${Date.now()}-${safeName}`;
  const { error: uploadError } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(fileName, imageFile);

  if (uploadError) {
    throw uploadError;
  }

  const { data: publicUrlData } = supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

async function uploadProductImages(imageFiles) {
  const imageUrls = [];

  for (const imageFile of imageFiles) {
    imageUrls.push(await uploadProductImage(imageFile));
  }

  return imageUrls;
}

function getProductStoragePath(imageUrl) {
  try {
    const url = new URL(imageUrl);
    const marker = `/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/`;
    const markerIndex = url.pathname.indexOf(marker);

    if (markerIndex === -1) {
      return null;
    }

    return decodeURIComponent(url.pathname.slice(markerIndex + marker.length));
  } catch {
    return null;
  }
}

function getRemovedProductImagePaths(previousImages, nextImages) {
  const nextImageSet = new Set(nextImages);

  return [
    ...new Set(
      previousImages
        .filter((imageUrl) => !nextImageSet.has(imageUrl))
        .map(getProductStoragePath)
        .filter(Boolean)
    ),
  ];
}

async function removeProductImages(imagePaths) {
  if (imagePaths.length === 0) {
    return;
  }

  const { error } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .remove(imagePaths);

  if (error) {
    console.error(error);
  }
}

function parseStringArray(value) {
  if (typeof value !== "string") {
    return [];
  }

  try {
    const parsedValue = JSON.parse(value);

    return Array.isArray(parsedValue)
      ? parsedValue.filter((item) => typeof item === "string" && item)
      : [];
  } catch {
    return [];
  }
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return unauthorized();
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Errore caricamento prodotti" },
      { status: 500 }
    );
  }

  return NextResponse.json({ products: data || [] });
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return unauthorized();
  }

  const formData = await request.formData();
  const imageFiles = [
    ...formData.getAll("images"),
    ...formData.getAll("image"),
  ].filter(isUploadedFile);
  const code = getRequiredString(formData, "code");
  const title = getRequiredString(formData, "title");
  const area = getRequiredString(formData, "area");
  const price = Number(getRequiredString(formData, "price"));

  if (
    !code ||
    !title ||
    !isValidProductArea(area) ||
    imageFiles.length === 0 ||
    !Number.isFinite(price)
  ) {
    return NextResponse.json(
      { error: "Codice, titolo, area, prezzo e immagine sono obbligatori" },
      { status: 400 }
    );
  }

  let imageUrls;

  try {
    imageUrls = await uploadProductImages(imageFiles);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Errore upload immagine" },
      { status: 500 }
    );
  }

  const { error } = await supabase.from("products").insert([
    {
      code,
      title,
      label: getRequiredString(formData, "label"),
      area,
      category: getRequiredString(formData, "category"),
      period: getRequiredString(formData, "period"),
      price,
      material: getRequiredString(formData, "material"),
      dimensions: getRequiredString(formData, "dimensions"),
      condition: getRequiredString(formData, "condition"),
      description: getRequiredString(formData, "description"),
      images: imageUrls,
      available: true,
    },
  ]);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Errore inserimento prodotto" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function PATCH(request) {
  if (!isAuthorized(request)) {
    return unauthorized();
  }

  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const id = getRequiredString(formData, "id");
    const title = getRequiredString(formData, "title");
    const area = getRequiredString(formData, "area");
    const price = Number(getRequiredString(formData, "price"));
    const imageFiles = [
      ...formData.getAll("images"),
      ...formData.getAll("image"),
    ].filter(isUploadedFile);
    const imagesToKeep = parseStringArray(formData.get("imagesToKeep"));

    if (!id) {
      return NextResponse.json(
        { error: "Richiesta non valida" },
        { status: 400 }
      );
    }

    if (!title || !isValidProductArea(area) || !Number.isFinite(price)) {
      return NextResponse.json(
        { error: "Titolo, area e prezzo valido sono obbligatori" },
        { status: 400 }
      );
    }

    if (imagesToKeep.length === 0 && imageFiles.length === 0) {
      return NextResponse.json(
        { error: "Mantieni o aggiungi almeno un'immagine" },
        { status: 400 }
      );
    }

    const { data: existingProduct, error: existingProductError } =
      await supabase
        .from("products")
        .select("images")
        .eq("id", id)
        .maybeSingle();

    if (existingProductError) {
      console.error(existingProductError);
      return NextResponse.json(
        { error: "Errore caricamento prodotto" },
        { status: 500 }
      );
    }

    const previousImages = Array.isArray(existingProduct?.images)
      ? existingProduct.images.filter(Boolean)
      : [];

    const productUpdates = {
      title,
      label: getRequiredString(formData, "label"),
      area,
      category: getRequiredString(formData, "category"),
      period: getRequiredString(formData, "period"),
      price,
      material: getRequiredString(formData, "material"),
      dimensions: getRequiredString(formData, "dimensions"),
      condition: getRequiredString(formData, "condition"),
      description: getRequiredString(formData, "description"),
      available: formData.get("available") !== "false",
    };
    let nextImages = imagesToKeep;

    if (imageFiles.length > 0) {
      try {
        nextImages = [
          ...imagesToKeep,
          ...(await uploadProductImages(imageFiles)),
        ];
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Errore upload immagine" },
          { status: 500 }
        );
      }
    }

    productUpdates.images = nextImages;

    const { error } = await supabase
      .from("products")
      .update(productUpdates)
      .eq("id", id);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Errore aggiornamento prodotto" },
        { status: 500 }
      );
    }

    await removeProductImages(
      getRemovedProductImagePaths(previousImages, nextImages)
    );

    return NextResponse.json({ ok: true });
  }

  const body = await request.json();
  const { id, available, updates } = body;

  if (!id) {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  if (!updates) {
    if (typeof available !== "boolean") {
      return NextResponse.json(
        { error: "Richiesta non valida" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("products")
      .update({ available })
      .eq("id", id);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Errore aggiornamento disponibilità" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  }

  const price = Number(updates.price);
  const area = getCleanString(updates.area);

  if (
    !getCleanString(updates.title) ||
    !isValidProductArea(area) ||
    !Number.isFinite(price)
  ) {
    return NextResponse.json(
      { error: "Titolo, area e prezzo valido sono obbligatori" },
      { status: 400 }
    );
  }

  const productUpdates = {
    title: getCleanString(updates.title),
    label: getCleanString(updates.label),
    area,
    category: getCleanString(updates.category),
    period: getCleanString(updates.period),
    price,
    material: getCleanString(updates.material),
    dimensions: getCleanString(updates.dimensions),
    condition: getCleanString(updates.condition),
    description: getCleanString(updates.description),
    available: updates.available !== false,
  };

  const { error } = await supabase
    .from("products")
    .update(productUpdates)
    .eq("id", id);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Errore aggiornamento prodotto" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request) {
  if (!isAuthorized(request)) {
    return unauthorized();
  }

  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID mancante" }, { status: 400 });
  }

  const { data: existingProduct, error: existingProductError } = await supabase
    .from("products")
    .select("images")
    .eq("id", id)
    .maybeSingle();

  if (existingProductError) {
    console.error(existingProductError);
    return NextResponse.json(
      { error: "Errore caricamento prodotto" },
      { status: 500 }
    );
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Errore eliminazione prodotto" },
      { status: 500 }
    );
  }

  const previousImages = Array.isArray(existingProduct?.images)
    ? existingProduct.images.filter(Boolean)
    : [];

  await removeProductImages(
    previousImages.map(getProductStoragePath).filter(Boolean)
  );

  return NextResponse.json({ ok: true });
}
