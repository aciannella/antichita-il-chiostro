"use client";

import { useMemo, useState } from "react";

function formatPrice(price) {
  const value = Number(price);

  if (!Number.isFinite(value)) {
    return "Prezzo su richiesta";
  }

  return `€ ${value.toLocaleString("it-IT")}`;
}

function getProductPrice(product) {
  const value = Number(product.price);

  return Number.isFinite(value) ? value : null;
}

function filterProducts(products, selectedArea, selectedAvailability, searchText) {
  const normalizedSearch = searchText.trim().toLowerCase();

  return products.filter((product) => {
    const matchesArea =
      selectedArea === "Tutte" || product.area === selectedArea;
    const productAvailable = product.available !== false;
    const matchesAvailability =
      selectedAvailability === "Tutti" ||
      (selectedAvailability === "Disponibili" && productAvailable) ||
      (selectedAvailability === "Venduti" && !productAvailable);
    const searchableText = [
      product.title,
      product.code,
      product.area,
      product.category,
      product.period,
      product.material,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return (
      matchesArea &&
      matchesAvailability &&
      searchableText.includes(normalizedSearch)
    );
  });
}

function sortProducts(products, sortBy) {
  return [...products].sort((first, second) => {
    if (sortBy === "price-asc" || sortBy === "price-desc") {
      const firstPrice = getProductPrice(first);
      const secondPrice = getProductPrice(second);

      if (firstPrice === null && secondPrice === null) return 0;
      if (firstPrice === null) return 1;
      if (secondPrice === null) return -1;

      return sortBy === "price-asc"
        ? firstPrice - secondPrice
        : secondPrice - firstPrice;
    }

    if (sortBy === "title") {
      return String(first.title || "").localeCompare(String(second.title || ""));
    }

    return 0;
  });
}

export default function ProductCatalog({ products, areas }) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("Tutte");
  const [availability, setAvailability] = useState("Tutti");
  const [sortBy, setSortBy] = useState("recent");

  const filteredProducts = useMemo(
    () =>
      sortProducts(
        filterProducts(products, area, availability, query),
        sortBy
      ),
    [products, area, availability, query, sortBy]
  );
  const activeFilters =
    query.trim() !== "" ||
    area !== "Tutte" ||
    availability !== "Tutti" ||
    sortBy !== "recent";

  function resetFilters() {
    setQuery("");
    setArea("Tutte");
    setAvailability("Tutti");
    setSortBy("recent");
  }

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-[#d6c7ad] bg-[#fffaf0] p-8 text-center text-[#5f4a3b]">
        Nessuna collezione presente nel catalogo.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-lg border border-[#d6c7ad] bg-[#f7efe2]/95 p-4 shadow-sm">
        <div className="mb-4 flex flex-col justify-between gap-3 border-b border-[#d6c7ad] pb-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#8a5527]">
              filtra la collezione
            </p>
            <p className="mt-2 text-sm text-[#5f4a3b]">
              Cerca per stile, periodo, codice o materiale.
            </p>
          </div>
          <div className="rounded-lg bg-[#fffaf0] px-4 py-2 text-sm font-medium text-[#5f4a3b]">
            {filteredProducts.length} di {products.length}
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_190px_auto] lg:items-center">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cerca per titolo, codice, periodo..."
            className="min-w-0 rounded-lg border border-[#cbb99d] bg-[#fffaf0] px-4 py-3 text-[#2a1810] outline-none placeholder:text-[#806c59] focus:border-[#8a5527]"
          />

          <select
            value={area}
            onChange={(event) => setArea(event.target.value)}
            className="rounded-lg border border-[#cbb99d] bg-[#fffaf0] px-4 py-3 text-[#2a1810] outline-none focus:border-[#8a5527]"
          >
            <option>Tutte</option>
            {areas.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={availability}
            onChange={(event) => setAvailability(event.target.value)}
            className="rounded-lg border border-[#cbb99d] bg-[#fffaf0] px-4 py-3 text-[#2a1810] outline-none focus:border-[#8a5527]"
          >
            <option>Tutti</option>
            <option>Disponibili</option>
            <option>Venduti</option>
          </select>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-lg border border-[#cbb99d] bg-[#fffaf0] px-4 py-3 text-[#2a1810] outline-none focus:border-[#8a5527]"
          >
            <option value="recent">Più recenti</option>
            <option value="price-asc">Prezzo crescente</option>
            <option value="price-desc">Prezzo decrescente</option>
            <option value="title">Titolo A-Z</option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            disabled={!activeFilters}
            className="rounded-lg border border-[#cbb99d] bg-[#fffaf0] px-4 py-3 text-sm font-medium text-[#4b3326] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Azzera
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-lg border border-[#d6c7ad] bg-[#fffaf0] p-8 text-center text-[#5f4a3b]">
          Nessuna collezione corrisponde ai filtri.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const productImage = product.images?.[0];
            const available = product.available !== false;

            return (
              <article
                key={product.id}
                className="overflow-hidden rounded-lg border border-[#d6c7ad] bg-[#fffaf0] shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#2a1810]">
                  {productImage ? (
                    <img
                      src={productImage}
                      alt={product.title}
                      className="h-full w-full object-cover opacity-95 transition duration-700 hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-full place-items-center px-6 text-center text-sm text-[#d6c7ad]">
                      Immagine non disponibile
                    </div>
                  )}

                  {product.label && (
                    <div className="absolute left-4 top-4 rounded-lg border border-white/20 bg-[#2a1810]/80 px-3 py-1 text-xs font-semibold text-[#fff8ee] shadow-sm">
                      {product.label}
                    </div>
                  )}

                  <div
                    className={`absolute right-4 top-4 rounded-lg px-3 py-1 text-xs font-semibold shadow-sm ${
                      available
                        ? "bg-[#f4ead7] text-[#5f3a17]"
                        : "bg-[#2a1810] text-[#fff8ee]"
                    }`}
                  >
                    {available ? "Disponibile" : "Venduto"}
                  </div>
                </div>

                <div className="p-5 text-center">
                  <div className="mb-3 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.18em]">
                    <span className="text-[#8a5527]">{product.area}</span>
                    <span className="text-[#806c59]">{product.period}</span>
                  </div>

                  <h3 className="min-h-14 text-lg font-semibold leading-snug text-[#2a1810]">
                    {product.title}
                  </h3>

                  {(product.material || product.dimensions) && (
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#5f4a3b]">
                      {[product.material, product.dimensions]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}

                  <div className="mt-5 flex flex-col items-center justify-center gap-3 border-t border-[#d6c7ad] pt-4 sm:flex-row sm:justify-between">
                    <div className="text-2xl font-semibold text-[#3a2116]">
                      {formatPrice(product.price)}
                    </div>

                    <a
                      href={`/prodotto/${product.code}`}
                      className="rounded-lg bg-[#3a2116] px-4 py-2 text-sm font-medium text-[#fff8ee] hover:bg-[#5a3520]"
                    >
                      Dettagli
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
