import AdminPanel from "./AdminPanel";
import { supabase } from "../../lib/supabase";

export default async function AdminPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <AdminPanel
      initialProducts={products || []}
      initialError={error ? "Errore caricamento prodotti" : ""}
    />
  );
}
