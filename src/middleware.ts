import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicpath = path === '/login' || path === '/signup'
  const token = request.cookies.get("token")?.value || ""
  if(isPublicpath && token) {
    // return NextResponse.redirect("/")
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }
  if(!isPublicpath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }
}

export const config = {
  matcher : [
    "/","/login/:path*","/signup/:path*","/profile/:path*",
 ]
}