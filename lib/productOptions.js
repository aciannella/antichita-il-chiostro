export const PRODUCT_AREAS = [
  "Antiquariato",
  "Modernariato",
  "Illuminazione",
  "Arte",
  "Libreria",
  "Vintage & Corredi",
  "Strumenti Musicali WiFi",
  "Vetrina Contovendita",
];

export const PRODUCT_AREA_SET = new Set(PRODUCT_AREAS);

export function isValidProductArea(area) {
  return PRODUCT_AREA_SET.has(area);
}
