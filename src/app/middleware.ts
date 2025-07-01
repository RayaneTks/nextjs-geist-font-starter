import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /admin, /admin/dashboard)
  const path = request.nextUrl.pathname

  // If it's the admin login page, allow access
  if (path === '/admin/login') {
    return NextResponse.next()
  }

  // Check if it's an admin route
  const isAdminRoute = path.startsWith('/admin')

  // Check if user is authenticated (has admin token)
  const isAuthenticated = request.cookies.has('admin_token')

  // If it's an admin route and user is not authenticated,
  // redirect to the login page
  if (isAdminRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run only on admin routes
export const config = {
  matcher: '/admin/:path*'
}
