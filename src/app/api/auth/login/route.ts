import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, rememberMe } = loginSchema.parse(body)

    // TODO: Replace with actual database query
    // const user = await prisma.user.findUnique({
    //   where: { email },
    //   include: { aiTwin: true }
    // })

    // Mock user for now
    const mockUser = {
      id: '1',
      email,
      username: 'cyberpunk_user',
      avatar: null,
      isVerified: true,
      status: 'online' as const,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // TODO: Replace with actual password verification
    // const isValidPassword = await bcrypt.compare(password, user.password)
    const isValidPassword = password === 'password123' // Mock validation

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: mockUser.id, email: mockUser.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: rememberMe ? '30d' : '24h' }
    )

    return NextResponse.json({
      success: true,
      data: {
        user: mockUser,
        token
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
