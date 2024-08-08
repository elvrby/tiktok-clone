import { type NextRequest, NextResponse } from 'next/server';
import { HOME_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME, ADMIN_ROUTE } from './constants'; // Ensure constants are correctly imported

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || '';

  // Log the request URL for debugging
  console.log(`Request URL: ${request.nextUrl.pathname}`);

  // Check if the requested path is protected and if the user is not logged in
  if (!session && (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname === HOME_ROUTE)) {
    // Redirect to login if not authenticated
    const loginURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(loginURL.toString());
  }

  // If user is authenticated, ensure they cannot access the root if they are logged in
  if (session && request.nextUrl.pathname === ROOT_ROUTE) {
    const homeURL = new URL(HOME_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(homeURL.toString());
  }

  // Allow all other requests to proceed
  return NextResponse.next();
}
