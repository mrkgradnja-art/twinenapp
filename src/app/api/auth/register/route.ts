import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const registerSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email, password, agreeToTerms } = registerSchema.parse(body)

    if (!agreeToTerms) {
      return NextResponse.json(
        { success: false, error: 'You must agree to the terms and conditions' },
        { status: 400 }
      )
    }

    // TODO: Replace with actual database queries
    // Check if user already exists
    // const existingUser = await prisma.user.findFirst({
    //   where: {
    //     OR: [
    //       { email },
    //       { username }
    //     ]
    //   }
    // })

    // if (existingUser) {
    //   return NextResponse.json(
    //     { success: false, error: 'User with this email or username already exists' },
    //     { status: 409 }
    //   )
    // }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    // const user = await prisma.user.create({
    //   data: {
    //     username,
    //     email,
    //     password: hashedPassword,
    //     isVerified: false,
    //     status: 'offline',
    //     aiTwin: {
    //       create: {
    //         name: `${username}'s Twin`,
    //         personality: {
    //           tone: 'friendly',
    //           humor: 'light',
    //           formality: 'casual',
    //           interests: [],
    //           communicationStyle: 'conversational'
    //         },
    //         capabilities: [],
    //         isActive: true,
    //         settings: {
    //           autoSummarize: true,
    //           autoDraft: false,
    //           themeAssist: true,
    //           familyLoom: false,
    //           carePings: true,
    //           empathyLens: true,
    //           memoryCapsules: false,
    //           lifePatchNotes: false,
    //           trustTokens: true
    //         }
    //       }
    //     }
    //   },
    //   include: { aiTwin: true }
    // })

    // Mock user creation
    const mockUser = {
      id: Date.now().toString(),
      username,
      email,
      avatar: null,
      isVerified: false,
      status: 'offline' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: mockUser.id, email: mockUser.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    )

    // TODO: Send verification email
    // await sendVerificationEmail(email, token)

    return NextResponse.json({
      success: true,
      data: {
        user: mockUser,
        token
      },
      message: 'Account created successfully. Please check your email for verification.'
    })
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
