import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateVerificationToken } from '../verify/route'

const resendSchema = z.object({
  email: z.string().email('Valid email is required')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = resendSchema.parse(body)

    // Check if user exists (in production, check database)
    // For now, we'll always generate a token
    
    // Generate new verification token
    const token = generateVerificationToken(email)
    
    // In production, send actual email
    // For now, we'll log it for development
    console.log(`Verification email for ${email}: http://localhost:3000/verify?token=${token}`)
    
    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully'
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid email address', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Resend verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
