import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "../../../lib/adminAuth";

export async function POST(request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url), {
    status: 303,
  });

  response.cookies.delete({
    name: ADMIN_COOKIE,
    path: "/",
  });
  response.cookies.delete({
    name: ADMIN_COOKIE,
    path: "/admin",
  });

  return response;
}
