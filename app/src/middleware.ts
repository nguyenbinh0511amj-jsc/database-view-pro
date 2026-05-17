import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  // Allow public routes
  if (
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname === "/register" ||
    req.nextUrl.pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  // Check token for protected routes
  if (!token) {
    return NextResponse.json({ error: "Không có token" }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || "default-secret");
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: "Token không hợp lệ" }, { status: 401 });
  }
}

export const config = {
  matcher: [
    "/api/:path*",
    "/dashboard/:path*",
    "/customers/:path*",
    "/tours/:path*",
  ],
};
