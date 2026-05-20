import Link from "next/link";
import { SITE_NAME } from "../../lib/seo";

export const metadata = {
  title: "Privacy",
  description:
    "Informativa privacy essenziale per il sito Antichità Il Chiostro.",
};

export default function PrivacyPage() {
  return (
    <main className="antique-page-bg min-h-screen text-[#2a1810]">
      <header className="border-b border-[#d6c7ad] bg-[#f3eadc]/95">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center justify-center gap-3 text-center sm:text-left">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#2a1810] text-base font-semibold text-[#f8efe1]">
              C
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight text-[#2a1810]">
                {SITE_NAME}
              </div>
              <div className="text-[0.68rem] uppercase tracking-[0.16em] text-[#806c59] sm:text-xs sm:tracking-[0.22em]">
                Informativa privacy
              </div>
            </div>
          </Link>
          <Link
            href="/#contatti"
            className="rounded-lg border border-[#cbb99d] bg-[#fffaf0] px-4 py-2 text-center text-sm font-medium text-[#4b3326] hover:border-[#8a5527]"
          >
            Contatti
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-5 py-14">
        <p className="text-sm uppercase tracking-[0.25em] text-[#8a5527]">
          privacy
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-[#2a1810] md:text-5xl">
          Informativa privacy
        </h1>

        <div className="mt-8 grid gap-6 rounded-lg border border-[#d6c7ad] bg-[#fffaf0] p-6 leading-8 text-[#5f4a3b] shadow-sm md:p-8">
          <p>
            Questa informativa descrive in modo essenziale come vengono trattati
            i dati personali inviati tramite i canali di contatto di {SITE_NAME}.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-[#2a1810]">
              Dati trattati
            </h2>
            <p className="mt-2">
              Quando ci contatti via email o WhatsApp possiamo ricevere nome,
              recapiti, messaggi, fotografie e informazioni relative agli oggetti
              o alle collezioni da valutare.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2a1810]">
              Finalità
            </h2>
            <p className="mt-2">
              I dati vengono usati per rispondere alle richieste, valutare
              oggetti e arredi, proporre servizi di vendita, contovendita,
              consulenza o collaborazione professionale.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2a1810]">
              Conservazione e condivisione
            </h2>
            <p className="mt-2">
              Le informazioni sono conservate per il tempo necessario alla
              gestione della richiesta. Non vengono vendute a terzi. Alcuni dati
              possono transitare tramite servizi esterni come email, WhatsApp e
              strumenti tecnici necessari al funzionamento del sito.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2a1810]">
              Cookie
            </h2>
            <p className="mt-2">
              Il sito non usa cookie di profilazione pubblicitaria. Eventuali
              cookie tecnici possono essere utilizzati solo per funzioni
              necessarie, come l&apos;accesso all&apos;area admin.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#2a1810]">
              Diritti e contatti
            </h2>
            <p className="mt-2">
              Per richieste relative ai dati personali puoi scrivere a{" "}
              <a
                href="mailto:info@antichitailchiostro.it"
                className="font-medium text-[#8a5527] hover:text-[#3a2116]"
              >
                info@antichitailchiostro.it
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
