import { NextRequest } from 'next/server'
import { logger } from './logger'

interface SecurityHeaders {
  [key: string]: string
}

interface ThreatModel {
  risk: 'low' | 'medium' | 'high' | 'critical'
  description: string
  mitigation: string
  status: 'identified' | 'mitigated' | 'monitoring'
}

export class SecurityManager {
  private static readonly CSP_POLICY = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://vercel.live"],
    'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'img-src': ["'self'", "data:", "https:", "blob:"],
    'media-src': ["'self'", "https:", "blob:"],
    'connect-src': ["'self'", "wss:", "https:", "ws:"],
    'frame-src': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': []
  }

  private static readonly THREAT_MODEL: ThreatModel[] = [
    {
      risk: 'high',
      description: 'SQL Injection via user input',
      mitigation: 'Parameterized queries, input validation, ORM usage',
      status: 'mitigated'
    },
    {
      risk: 'high',
      description: 'Cross-Site Scripting (XSS)',
      mitigation: 'CSP headers, input sanitization, output encoding',
      status: 'mitigated'
    },
    {
      risk: 'medium',
      description: 'Cross-Site Request Forgery (CSRF)',
      mitigation: 'CSRF tokens, SameSite cookies, origin validation',
      status: 'mitigated'
    },
    {
      risk: 'high',
      description: 'Authentication bypass',
      mitigation: 'JWT validation, secure session management, 2FA',
      status: 'mitigated'
    },
    {
      risk: 'medium',
      description: 'Rate limiting bypass',
      mitigation: 'Multiple rate limiting layers, IP tracking, behavioral analysis',
      status: 'monitoring'
    },
    {
      risk: 'low',
      description: 'Information disclosure',
      mitigation: 'Error handling, logging sanitization, access controls',
      status: 'mitigated'
    },
    {
      risk: 'medium',
      description: 'File upload vulnerabilities',
      mitigation: 'File type validation, virus scanning, secure storage',
      status: 'mitigated'
    },
    {
      risk: 'high',
      description: 'Data breach',
      mitigation: 'Encryption at rest/transit, access logging, backups',
      status: 'monitoring'
    }
  ]

  /**
   * Generate security headers for responses
   */
  static generateSecurityHeaders(): SecurityHeaders {
    return {
      'Content-Security-Policy': this.buildCSP(),
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'same-origin'
    }
  }

  /**
   * Build Content Security Policy string
   */
  private static buildCSP(): string {
    return Object.entries(this.CSP_POLICY)
      .map(([directive, sources]) => {
        if (sources.length === 0) {
          return directive
        }
        return `${directive} ${sources.join(' ')}`
      })
      .join('; ')
  }

  /**
   * Validate request origin for CSRF protection
   */
  static validateOrigin(request: NextRequest): boolean {
    const origin = request.headers.get('origin')
    const host = request.headers.get('host')
    
    if (!origin) {
      return false
    }

    const allowedOrigins = [
      `https://${host}`,
      `http://localhost:3000`,
      `https://twinen.app`,
      `https://www.twinen.app`
    ]

    return allowedOrigins.includes(origin)
  }

  /**
   * Generate CSRF token
   */
  static generateCSRFToken(): string {
    return crypto.randomUUID()
  }

  /**
   * Validate CSRF token
   */
  static validateCSRFToken(request: NextRequest, token: string): boolean {
    const headerToken = request.headers.get('x-csrf-token')
    return headerToken === token
  }

  /**
   * Check for suspicious request patterns
   */
  static analyzeRequest(request: NextRequest): {
    suspicious: boolean
    reasons: string[]
    riskScore: number
  } {
    const reasons: string[] = []
    let riskScore = 0

    // Check user agent
    const userAgent = request.headers.get('user-agent') || ''
    if (!userAgent || userAgent.length < 10) {
      reasons.push('Missing or suspicious user agent')
      riskScore += 20
    }

    // Check for common bot patterns
    const botPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i
    ]
    
    if (botPatterns.some(pattern => pattern.test(userAgent))) {
      reasons.push('Bot-like user agent detected')
      riskScore += 15
    }

    // Check request frequency (would need rate limiting integration)
    // This is a placeholder - in production, integrate with rate limiter
    const clientIP = this.getClientIP(request)
    if (this.isHighFrequencyRequest(clientIP)) {
      reasons.push('High frequency requests detected')
      riskScore += 25
    }

    // Check for malicious payloads in URL
    const url = request.url
    const maliciousPatterns = [
      /<script/i,
      /javascript:/i,
      /onload=/i,
      /onerror=/i,
      /union\s+select/i,
      /drop\s+table/i,
      /insert\s+into/i
    ]

    if (maliciousPatterns.some(pattern => pattern.test(url))) {
      reasons.push('Potential malicious payload in URL')
      riskScore += 30
    }

    return {
      suspicious: riskScore > 30,
      reasons,
      riskScore
    }
  }

  /**
   * Get client IP address
   */
  private static getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    
    if (forwarded) {
      return forwarded.split(',')[0].trim()
    }
    
    if (realIP) {
      return realIP
    }
    
    return '127.0.0.1'
  }

  /**
   * Check if IP is making high frequency requests
   */
  private static isHighFrequencyRequest(ip: string): boolean {
    // TODO: Integrate with rate limiter to check actual frequency
    // This is a placeholder implementation
    return false
  }

  /**
   * Sanitize user input to prevent XSS
   */
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim()
  }

  /**
   * Validate file upload security
   */
  static validateFileUpload(file: File): {
    valid: boolean
    errors: string[]
  } {
    const errors: string[] = []
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'audio/mpeg',
      'audio/wav',
      'audio/ogg'
    ]

    // Check file size
    if (file.size > maxSize) {
      errors.push('File size exceeds 10MB limit')
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      errors.push('File type not allowed')
    }

    // Check for suspicious file extensions
    const suspiciousExtensions = ['.exe', '.bat', '.cmd', '.scr', '.pif', '.com']
    const fileName = file.name.toLowerCase()
    if (suspiciousExtensions.some(ext => fileName.endsWith(ext))) {
      errors.push('Suspicious file extension detected')
    }

    // Check for double extensions (potential evasion)
    const parts = fileName.split('.')
    if (parts.length > 2) {
      errors.push('File with multiple extensions detected')
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }

  /**
   * Get threat model
   */
  static getThreatModel(): ThreatModel[] {
    return this.THREAT_MODEL
  }

  /**
   * Log security event
   */
  static logSecurityEvent(
    event: string,
    request: NextRequest,
    details: Record<string, any> = {}
  ): void {
    logger.warn('Security event detected', {
      event,
      ip: this.getClientIP(request),
      userAgent: request.headers.get('user-agent'),
      url: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
      ...details
    })
  }

  /**
   * Check for dependency vulnerabilities
   */
  static async checkDependencyVulnerabilities(): Promise<{
    vulnerabilities: number
    critical: number
    high: number
    medium: number
    low: number
  }> {
    // TODO: Integrate with npm audit or Snyk
    // This is a placeholder implementation
    return {
      vulnerabilities: 0,
      critical: 0,
      high: 0,
      medium: 0,
      low: 0
    }
  }

  /**
   * Generate security report
   */
  static generateSecurityReport(): {
    threatModel: ThreatModel[]
    vulnerabilities: any
    recommendations: string[]
  } {
    return {
      threatModel: this.THREAT_MODEL,
      vulnerabilities: {
        // Would be populated by actual vulnerability scan
        total: 0,
        critical: 0,
        high: 0
      },
      recommendations: [
        'Implement regular security audits',
        'Keep dependencies updated',
        'Monitor for unusual activity patterns',
        'Implement automated vulnerability scanning',
        'Regular penetration testing',
        'Security awareness training for team'
      ]
    }
  }
}
