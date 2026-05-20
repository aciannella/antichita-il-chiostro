# Antichità Il Chiostro

Sito catalogo per Antichità Il Chiostro: antiquariato, modernariato, arte,
illuminazione, libri antichi, strumenti musicali, vintage, corredi e
contovendita.

## Funzioni principali

- Homepage con sezioni catalogo e ultimi arrivi.
- Catalogo filtrabile per sezione, disponibilita, ricerca e ordinamento.
- Schede prodotto con galleria, dettagli, prezzo e richiesta WhatsApp.
- Pannello admin protetto da password per inserire, modificare e cancellare prodotti.
- SEO tecnica con metadata, canonical, Open Graph, JSON-LD, robots e sitemap.
- Pagina privacy essenziale.

## Avvio locale

```bash
npm install
npm run dev
```

Aprire:

- Sito: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`

## Variabili ambiente

Copiare `.env.example` in `.env.local` e compilare i valori:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ADMIN_PASSWORD=
NEXT_PUBLIC_SITE_URL=https://antichitailchiostro.it
```

`ADMIN_PASSWORD` abilita la protezione del pannello admin.

## Verifiche

```bash
npm run lint
npm run build
```

## Pubblicazione

Il deploy consigliato e su Vercel con dominio `antichitailchiostro.it`.
Le istruzioni operative sono in `DEPLOYMENT.md`.
