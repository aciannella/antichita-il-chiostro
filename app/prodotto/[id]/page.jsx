import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../../data/products";
import ProductGallery from "./ProductGallery";

function getProduct(id) {
  return products.find((p) => p.id.toLowerCase() === id.toLowerCase());
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    return {
      title: "Prodotto non trovato | Antichità il Chiostro",
    };
  }

  return {
    title: `${product.title} | Antichità il Chiostro`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 text-stone-950">
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2">
        <ProductGallery product={product} />

        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-amber-800">
            {product.area} · {product.period}
          </p>

          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
            {product.title}
          </h1>

          <p className="mt-6 text-3xl font-semibold">
            € {product.price.toLocaleString("it-IT")}
          </p>

          <p className="mt-6 text-lg leading-8 text-stone-600">
            {product.description}
          </p>

          <div className="mt-8 grid gap-4 rounded-3xl border border-stone-200 bg-white p-6">
            <div>
              <strong>Categoria:</strong> {product.category}
            </div>
            <div>
              <strong>Materiali:</strong> {product.material}
            </div>
            <div>
              <strong>Dimensioni:</strong> {product.dimensions}
            </div>
            <div>
              <strong>Stato:</strong> {product.condition}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            {product.available ? (
              <Link
              href={`https://wa.me/393348069639?text=${encodeURIComponent(
                  `Buongiorno, vorrei informazioni sul prodotto ${product.id} - ${product.title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-stone-950 px-7 py-3 text-center font-medium text-white"
              >
                Richiedi su WhatsApp
              </Link>
          ) : (
            <div className="rounded-full bg-stone-300 px-7 py-3 text-center font-medium text-stone-600">
              Prodotto venduto
          </div>
          )}

          <Link
            href="/"
            className="rounded-full border border-stone-300 bg-white px-7 py-3 text-center font-medium"
          >
            Torna al catalogo
        </Link>

        </div>
        </div>
      </section>
    </main>
  );
}