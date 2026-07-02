import { NextResponse } from "next/server";

// Rotas protegidas
const rotasPrivadas = ["/dashboard", "/links"];

// Rotas de auth (login/register)
const rotasDeAuth = ["/login", "/register"];

export default async function proxy(request) {
  const { pathname } = request.nextUrl;

  try {
    const sessionResponse = await fetch(
      "http://localhost:3001/api/auth/get-session",
      {
        headers: {
          cookie: request.headers.get("cookie") ?? "",
        },
      }
    );

    const session = await sessionResponse.json();
    const estaLogado = !!session?.user;

    if (!estaLogado && rotasPrivadas.some((r) => pathname.startsWith(r))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (estaLogado && rotasDeAuth.some((r) => pathname.startsWith(r))) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    // se backend falhar, deixa passar ou manda login
    return NextResponse.next();
  }
}

// importante: config continua igual
export const config = {
  matcher: ["/dashboard/:path*", "/relatorio/:path*", "/login", "/register"],
};