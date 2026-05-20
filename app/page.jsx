import { supabase } from "../lib/supabase";
import { PRODUCT_AREAS } from "../lib/productOptions";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "../lib/seo";
import ProductCatalog from "./ProductCatalog";

export const dynamic = "force-dynamic";

const CONTACT = {
  brand: "Antichità Il Chiostro",
  tagline: "Antiquariato · Modernariato · Arte · Contovendita",
  email: "info@antichitailchiostro.it",
  phone: "WhatsApp: 334 806 9639",
  location: "Italia",
};

const areas = [
  {
    title: "Antiquariato",
    text: "Mobili, dipinti, oggetti e arredi storici selezionati.",
    image: "/d798ff87-db9f-400d-8e92-897ebfeb6713.png",
  },
  {
    title: "Modernariato",
    text: "Design italiano, arredi anni '50-'80 e pezzi iconici.",
    image: "/ChatGPT Image 20 mag 2026, 00_26_05.png",
  },
  {
    title: "Illuminazione",
    text: "Lampade, applique, lampadari e candelieri restaurati.",
    image: "/ChatGPT Image 20 mag 2026, 00_28_26.png",
  },
  {
    title: "Arte",
    text: "Dipinti, grafiche, sculture, opere decorative e contemporanee.",
    image: "/ChatGPT Image 20 mag 2026, 00_36_02.png",
  },
  {
    title: "Libreria",
    text: "Libri antichi, rari, prime edizioni, cataloghi d'arte e volumi da collezione.",
    image: "/ChatGPT Image 20 mag 2026, 00_41_58.png",
  },
  {
    title: "Vintage & Corredi",
    text: "Abbigliamento, tessili, corredi, accessori e oggetti di stile.",
    image: "/ChatGPT Image 20 mag 2026, 00_32_28.png",
  },
  {
    title: "Strumenti Musicali WiFi",
    text: "Strumenti antichi, vintage e soluzioni sonore dal fascino senza tempo.",
    image: "/ChatGPT Image 20 mag 2026, 00_46_12.png",
  },
  {
    title: "Vetrina Contovendita",
    text: "Una selezione curata di mobili, quadri, lampadari e oggetti d'arte affidati alla nostra vetrina.",
    image: "/ChatGPT Image 20 mag 2026, 08_07_11.png",
  },
];

export default async function AntichitaIlChiostro() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  const safeProducts = products || [];
  const availableCount = safeProducts.filter(
    (product) => product.available !== false
  ).length;
  const representedAreas = new Set(
    safeProducts.map((product) => product.area).filter(Boolean)
  ).size;
  const latestProducts = safeProducts.slice(0, 3);
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    image: absoluteUrl("/d798ff87-db9f-400d-8e92-897ebfeb6713.png"),
    email: CONTACT.email,
    telephone: CONTACT.phone.replace("WhatsApp: ", ""),
    address: {
      "@type": "PostalAddress",
      addressCountry: "IT",
    },
    makesOffer: areas.map((item) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: item.title,
        description: item.text,
      },
    })),
  };

  return (
    <div className="antique-page-bg min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <header className="sticky top-0 z-50 border-b border-stone-300/70 bg-[#f3eadc]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <a href="#top" className="flex items-center justify-center gap-3 text-center lg:text-left">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#2a1810] text-lg font-semibold text-[#f8efe1]">
              C
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight text-[#2a1810] sm:text-xl">
                {CONTACT.brand}
              </div>
              <div className="text-[0.68rem] uppercase tracking-[0.16em] text-[#806c59] sm:text-xs sm:tracking-[0.22em]">
                {CONTACT.tagline}
              </div>
            </div>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-[#4b3326]">
            <a href="#aree" className="hover:text-[#8a5527]">
              Sezioni
            </a>
            <a href="#nuovi-arrivi" className="hover:text-[#8a5527]">
              Collezioni
            </a>
            <a href="#contatti" className="hover:text-[#8a5527]">
              Contatti
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-stone-200">
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2 lg:py-24">
            <div className="flex flex-col items-center text-center lg:justify-center">
              <div className="mb-5 inline-flex rounded-lg border border-[#b88955]/30 bg-[#fffaf0]/80 px-4 py-2 text-sm text-[#7b4b22] shadow-sm">
                Selezione, restauro e vendita assistita
              </div>

              <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-[#2a1810] sm:text-5xl md:text-6xl xl:text-[4.25rem]">
                Antiquariato, arte e modernariato accuratamente selezionati per
                creare ambienti di raffinata eleganza senza tempo.
              </h1>

              <p className="mt-6 max-w-2xl text-justify text-base leading-8 text-[#5f4a3b] md:text-lg">
                Antichità Il Chiostro, in collaborazione con Architetti e
                Designer, cura un’esclusiva selezione di arredi, opere d’arte,
                libri rari, illuminazione e oggetti d’epoca, pensati per
                valorizzare abitazioni di pregio, studi professionali, hotel e
                collezioni private, creando ambienti di raffinata eleganza senza
                tempo.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="#nuovi-arrivi"
                  className="rounded-lg bg-[#3a2116] px-7 py-3 text-center font-medium text-[#fff8ee] hover:bg-[#5a3520]"
                >
                  Esplora il catalogo
                </a>
                <a
                  href="#contatti"
                  className="rounded-lg border border-[#cbb99d] bg-[#fffaf0] px-7 py-3 text-center font-medium text-[#4b3326] hover:border-[#8a5527]"
                >
                  Contattaci
                </a>
              </div>

              <div className="mt-10 grid w-full max-w-2xl grid-cols-3 gap-3 border-y border-[#d6c7ad] py-5">
                <div>
                  <div className="text-xl font-semibold text-[#2a1810] sm:text-2xl">
                    {safeProducts.length}
                  </div>
                  <div className="text-[0.68rem] uppercase tracking-[0.14em] text-[#806c59] sm:text-xs sm:tracking-[0.18em]">
                    articoli
                  </div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-[#2a1810] sm:text-2xl">
                    {availableCount}
                  </div>
                  <div className="text-[0.68rem] uppercase tracking-[0.14em] text-[#806c59] sm:text-xs sm:tracking-[0.18em]">
                    disponibili
                  </div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-[#2a1810] sm:text-2xl">
                    {representedAreas}
                  </div>
                  <div className="text-[0.68rem] uppercase tracking-[0.14em] text-[#806c59] sm:text-xs sm:tracking-[0.18em]">
                    sezioni
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-stone-950 shadow-2xl">
                <img
                  src="/d798ff87-db9f-400d-8e92-897ebfeb6713.png"
                  alt="Stanza antiquaria con mobili, quadri, statue, libri e lampade"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="mt-4 rounded-lg border border-[#d6c7ad] bg-[#fffaf0] p-5 text-center shadow-sm">
                <div className="text-sm uppercase tracking-[0.25em] text-[#8a5527]">
                  selezione esclusiva
                </div>
                <div className="mt-2 text-xl font-semibold text-[#2a1810] sm:text-2xl">
                  Mobili, dipinti, lampade e oggetti selezionati per il loro
                  fascino autentico e la storia che custodiscono.
                </div>
              </div>
            </div>
          </div>
        </section>

        {latestProducts.length > 0 && (
          <section className="border-b border-stone-200 bg-stone-950 text-white">
            <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 lg:grid-cols-[220px_1fr] lg:items-center">
              <div>
                <h2 className="text-2xl font-semibold">
                  Ultimi arrivi
                </h2>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {latestProducts.map((product) => (
                  <a
                    key={product.id}
                    href={`/prodotto/${product.code}`}
                    className="grid grid-cols-[72px_1fr] gap-3 rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10"
                  >
                    <div className="aspect-square overflow-hidden rounded-md bg-white/10">
                      {product.images?.[0] && (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-medium">{product.title}</div>
                      <div className="mt-1 text-sm text-stone-300">
                        {product.area || "Catalogo"}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="aree" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-[#8a5527]">
              percorsi di ricerca
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#2a1810] md:text-4xl">
              Le sezioni del catalogo
            </h2>
            <p className="mt-4 text-base leading-7 text-[#5f4a3b]">
              Ogni categoria raccoglie pezzi scelti per materia, storia e
              possibilità progettuale, con uno sguardo attento agli interni di
              pregio.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {areas.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-lg border border-[#d6c7ad] bg-[#fffaf0] shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[5/3] overflow-hidden bg-[#2a1810]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`h-full w-full ${
                      item.title === "Antiquariato"
                        ? "object-contain"
                        : "object-cover sepia-[0.18] saturate-[0.9] transition duration-700 group-hover:scale-105"
                    } opacity-95`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a1810]/55 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 rounded-md border border-white/15 bg-[#2a1810]/75 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#f8efe1]">
                    {item.title}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-[#2a1810]">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-7 text-[#5f4a3b]">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="nuovi-arrivi" className="scroll-mt-24 bg-[#fbf7ef]/85 py-16">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-[#8a5527]">
                  catalogo online
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-[#2a1810] md:text-4xl">
                  Collezioni in evidenza
                </h2>
              </div>

            </div>

            {error ? (
              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-900">
                Catalogo temporaneamente non disponibile.
              </div>
            ) : (
              <ProductCatalog products={safeProducts} areas={PRODUCT_AREAS} />
            )}
          </div>
        </section>

        <section id="contatti" className="scroll-mt-24 bg-[#e7dccb]/85 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-[#8a5527]">
                contatti
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#2a1810] md:text-5xl">
                Hai un oggetto da vendere o vuoi una consulenza?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#5f4a3b]">
                Raccontaci cosa desideri valorizzare: selezioniamo arredi,
                opere, illuminazione, libri, oggetti d&apos;arte e collezioni private
                con un approccio riservato e professionale.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="https://wa.me/393348069639"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[#3a2116] px-7 py-3 text-center font-medium text-[#fff8ee] hover:bg-[#5a3520]"
                >
                  Scrivici su WhatsApp
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="rounded-lg border border-[#cbb99d] bg-[#fffaf0] px-7 py-3 text-center font-medium text-[#4b3326] hover:border-[#8a5527]"
                >
                  Invia un&apos;email
                </a>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                {
                  title: "Valutazioni",
                  text: "Invia fotografie, misure, materiali, stato di conservazione e provenienza, se conosciuta.",
                },
                {
                  title: "Contovendita",
                  text: "Valorizziamo oggetti selezionati con presentazione curata, trattativa e vetrina online.",
                },
                {
                  title: "Interior",
                  text: "Collaboriamo con Architetti e Designer per progetti residenziali, hospitality e studi professionali.",
                },
                {
                  title: "Collezioni",
                  text: "Seguiamo collezioni private e nuclei di arredo con attenzione a coerenza, epoca e atmosfera.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg border border-[#d6c7ad] bg-[#fffaf0] p-6 text-center shadow-sm"
                >
                  <h3 className="text-2xl font-semibold text-[#2a1810]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#5f4a3b]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d6c7ad] bg-[#fffaf0]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="text-center">
            <div className="text-xl font-semibold text-[#2a1810]">{CONTACT.brand}</div>
            <p className="mt-3 text-[#5f4a3b]">
              Catalogo online, vendita, contovendita e consulenza per ambienti
              di raffinata eleganza senza tempo.
            </p>
          </div>

          <div>
            <div className="font-semibold text-[#2a1810]">Sezioni</div>
            <div className="mt-3 grid gap-2 text-[#5f4a3b] sm:grid-cols-2 md:grid-cols-1">
              {areas.map((item) => (
                <a
                  key={item.title}
                  href="#aree"
                  className="hover:text-[#8a5527]"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold text-[#2a1810]">Contatti</div>
            <div className="mt-3 grid gap-3 text-[#5f4a3b]">
              <a
                href="https://wa.me/393348069639"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#8a5527]"
              >
                {CONTACT.phone}
              </a>
              <span>{CONTACT.email}</span>
              <span>{CONTACT.location}</span>
              <a href="/privacy" className="hover:text-[#8a5527]">
                Privacy
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200 px-5 py-5 text-center text-sm text-[#806c59]">
          © 2026 {CONTACT.brand}. Tutti i diritti riservati.
        </div>
      </footer>
    </div>
  );
}
