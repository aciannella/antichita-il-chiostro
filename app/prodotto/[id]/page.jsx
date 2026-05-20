import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, seoDescription, SITE_NAME } from "../../../lib/seo";
import { supabase } from "../../../lib/supabase";
import ProductGallery from "./ProductGallery";

export const dynamic = "force-dynamic";

async function getProductByCode(code) {
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("code", code)
    .maybeSingle();

  if (error) {
    console.error(error);
  }

  return product;
}

function formatPrice(price) {
  const value = Number(price);

  if (!Number.isFinite(value)) {
    return "Prezzo su richiesta";
  }

  return `€ ${value.toLocaleString("it-IT")}`;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductByCode(id);

  if (!product) {
    return {
      title: "Prodotto non trovato",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = seoDescription(
    product.description ||
      [product.area, product.period, product.material, product.dimensions]
        .filter(Boolean)
        .join(" · ")
  );
  const image = product.images?.[0]
    ? absoluteUrl(product.images[0])
    : absoluteUrl("/d798ff87-db9f-400d-8e92-897ebfeb6713.png");
  const url = absoluteUrl(`/prodotto/${product.code}`);

  return {
    title: product.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "it_IT",
      type: "website",
      images: [
        {
          url: image,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductByCode(id);

  if (!product) {
    notFound();
  }

  const whatsappUrl = `https://wa.me/393348069639?text=${encodeURIComponent(
    `Buongiorno, vorrei informazioni sul prodotto ${product.code} - ${product.title}`
  )}`;
  const available = product.available !== false;
  const details = [
    ["Codice", product.code],
    ["Categoria", product.category],
    ["Materiali", product.material],
    ["Dimensioni", product.dimensions],
    ["Stato", product.condition],
  ].filter(([, value]) => value);
  const productMeta = [product.area, product.period].filter(Boolean).join(" · ");
  const numericPrice = Number(product.price);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: seoDescription(product.description),
    sku: product.code,
    category: product.category || product.area,
    material: product.material,
    image: (product.images || []).filter(Boolean).map((image) => absoluteUrl(image)),
    brand: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/prodotto/${product.code}`),
      priceCurrency: "EUR",
      price: Number.isFinite(numericPrice) ? numericPrice : undefined,
      availability: available
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  };

  return (
    <main className="antique-page-bg min-h-screen text-[#2a1810]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <header className="border-b border-[#d6c7ad] bg-[#f3eadc]/95">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center justify-center gap-3 text-center sm:text-left">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#2a1810] text-base font-semibold text-[#f8efe1]">
              C
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight text-[#2a1810]">
                Antichità Il Chiostro
              </div>
              <div className="text-[0.68rem] uppercase tracking-[0.16em] text-[#806c59] sm:text-xs sm:tracking-[0.22em]">
                Collezioni selezionate
              </div>
            </div>
          </Link>
          <Link
            href="/#nuovi-arrivi"
            className="rounded-lg border border-[#cbb99d] bg-[#fffaf0] px-4 py-2 text-sm font-medium text-[#4b3326] hover:border-[#8a5527]"
          >
            Collezioni
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-16">
        <ProductGallery product={product} />

        <div className="lg:py-6">
          <div className="flex flex-wrap items-center justify-center gap-3 text-center sm:justify-start sm:text-left">
            <p className="text-sm uppercase tracking-[0.25em] text-[#8a5527]">
              {productMeta || "Catalogo"}
            </p>

            {product.label && (
              <span className="rounded-lg border border-[#cbb99d] bg-[#fffaf0] px-3 py-1 text-xs font-semibold text-[#4b3326]">
                {product.label}
              </span>
            )}

            <span
              className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                available
                  ? "bg-[#f4ead7] text-[#5f3a17]"
                  : "bg-[#2a1810] text-[#fff8ee]"
              }`}
            >
              {available ? "Disponibile" : "Venduto"}
            </span>
          </div>

          <h1 className="mt-4 max-w-3xl text-center text-3xl font-semibold leading-tight text-[#2a1810] sm:text-left md:text-5xl">
            {product.title}
          </h1>

          <p className="mt-6 text-center text-3xl font-semibold text-[#3a2116] sm:text-left">
            {formatPrice(product.price)}
          </p>

          <p className="mt-6 max-w-3xl text-center text-lg leading-8 text-[#5f4a3b] sm:text-left">
            {product.description}
          </p>

          {details.length > 0 && (
            <div className="mt-8 rounded-lg border border-[#d6c7ad] bg-[#fffaf0] p-6 shadow-sm">
              <div className="mb-5 text-sm uppercase tracking-[0.22em] text-[#8a5527]">
                dettagli della collezione
              </div>
              <div className="grid gap-4">
              {details.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-1 border-t border-[#d6c7ad] pt-4 sm:grid-cols-[130px_1fr]"
                >
                  <strong className="text-[#2a1810]">{label}</strong>
                  <span className="text-[#5f4a3b]">{value}</span>
                </div>
              ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:justify-start">
            {available ? (
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-[#3a2116] px-7 py-3 text-center font-medium text-[#fff8ee] hover:bg-[#5a3520]"
              >
                Richiedi su WhatsApp
              </Link>
            ) : (
              <div className="rounded-lg bg-[#d6c7ad] px-7 py-3 text-center font-medium text-[#5f4a3b]">
                Prodotto venduto
              </div>
            )}

            <Link
              href="/#nuovi-arrivi"
              className="rounded-lg border border-[#cbb99d] bg-[#fffaf0] px-7 py-3 text-center font-medium text-[#4b3326] hover:border-[#8a5527]"
            >
              Torna alle Collezioni
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
