import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { rateLimiter } from '@/lib/rateLimiter'
import { logger } from '@/lib/logger'

const phoneVerifySchema = z.object({
  phone: z.string(),
  code: z.string().length(6, 'Verification code must be 6 digits'),
  deviceInfo: z.object({
    userAgent: z.string(),
    fingerprint: z.string().optional()
  }).optional()
})

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    // Rate limiting for verification attempts
    const rateLimitResult = await rateLimiter.checkLimit(request, 'phone_verify', 10, 3600)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many verification attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { phone, code, deviceInfo } = phoneVerifySchema.parse(body)

    // TODO: Verify code from Redis
    // const storedCode = await redis.get(`phone_verify:${phone}`)
    // if (!storedCode || storedCode !== code) {
    //   return NextResponse.json(
    //     { success: false, error: 'Invalid or expired verification code' },
    //     { status: 400 }
    //   )
    // }

    // Mock verification for demo (accepts '123456')
    if (code !== '123456') {
      return NextResponse.json(
        { success: false, error: 'Invalid verification code' },
        { status: 400 }
      )
    }

    // TODO: Check if user exists, create if not
    // const existingUser = await prisma.user.findUnique({ where: { phone } })
    // let user = existingUser

    // if (!user) {
    //   user = await prisma.user.create({
    //     data: {
    //       phone,
    //       isVerified: true,
    //       status: 'offline',
    //       deviceTrust: {
    //         create: {
    //           userAgent: deviceInfo?.userAgent || '',
    //           fingerprint: deviceInfo?.fingerprint || '',
    //           isTrusted: true,
    //           lastSeen: new Date()
    //         }
    //       }
    //     }
    //   })
    // }

    const mockUser = {
      id: Date.now().toString(),
      phone,
      username: `user_${Date.now()}`,
      avatar: null,
      isVerified: true,
      status: 'offline' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: mockUser.id, 
        phone: mockUser.phone,
        verified: true,
        deviceTrust: true
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '30d' } // Longer expiry for trusted devices
    )

    // TODO: Clear verification code from Redis
    // await redis.del(`phone_verify:${phone}`)

    logger.info('Phone verification successful', {
      requestId,
      userId: mockUser.id,
      phone: phone.replace(/\d(?=\d{4})/g, '*')
    })

    return NextResponse.json({
      success: true,
      data: {
        user: mockUser,
        token,
        isNewUser: true, // Would be determined by database check
        deviceTrusted: true
      },
      message: 'Phone verified successfully'
    })
  } catch (error) {
    logger.error('Phone verification error', {
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
      { success: false, error: 'Failed to verify phone number' },
      { status: 500 }
    )
  }
}
