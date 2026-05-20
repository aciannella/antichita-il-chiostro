import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  isAdminAuthEnabled,
  isValidAdminToken,
} from "./lib/adminAuth";

export function proxy(request) {
  if (!isAdminAuthEnabled()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const isAuthenticated = isValidAdminToken(token);

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isLoginPage && !isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
