import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const verifySchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
  email: z.string().email('Valid email is required')
})

// Mock verification storage (in production, use Redis or database)
const verificationTokens = new Map<string, { email: string; expires: number }>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, email } = verifySchema.parse(body)

    // Check if token exists and is valid
    const storedToken = verificationTokens.get(token)
    
    if (!storedToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    if (storedToken.email !== email) {
      return NextResponse.json(
        { error: 'Token email mismatch' },
        { status: 400 }
      )
    }

    if (Date.now() > storedToken.expires) {
      verificationTokens.delete(token)
      return NextResponse.json(
        { error: 'Verification token has expired' },
        { status: 400 }
      )
    }

    // Mark email as verified (in production, update database)
    verificationTokens.delete(token)
    
    return NextResponse.json({
      success: true,
      message: 'Email verified successfully'
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to generate and store verification token
export function generateVerificationToken(email: string): string {
  const token = Math.random().toString(36).substring(2, 15) + 
                Math.random().toString(36).substring(2, 15)
  
  verificationTokens.set(token, {
    email,
    expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  })
  
  return token
}
