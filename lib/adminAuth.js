import { createHash } from "node:crypto";

export const ADMIN_COOKIE = "antichita_admin";

export function isAdminAuthEnabled() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function getAdminToken() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    return null;
  }

  return createHash("sha256").update(`admin:${password}`).digest("hex");
}

export function isValidAdminToken(token) {
  const expectedToken = getAdminToken();

  return Boolean(expectedToken && token === expectedToken);
}
