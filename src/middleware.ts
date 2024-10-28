import { NextRequest, NextResponse } from "next/server";

// Define las rutas públicas y protegidas
const publicRoutes = ["/login", "/register", "/api/register"];
const protectedRoutes = ["/", "/profile", "/dashboard"]; // Puedes expandir según sea necesario

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Obtiene el token de la sesión JWT de las cookies disponibles
  const session =
    req.cookies.get("authjs.session-token") ||
    req.cookies.get("__Secure-authjs.session-token") ||
    req.cookies.get("__vercel_live_token");

  // Si no hay sesión y es una ruta protegida, redirigir a login
  if (!session && protectedRoutes.includes(pathname)) {
    console.log(`No session, redirecting to login for ${pathname}`);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Si hay sesión y es una ruta protegida, permitir el acceso
  if (session && protectedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Si es una ruta pública, permitir el acceso sin restricciones
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Si ninguna de las condiciones anteriores se cumple, permitir el acceso
  return NextResponse.next();
}

// Configura el matcher para aplicar el middleware a las rutas específicas
export const config = {
  matcher: ["/((?!.*\\..*|_next|api/register).*)", "/", "/(api|trpc)(.*)"], // Ajusta el matcher según sea necesario
};
