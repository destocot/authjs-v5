import { NextRequest } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import type { Session } from "next-auth";

interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

const { auth } = NextAuth(authConfig);

export default auth((req: NextAuthRequest) => {
  const { auth, nextUrl } = req;
  const isLoggedIn = !!auth?.user;
  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isOnAuth = nextUrl.pathname.startsWith("/auth");

  if (isOnDashboard) {
    if (isLoggedIn) return;
    return Response.redirect(new URL("/auth/signin", nextUrl));
  }

  if (isOnAuth) {
    if (!isLoggedIn) return;
    return Response.redirect(new URL("/dashboard", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
