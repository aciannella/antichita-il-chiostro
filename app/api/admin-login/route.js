import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getAdminToken } from "../../../lib/adminAuth";

function getSafeNextPath(value) {
  if (typeof value !== "string" || !value.startsWith("/admin")) {
    return "/admin";
  }

  return value;
}

export async function POST(request) {
  const formData = await request.formData();
  const password = formData.get("password");
  const nextPath = getSafeNextPath(formData.get("next"));
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword || password !== expectedPassword) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "1");
    loginUrl.searchParams.set("next", nextPath);

    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url), {
    status: 303,
  });

  response.cookies.delete({
    name: ADMIN_COOKIE,
    path: "/admin",
  });

  response.cookies.set({
    name: ADMIN_COOKIE,
    value: getAdminToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
