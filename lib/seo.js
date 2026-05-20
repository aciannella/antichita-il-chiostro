export const SITE_NAME = "Antichità Il Chiostro";

export const SITE_DESCRIPTION =
  "Antichità Il Chiostro seleziona antiquariato, modernariato, arte, illuminazione, libri antichi, oggetti d'epoca e collezioni private per ambienti di raffinata eleganza senza tempo.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://antichitailchiostro.it";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function seoDescription(text, fallback = SITE_DESCRIPTION) {
  const source = String(text || fallback).replace(/\s+/g, " ").trim();

  return source.length > 158 ? `${source.slice(0, 155).trim()}...` : source;
}
