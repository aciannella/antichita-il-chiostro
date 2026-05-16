"use client";

import React, { useMemo, useState } from "react";
import { products } from "../data/products";

const CONTACT = {
  brand: "Antichità il Chiostro",
  tagline: "Antiquariato · Modernariato · Arte · Contovendita",
  email: "info@antichitailchiostro.it",
  phone: "Contatto WhatsApp",
  location: "Italia",
};

const Icon = ({ name }) => {
  const icons = {
    search: "⌕",
    heart: "♡",
    spark: "✦",
    check: "✓",
    chevron: "›",
    phone: "☎",
    mail: "✉",
    pin: "⌖",
  };

  return <span aria-hidden="true">{icons[name] || "✦"}</span>;
};

const areas = [
  {
    title: "Antiquariato",
    text: "Mobili, dipinti, oggetti e arredi storici selezionati.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Modernariato",
    text: "Design italiano, arredi anni '50-'80 e pezzi iconici.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Illuminazione",
    text: "Lampade, applique, lampadari e candelieri restaurati.",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Arte",
    text: "Dipinti, grafiche, sculture e opere contemporanee.",
    image:
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Libreria",
    text: "Libri antichi, rari, prime edizioni e cataloghi d'arte.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Vintage & Corredi",
    text: "Tessili, accessori e oggetti di stile.",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop",
  },
];


const services = [
  "Acquisto diretto",
  "Contovendita",
  "Restauro",
  "Sgomberi selettivi",
  "Perizie e stime",
];

function filterProducts(productList, selectedArea, searchText) {
  return productList.filter((p) => {
    const matchesArea = selectedArea === "Tutte" || p.area === selectedArea;
    const haystack = `${p.title} ${p.area} ${p.category} ${p.period}`.toLowerCase();
    const matchesText = haystack.includes(searchText.trim().toLowerCase());
    return matchesArea && matchesText;
  });
}

export default function AntichitaIlChiostro() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("Tutte");

  const filtered = useMemo(
    () => filterProducts(products, area, query),
    [query, area]
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-950">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-stone-950 text-lg font-semibold text-white">
              C
            </div>
            <div>
              <div className="text-xl font-semibold tracking-tight">
                {CONTACT.brand}
              </div>
              <div className="text-xs uppercase tracking-[0.22em] text-stone-500">
                {CONTACT.tagline}
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
            <a href="#aree" className="hover:text-amber-800">Aree</a>
            <a href="#nuovi-arrivi" className="hover:text-amber-800">Prodotti</a>
            <a href="#servizi" className="hover:text-amber-800">Servizi</a>
            <a href="#contovendita" className="hover:text-amber-800">Contovendita</a>
            <a href="#contatti" className="hover:text-amber-800">Contatti</a>
          </nav>

          <a
            href="#contatti"
            className="hidden rounded-full border border-stone-300 px-5 py-2 text-sm font-semibold md:inline-flex"
          >
            Valuta un oggetto
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-stone-200">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(180,132,78,0.28),transparent_32%),radial-gradient(circle_at_82%_20%,rgba(255,255,255,0.95),transparent_30%)]" />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-800/20 bg-white/80 px-4 py-2 text-sm text-amber-900 shadow-sm">
                <Icon name="spark" /> Selezione, restauro e vendita assistita
              </div>

              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
                Antichità, arte e modernariato selezionati per spazi senza tempo.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
                {CONTACT.brand} seleziona arredi, opere, libri rari,
                illuminazione e oggetti d’epoca per abitazioni, studi
                professionali, hotel e collezionisti. Ogni pezzo viene
                valorizzato attraverso immagini curate, descrizioni accurate e
                una narrazione capace di restituirne storia, materia e carattere.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#nuovi-arrivi"
                  className="rounded-full bg-stone-950 px-7 py-3 text-center font-medium text-white shadow-lg shadow-stone-300"
                >
                  Esplora il catalogo
                </a>
                <a
                  href="#contovendita"
                  className="rounded-full border border-stone-300 bg-white px-7 py-3 text-center font-medium"
                >
                  Vendi con noi
                </a>
              </div>

              <div className="mt-9 grid gap-3 text-sm text-stone-600 sm:grid-cols-3">
                <span><Icon name="check" /> Pezzi selezionati</span>
                <span><Icon name="check" /> Schede descrittive</span>
                <span><Icon name="check" /> Contovendita curato</span>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop"
                  alt="Interno elegante con arredi d'epoca"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="text-sm uppercase tracking-[0.25em] text-stone-200">
                    selezione esclusiva
                  </div>
                  <div className="mt-2 text-3xl font-semibold">
                    Arredi e oggetti con una storia autentica
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="aree" className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-8 flex items-end justify-between gap-5">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-amber-800">
                categorie principali
              </p>
              <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
                Le sezioni del catalogo
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-[1.7rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[5/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-7 text-stone-600">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="nuovi-arrivi" className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-amber-800">
                  catalogo online
                </p>
                <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
                  Prodotti in evidenza
                </h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cerca nel catalogo..."
                  className="w-full rounded-full border border-stone-300 bg-white px-5 py-3 outline-none focus:border-stone-900 sm:w-80"
                />

                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="rounded-full border border-stone-300 bg-white px-5 py-3"
                >
                  <option>Tutte</option>
                  {areas.map((a) => (
                    <option key={a.title}>{a.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <article
                  key={p.id}
                  className="group overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-900 shadow-sm">
                      {p.label}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-stone-500">
                      <span>{p.area}</span>
                      <span>{p.period}</span>
                    </div>

                    <h3 className="min-h-14 text-lg font-semibold leading-snug">
                      {p.title}
                    </h3>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-2xl font-semibold">
                        € {p.price.toLocaleString("it-IT")}
                      </div>

                      <a
                        href={`/prodotto/${p.id}`}
                        className="rounded-full bg-stone-950 px-4 py-2 text-sm font-medium text-white"
                      >
                        Scheda
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="servizi" className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-800">
              servizi
            </p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
              Dalla valutazione alla vendita
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {services.map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold">{item}</h3>
                <p className="mt-3 leading-7 text-stone-600">
                  Servizio professionale per valorizzare oggetti, arredi e
                  collezioni.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="contovendita" className="bg-stone-950 py-16 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
                contovendita
              </p>
              <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
                Affida i tuoi oggetti a una vendita curata.
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-300">
                Gestiamo presentazione, catalogazione, promozione e trattativa
                di vendita per mobili, lampade, quadri, libri e oggetti d’arte.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {["Invio foto", "Valutazione", "Pubblicazione", "Vendita"].map(
                (step, index) => (
                  <div
                    key={step}
                    className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6"
                  >
                    <h3 className="text-xl font-semibold">
                      {index + 1}. {step}
                    </h3>
                    <p className="mt-3 leading-7 text-stone-300">
                      Procedura semplice, chiara e professionale.
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section id="contatti" className="bg-stone-100 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-amber-800">
                contatti
              </p>
              <h2 className="mt-2 text-3xl font-semibold md:text-5xl">
                Hai un oggetto da vendere o vuoi una consulenza?
              </h2>
              <p className="mt-5 leading-8 text-stone-600">
                Scrivici allegando foto, misure e una breve descrizione.
              </p>
            </div>

            <form
              className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="w-full rounded-2xl border border-stone-300 px-4 py-3"
                placeholder="Nome e cognome"
              />
              <input
                className="mt-4 w-full rounded-2xl border border-stone-300 px-4 py-3"
                placeholder="Email o telefono"
              />
              <textarea
                className="mt-4 min-h-32 w-full rounded-2xl border border-stone-300 px-4 py-3"
                placeholder="Descrivi l'oggetto"
              />
              <button className="mt-4 rounded-full bg-stone-950 px-7 py-3 font-medium text-white">
                Invia richiesta
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-4">
          <div>
            <div className="text-xl font-semibold">{CONTACT.brand}</div>
            <p className="mt-3 text-stone-600">
              Catalogo online, vendita, contovendita, restauro e consulenza.
            </p>
          </div>

          <div>
            <div className="font-semibold">Sezioni</div>
            <div className="mt-3 grid gap-2 text-stone-600">
              <span>Antiquariato</span>
              <span>Modernariato</span>
              <span>Illuminazione</span>
              <span>Libreria</span>
            </div>
          </div>

          <div>
            <div className="font-semibold">Servizi</div>
            <div className="mt-3 grid gap-2 text-stone-600">
              <span>Acquisto diretto</span>
              <span>Contovendita</span>
              <span>Restauro</span>
              <span>Perizie</span>
            </div>
          </div>

          <div>
            <div className="font-semibold">Contatti</div>
            <div className="mt-3 grid gap-3 text-stone-600">
              <a
                href="https://wa.me/393348069639"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-800"
              >
                WhatsApp: 334 806 9639
              </a>
              <span>{CONTACT.email}</span>
              <span>{CONTACT.location}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200 px-5 py-5 text-center text-sm text-stone-500">
          © 2026 {CONTACT.brand}. Tutti i diritti riservati.
        </div>
      </footer>
    </div>
  );
}