import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimiter } from '@/lib/rateLimiter'
import { logger } from '@/lib/logger'

const phoneSignupSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  countryCode: z.string().min(2).max(3),
  verificationMethod: z.enum(['sms', 'call', 'whatsapp'])
})

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    // Rate limiting
    const rateLimitResult = await rateLimiter.checkLimit(request, 'phone_signup', 5, 3600)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many signup attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { phone, countryCode, verificationMethod } = phoneSignupSchema.parse(body)

    // TODO: Integrate with SMS service (Twilio, AWS SNS, etc.)
    // const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    // await sendVerificationSMS(phone, verificationCode, verificationMethod)

    // Mock verification code for demo
    const verificationCode = '123456'
    
    logger.info('Phone signup initiated', {
      requestId,
      phone: phone.replace(/\d(?=\d{4})/g, '*'), // Mask phone number
      countryCode,
      verificationMethod
    })

    // TODO: Store verification code in Redis with expiration
    // await redis.setex(`phone_verify:${phone}`, 300, verificationCode)

    return NextResponse.json({
      success: true,
      data: {
        phone: phone.replace(/\d(?=\d{4})/g, '*'),
        verificationCode, // Remove in production
        expiresIn: 300
      },
      message: `Verification code sent via ${verificationMethod.toUpperCase()}`
    })
  } catch (error) {
    logger.error('Phone signup error', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to initiate phone signup' },
      { status: 500 }
    )
  }
}
