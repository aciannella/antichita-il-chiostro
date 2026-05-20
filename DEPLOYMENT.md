# Pubblicazione

## Hosting consigliato

- Hosting: Vercel
- Dominio: antichitailchiostro.it
- Database e immagini: Supabase

## Variabili ambiente su Vercel

Impostare queste variabili in Project Settings > Environment Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ADMIN_PASSWORD=
NEXT_PUBLIC_SITE_URL=https://antichitailchiostro.it
```

Usare per `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` e
`ADMIN_PASSWORD` gli stessi valori configurati in locale.

## Comandi build

Vercel dovrebbe rilevare automaticamente Next.js. In caso servano i campi
manuali:

- Install command: `npm install`
- Build command: `npm run build`
- Output: gestito da Next.js/Vercel

## Dominio

1. Aggiungere `antichitailchiostro.it` al progetto Vercel.
2. Seguire le istruzioni DNS indicate da Vercel nel pannello del dominio.
3. Dopo la propagazione, verificare:
   - `https://antichitailchiostro.it`
   - `https://antichitailchiostro.it/admin`
   - `https://antichitailchiostro.it/sitemap.xml`
   - `https://antichitailchiostro.it/robots.txt`

## Controlli prima della messa online

- Controllare che il catalogo mostri tutti i prodotti corretti.
- Provare accesso admin con password di produzione.
- Provare inserimento prodotto con una foto reale.
- Provare modifica prodotto e cambio disponibilita.
- Provare pulsante WhatsApp ed email.
- Controllare la pagina Privacy.
- Verificare che la sitemap usi `https://antichitailchiostro.it`.
