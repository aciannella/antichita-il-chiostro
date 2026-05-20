import { isAdminAuthEnabled } from "../../../lib/adminAuth";

export const metadata = {
  title: "Accesso admin",
};

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const nextPath =
    typeof params?.next === "string" && params.next.startsWith("/admin")
      ? params.next
      : "/admin";
  const hasError = params?.error === "1";
  const isEnabled = isAdminAuthEnabled();

  return (
    <main className="grid min-h-screen place-items-center bg-stone-100 px-5 py-12">
      <section className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-6 shadow-xl sm:p-8">
        <p className="text-sm uppercase tracking-[0.25em] text-amber-800">
          area riservata
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Accesso admin</h1>

        {!isEnabled ? (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
            La protezione admin è pronta ma non ancora attiva. Imposta
            <code className="mx-1 rounded bg-white px-1 py-0.5">
              ADMIN_PASSWORD
            </code>
            nelle variabili ambiente per abilitarla.
          </div>
        ) : (
          <form action="/api/admin-login" method="post" className="mt-8 grid gap-4">
            <input type="hidden" name="next" value={nextPath} />

            <label className="grid gap-2 text-sm font-medium text-stone-700">
              Password
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className="rounded-2xl border border-stone-300 px-4 py-3 text-base outline-none focus:border-stone-950"
                required
              />
            </label>

            {hasError && (
              <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                Password non corretta.
              </p>
            )}

            <button
              type="submit"
              className="rounded-2xl bg-stone-950 px-6 py-4 font-medium text-white"
            >
              Entra
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
