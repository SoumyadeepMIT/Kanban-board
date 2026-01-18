// proxy.ts (project root)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJWT } from '@/lib/auth'

export const config = {
  matcher: ['/boards/:path*']
}

export function proxy(req: NextRequest) {
  console.log('Proxy running for:', req.url)
  
  const token = req.cookies.get('token')?.value || 
                req.headers.get('authorization')?.replace('Bearer ', '')

  console.log('Token found:', !!token)

  if (!token) {
    console.log('No token - redirecting to login')
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const decoded = verifyJWT(token)
  
  console.log('JWT decoded:', !!decoded?.userId)

  if (!decoded?.userId) {
    console.log('Invalid JWT - redirecting to login')
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-user-id', decoded.userId)

  console.log('User authenticated:', decoded.userId)
  
  return NextResponse.next({
    request: { 
      headers: requestHeaders 
    }
  })
}
