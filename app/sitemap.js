import { absoluteUrl } from "../lib/seo";
import { supabase } from "../lib/supabase";

export default async function sitemap() {
  const { data: products, error } = await supabase
    .from("products")
    .select("code, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  const productRoutes = (products || [])
    .filter((product) => product.code)
    .map((product) => ({
      url: absoluteUrl(`/prodotto/${product.code}`),
      lastModified: product.created_at || new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...productRoutes,
  ];
}
