"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { PRODUCT_AREAS, isValidProductArea } from "../../lib/productOptions";

export default function AdminPanel({ initialProducts, initialError }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const productsLoading = false;

  const [actionProductId, setActionProductId] = useState(null);

  const [editingProductId, setEditingProductId] = useState(null);

  const [editForm, setEditForm] = useState(null);

  const [notice, setNotice] = useState(
    initialError ? { type: "error", text: initialError } : null
  );

  const [products, setProducts] = useState(initialProducts);

  const [imageFiles, setImageFiles] = useState([]);

  const [imageInputKey, setImageInputKey] = useState(0);

  const [editImageFiles, setEditImageFiles] = useState([]);

  const [editImageInputKey, setEditImageInputKey] = useState(0);

  const [form, setForm] = useState({
    code: "",
    title: "",
    label: "",
    area: "",
    category: "",
    period: "",
    price: "",
    material: "",
    dimensions: "",
    condition: "",
    description: "",
  });

  const showNotice = useCallback((type, text) => {
    setNotice({ type, text });
  }, []);

  const handleUnauthorized = useCallback(() => {
    router.push("/admin/login");
  }, [router]);

  const loadProducts = useCallback(async () => {
    try {
      const response = await fetch("/api/admin-products");
      const result = await response.json();

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        showNotice("error", result.error || "Errore caricamento prodotti");
        return;
      }

      setProducts(result.products || []);
    } catch (error) {
      console.error(error);
      showNotice("error", "Errore di connessione durante il caricamento");
    }
  }, [handleUnauthorized, showNotice]);

  function startEditing(product) {
    setEditingProductId(product.id);
    setEditImageFiles([]);
    setEditImageInputKey((currentKey) => currentKey + 1);
    setEditForm({
      title: product.title || "",
      label: product.label || "",
      area: product.area || "",
      category: product.category || "",
      period: product.period || "",
      price: product.price ?? "",
      material: product.material || "",
      dimensions: product.dimensions || "",
      condition: product.condition || "",
      description: product.description || "",
      available: product.available !== false,
      images: Array.isArray(product.images) ? product.images.filter(Boolean) : [],
    });
    setNotice(null);
  }

  function cancelEditing() {
    setEditingProductId(null);
    setEditForm(null);
    setEditImageFiles([]);
  }

  function updateEditForm(key, value) {
    setEditForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  }

  async function saveProduct(product) {
    setActionProductId(product.id);
    setNotice(null);

    if ((editForm.images || []).length === 0 && editImageFiles.length === 0) {
      showNotice("error", "Mantieni o aggiungi almeno un'immagine");
      setActionProductId(null);
      return;
    }

    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("imagesToKeep", JSON.stringify(editForm.images || []));

    Object.entries(editForm).forEach(([key, value]) => {
      if (key === "images") return;
      formData.append(key, String(value ?? ""));
    });

    editImageFiles.forEach((imageFile) => {
      formData.append("images", imageFile);
    });

    try {
      const response = await fetch("/api/admin-products", {
        method: "PATCH",
        body: formData,
      });
      const result = await response.json();

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        showNotice("error", result.error || "Errore aggiornamento prodotto");
        return;
      }

      showNotice("success", "Prodotto aggiornato");
      cancelEditing();
      setEditImageInputKey((currentKey) => currentKey + 1);
      loadProducts();
    } catch (error) {
      console.error(error);
      showNotice("error", "Errore di connessione durante il salvataggio");
    } finally {
      setActionProductId(null);
    }
  }

  async function toggleAvailable(product) {
    const currentAvailable = product.available !== false;

    setActionProductId(product.id);
    setNotice(null);

    try {
      const response = await fetch("/api/admin-products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: product.id,
          available: !currentAvailable,
        }),
      });
      const result = await response.json();

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        showNotice("error", result.error || "Errore aggiornamento disponibilità");
        return;
      }

      showNotice("success", "Disponibilità aggiornata");
      loadProducts();
    } catch (error) {
      console.error(error);
      showNotice("error", "Errore di connessione durante l'aggiornamento");
    } finally {
      setActionProductId(null);
    }
  }

  async function deleteProduct(product) {
    const confirmed = confirm(
      `Vuoi eliminare definitivamente "${product.title}"?`
    );

    if (!confirmed) return;

    setActionProductId(product.id);
    setNotice(null);

    try {
      const response = await fetch(
        `/api/admin-products?id=${encodeURIComponent(product.id)}`,
        { method: "DELETE" }
      );
      const result = await response.json();

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        showNotice("error", result.error || "Errore eliminazione prodotto");
        return;
      }

      showNotice("success", "Prodotto eliminato");
      loadProducts();
    } catch (error) {
      console.error(error);
      showNotice("error", "Errore di connessione durante l'eliminazione");
    } finally {
      setActionProductId(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setNotice(null);

    if (imageFiles.length === 0) {
      showNotice("error", "Seleziona almeno un'immagine");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    imageFiles.forEach((imageFile) => {
      formData.append("images", imageFile);
    });

    try {
      const response = await fetch("/api/admin-products", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        showNotice("error", result.error || "Errore inserimento prodotto");
        return;
      }

      showNotice("success", "Prodotto inserito");
      loadProducts();
      setImageFiles([]);
      setImageInputKey((currentKey) => currentKey + 1);

      setForm({
        code: "",
        title: "",
        label: "",
        area: "",
        category: "",
        period: "",
        price: "",
        material: "",
        dimensions: "",
        condition: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      showNotice("error", "Errore di connessione durante l'inserimento");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-stone-100 p-5 sm:p-10">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-5 shadow-xl sm:p-8">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-4xl font-semibold">Pannello Admin</h1>

            <p className="mt-3 text-stone-600">
              Inserisci nuovi prodotti nel catalogo
            </p>
          </div>

          <form action="/api/admin-logout" method="post">
            <button
              type="submit"
              className="rounded-full border border-stone-300 bg-white px-5 py-2 text-sm font-medium text-stone-700"
            >
              Esci
            </button>
          </form>
        </div>

        {notice && (
          <div
            className={`mt-6 rounded-2xl border p-4 text-sm font-medium ${
              notice.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {notice.text}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid gap-5"
        >

          <input
            placeholder="Codice prodotto"
            className="rounded-2xl border border-stone-300 p-4"
            value={form.code}
            onChange={(e) =>
              setForm({ ...form, code: e.target.value })
            }
          />

          <input
            placeholder="Titolo"
            className="rounded-2xl border border-stone-300 p-4"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            placeholder="Etichetta"
            className="rounded-2xl border border-stone-300 p-4"
            value={form.label}
            onChange={(e) =>
              setForm({ ...form, label: e.target.value })
            }
          />

          <select
            className="rounded-2xl border border-stone-300 bg-white p-4"
            value={form.area}
            onChange={(e) =>
              setForm({ ...form, area: e.target.value })
            }
          >
            <option value="">Area</option>
            {PRODUCT_AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>

          <input
            placeholder="Categoria"
            className="rounded-2xl border border-stone-300 p-4"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <input
            placeholder="Periodo"
            className="rounded-2xl border border-stone-300 p-4"
            value={form.period}
            onChange={(e) =>
              setForm({ ...form, period: e.target.value })
            }
          />

          <input
            placeholder="Prezzo"
            type="number"
            className="rounded-2xl border border-stone-300 p-4"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <input
            placeholder="Materiali"
            className="rounded-2xl border border-stone-300 p-4"
            value={form.material}
            onChange={(e) =>
              setForm({ ...form, material: e.target.value })
            }
          />

          <input
            placeholder="Dimensioni"
            className="rounded-2xl border border-stone-300 p-4"
            value={form.dimensions}
            onChange={(e) =>
              setForm({ ...form, dimensions: e.target.value })
            }
          />

          <input
            placeholder="Condizione"
            className="rounded-2xl border border-stone-300 p-4"
            value={form.condition}
            onChange={(e) =>
              setForm({ ...form, condition: e.target.value })
            }
          />

          <textarea
            placeholder="Descrizione"
            rows={5}
            className="rounded-2xl border border-stone-300 p-4"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div className="grid gap-2">

            <label className="text-sm font-medium text-stone-700">
              Immagine prodotto
            </label>

            <input
              key={imageInputKey}
              type="file"
              accept="image/*"
              multiple
              className="rounded-2xl border border-stone-300 bg-white p-4"
              onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
            />

            {imageFiles.length > 0 && (
              <p className="text-sm text-stone-600">
                {imageFiles.length} immagini selezionate
              </p>
            )}

          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-stone-950 px-6 py-4 text-white disabled:cursor-not-allowed disabled:bg-stone-400"
          >
            {loading ? "Inserimento..." : "Inserisci prodotto"}
          </button>

        </form>

        <div className="mt-14">

          <h2 className="text-3xl font-semibold">Prodotti inseriti</h2>

          <div className="mt-6 grid gap-4">
            {productsLoading ? (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-stone-600">
                Caricamento prodotti...
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-stone-600">
                Nessun prodotto inserito.
              </div>
            ) : (
              products.map((product) => {
                const currentImage = product.images?.[0];
                const editableImages = editForm?.images || [];
                const productAvailable = product.available !== false;

                return (
                  <div
                    key={product.id}
                    className="rounded-2xl border border-stone-200 bg-stone-50 p-5"
                  >
                  <div className="grid gap-4 sm:flex sm:items-center sm:justify-between">
                    <div className="flex min-w-0 gap-4">
                      {currentImage ? (
                        <img
                          src={currentImage}
                          alt={product.title}
                          className="h-20 w-20 flex-none rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-20 flex-none items-center justify-center rounded-2xl bg-stone-200 text-xs font-medium text-stone-500">
                          No foto
                        </div>
                      )}

                      <div className="min-w-0">
                        <h3 className="text-xl font-semibold">{product.title}</h3>

                        <p className="text-stone-600">
                          {product.code} · € {product.price}
                        </p>
                        {!isValidProductArea(product.area) && (
                          <p className="mt-2 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                            Area da correggere: {product.area || "mancante"}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => toggleAvailable(product)}
                        disabled={actionProductId === product.id}
                        className={`rounded-full px-4 py-2 text-sm font-medium ${
                          productAvailable
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        } disabled:cursor-not-allowed disabled:opacity-60`}
                      >
                        {actionProductId === product.id
                          ? "Aggiorno..."
                          : productAvailable
                            ? "Disponibile"
                            : "Venduto"}
                      </button>

                      <button
                        onClick={() => startEditing(product)}
                        disabled={actionProductId === product.id}
                        className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Modifica
                      </button>

                      <button
                        onClick={() => deleteProduct(product)}
                        disabled={actionProductId === product.id}
                        className="rounded-full bg-stone-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-stone-400"
                      >
                        {actionProductId === product.id ? "Attendi..." : "Elimina"}
                      </button>
                    </div>
                  </div>

                  {editingProductId === product.id && editForm && (
                    <div className="mt-5 grid gap-4 border-t border-stone-200 pt-5">
                      <div className="grid gap-4 md:grid-cols-2">
                        <input
                          className="rounded-2xl border border-stone-300 bg-white p-4"
                          placeholder="Titolo"
                          value={editForm.title}
                          onChange={(e) => updateEditForm("title", e.target.value)}
                        />
                        <input
                          className="rounded-2xl border border-stone-300 bg-white p-4"
                          placeholder="Prezzo"
                          type="number"
                          value={editForm.price}
                          onChange={(e) => updateEditForm("price", e.target.value)}
                        />
                        <input
                          className="rounded-2xl border border-stone-300 bg-white p-4"
                          placeholder="Etichetta"
                          value={editForm.label}
                          onChange={(e) => updateEditForm("label", e.target.value)}
                        />
                        <select
                          className="rounded-2xl border border-stone-300 bg-white p-4"
                          value={editForm.area}
                          onChange={(e) => updateEditForm("area", e.target.value)}
                        >
                          <option value="">Area</option>
                          {PRODUCT_AREAS.map((area) => (
                            <option key={area} value={area}>
                              {area}
                            </option>
                          ))}
                        </select>
                        <input
                          className="rounded-2xl border border-stone-300 bg-white p-4"
                          placeholder="Categoria"
                          value={editForm.category}
                          onChange={(e) =>
                            updateEditForm("category", e.target.value)
                          }
                        />
                        <input
                          className="rounded-2xl border border-stone-300 bg-white p-4"
                          placeholder="Periodo"
                          value={editForm.period}
                          onChange={(e) => updateEditForm("period", e.target.value)}
                        />
                        <input
                          className="rounded-2xl border border-stone-300 bg-white p-4"
                          placeholder="Materiali"
                          value={editForm.material}
                          onChange={(e) =>
                            updateEditForm("material", e.target.value)
                          }
                        />
                        <input
                          className="rounded-2xl border border-stone-300 bg-white p-4"
                          placeholder="Dimensioni"
                          value={editForm.dimensions}
                          onChange={(e) =>
                            updateEditForm("dimensions", e.target.value)
                          }
                        />
                        <input
                          className="rounded-2xl border border-stone-300 bg-white p-4"
                          placeholder="Condizione"
                          value={editForm.condition}
                          onChange={(e) =>
                            updateEditForm("condition", e.target.value)
                          }
                        />
                        <label className="flex items-center gap-3 rounded-2xl border border-stone-300 bg-white p-4 text-sm font-medium text-stone-700">
                          <input
                            type="checkbox"
                            checked={editForm.available}
                            onChange={(e) =>
                              updateEditForm("available", e.target.checked)
                            }
                          />
                          Disponibile
                        </label>
                      </div>

                      <textarea
                        className="rounded-2xl border border-stone-300 bg-white p-4"
                        placeholder="Descrizione"
                        rows={4}
                        value={editForm.description}
                        onChange={(e) =>
                          updateEditForm("description", e.target.value)
                        }
                      />

                      <div className="grid gap-3 rounded-2xl border border-stone-300 bg-white p-4">
                        {editableImages.length > 0 && (
                          <div className="grid gap-3 sm:grid-cols-3">
                            {editableImages.map((imageUrl) => (
                              <div
                                key={imageUrl}
                                className="overflow-hidden rounded-xl border border-stone-200 bg-stone-50"
                              >
                                <img
                                  src={imageUrl}
                                  alt={product.title}
                                  className="h-28 w-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateEditForm(
                                      "images",
                                      editableImages.filter(
                                        (currentUrl) => currentUrl !== imageUrl
                                      )
                                    )
                                  }
                                  className="w-full bg-white px-3 py-2 text-sm font-medium text-red-700"
                                >
                                  Rimuovi
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="grid gap-2">
                          <label className="text-sm font-medium text-stone-700">
                            Aggiungi immagini
                          </label>
                          <input
                            key={editImageInputKey}
                            type="file"
                            accept="image/*"
                            multiple
                            className="rounded-xl border border-stone-300 bg-white p-3 text-sm"
                            onChange={(e) =>
                              setEditImageFiles(Array.from(e.target.files || []))
                            }
                          />
                          {editImageFiles.length > 0 && (
                            <p className="text-sm text-stone-600">
                              {editImageFiles.length} nuove immagini selezionate
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => saveProduct(product)}
                          disabled={actionProductId === product.id}
                          className="rounded-full bg-stone-950 px-5 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-stone-400"
                        >
                          {actionProductId === product.id
                            ? "Salvataggio..."
                            : "Salva modifiche"}
                        </button>
                        <button
                          onClick={cancelEditing}
                          disabled={actionProductId === product.id}
                          className="rounded-full border border-stone-300 bg-white px-5 py-2 text-sm font-medium text-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Annulla
                        </button>
                      </div>
                    </div>
                  )}
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>

    </main>
  );
}
