import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userId = request.cookies.get('auth.userId')?.value;
  const isAuthenticated = !!userId;

  // Home redirect
  if (pathname === '/') {
    return NextResponse.redirect(new URL(isAuthenticated ? '/articles' : '/login', request.url));
  }

  // Protected routes
  if ((pathname.startsWith('/articles') || pathname === '/logout') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Login page for authenticated users
  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/articles', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
