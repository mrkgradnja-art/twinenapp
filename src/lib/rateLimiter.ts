interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
}

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
}

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export class RateLimiter {
  private configs = new Map<string, RateLimitConfig>()

  constructor() {
    // Default rate limits
    this.configs.set('phone_signup', { windowMs: 3600000, maxRequests: 5 }) // 5 per hour
    this.configs.set('phone_verify', { windowMs: 3600000, maxRequests: 10 }) // 10 per hour
    this.configs.set('account_recovery', { windowMs: 3600000, maxRequests: 3 }) // 3 per hour
    this.configs.set('block_user', { windowMs: 3600000, maxRequests: 10 }) // 10 per hour
    this.configs.set('mute_user', { windowMs: 3600000, maxRequests: 20 }) // 20 per hour
    this.configs.set('create_report', { windowMs: 3600000, maxRequests: 5 }) // 5 per hour
    this.configs.set('follow_action', { windowMs: 3600000, maxRequests: 50 }) // 50 per hour
    this.configs.set('post_interaction', { windowMs: 3600000, maxRequests: 100 }) // 100 per hour
    this.configs.set('create_comment', { windowMs: 3600000, maxRequests: 20 }) // 20 per hour
    this.configs.set('media_upload', { windowMs: 3600000, maxRequests: 10 }) // 10 per hour
    this.configs.set('update_post', { windowMs: 3600000, maxRequests: 20 }) // 20 per hour
  }

  async checkLimit(
    request: Request, 
    key: string, 
    maxRequests?: number, 
    windowMs?: number
  ): Promise<RateLimitResult> {
    const config = this.configs.get(key)
    const limit = maxRequests || config?.maxRequests || 100
    const window = windowMs || config?.windowMs || 3600000

    // Get client identifier (IP + User-Agent for now)
    const clientId = this.getClientId(request)
    const rateLimitKey = `${key}:${clientId}`
    
    const now = Date.now()
    const resetTime = now + window

    // Get current rate limit data
    const current = rateLimitStore.get(rateLimitKey)
    
    if (!current || current.resetTime < now) {
      // First request or window expired
      rateLimitStore.set(rateLimitKey, { count: 1, resetTime })
      return {
        allowed: true,
        remaining: limit - 1,
        resetTime
      }
    }

    if (current.count >= limit) {
      // Rate limit exceeded
      return {
        allowed: false,
        remaining: 0,
        resetTime: current.resetTime
      }
    }

    // Increment counter
    current.count++
    rateLimitStore.set(rateLimitKey, current)

    return {
      allowed: true,
      remaining: limit - current.count,
      resetTime: current.resetTime
    }
  }

  private getClientId(request: Request): string {
    const ip = this.getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    // Simple hash of IP + User-Agent
    return Buffer.from(`${ip}:${userAgent}`).toString('base64')
  }

  private getClientIP(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    
    if (forwarded) {
      return forwarded.split(',')[0].trim()
    }
    
    if (realIP) {
      return realIP
    }
    
    // Fallback for development
    return '127.0.0.1'
  }

  // Clean up expired entries periodically
  cleanup(): void {
    const now = Date.now()
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key)
      }
    }
  }
}

export const rateLimiter = new RateLimiter()

// Clean up every 5 minutes
setInterval(() => {
  rateLimiter.cleanup()
}, 5 * 60 * 1000)