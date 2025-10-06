import { NextRequest, NextResponse } from 'next/server'
import { SecurityManager } from '@/lib/security'
import { rateLimiter } from '@/lib/rateLimiter'
import { logger } from '@/lib/logger'

export async function middleware(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    // Skip security middleware in development mode
    if (process.env.NODE_ENV === 'development') {
      const response = NextResponse.next()
      response.headers.set('X-Request-ID', requestId)
      return response
    }

    // Security analysis
    const securityAnalysis = SecurityManager.analyzeRequest(request)
    
    if (securityAnalysis.suspicious) {
      SecurityManager.logSecurityEvent('Suspicious request detected', request, {
        requestId,
        reasons: securityAnalysis.reasons,
        riskScore: securityAnalysis.riskScore
      })
      
      // Block high-risk requests
      if (securityAnalysis.riskScore > 50) {
        return new NextResponse('Request blocked for security reasons', { status: 403 })
      }
    }

    // CSRF protection for state-changing operations
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      if (!SecurityManager.validateOrigin(request)) {
        SecurityManager.logSecurityEvent('CSRF attempt detected', request, { requestId })
        return new NextResponse('CSRF token validation failed', { status: 403 })
      }
    }

    // Rate limiting
    const rateLimitResult = await rateLimiter.checkLimit(request, 'global', 1000, 3600)
    if (!rateLimitResult.allowed) {
      SecurityManager.logSecurityEvent('Rate limit exceeded', request, { requestId })
      return new NextResponse('Rate limit exceeded', { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
        }
      })
    }

    // Create response
    const response = NextResponse.next()

    // Add security headers
    const securityHeaders = SecurityManager.generateSecurityHeaders()
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    // Add custom headers
    response.headers.set('X-Request-ID', requestId)
    response.headers.set('X-Response-Time', Date.now().toString())

    return response

  } catch (error) {
    logger.error('Middleware error', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      url: request.url,
      method: request.method
    })

    return new NextResponse('Internal server error', { status: 500 })
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
