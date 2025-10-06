import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimiter } from '@/lib/rateLimiter'
import { logger } from '@/lib/logger'

const createReferralSchema = z.object({
  email: z.string().email('Invalid email address'),
  message: z.string().max(500, 'Message too long').optional(),
  platform: z.enum(['email', 'twitter', 'facebook', 'linkedin', 'copy_link']).default('email')
})

const redeemReferralSchema = z.object({
  code: z.string().min(1, 'Referral code required'),
  userId: z.string().min(1, 'User ID required')
})

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action') || 'create'
  
  try {
    if (action === 'create') {
      return await handleCreateReferral(request, requestId)
    } else if (action === 'redeem') {
      return await handleRedeemReferral(request, requestId)
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      )
    }
  } catch (error) {
    logger.error('Referral action error', {
      requestId,
      action,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json(
      { success: false, error: 'Referral action failed' },
      { status: 500 }
    )
  }
}

async function handleCreateReferral(request: NextRequest, requestId: string) {
  // Rate limiting for referral creation
  const rateLimitResult = await rateLimiter.checkLimit(request, 'create_referral', 10, 3600)
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many referral requests. Please try again later.' },
      { status: 429 }
    )
  }

  const body = await request.json()
  const { email, message, platform } = createReferralSchema.parse(body)

  // TODO: Get user from JWT token
  // const token = request.headers.get('authorization')?.replace('Bearer ', '')
  // const decoded = jwt.verify(token, process.env.JWT_SECRET)
  // const userId = decoded.userId

  const mockUserId = 'current_user_id'

  // Generate unique referral code
  const referralCode = generateReferralCode(mockUserId)

  // TODO: Check if user already referred this email
  // const existingReferral = await prisma.referral.findFirst({
  //   where: {
  //     referrerId: userId,
  //     email
  //   }
  // })

  // if (existingReferral) {
  //   return NextResponse.json(
  //     { success: false, error: 'You have already referred this email' },
  //     { status: 409 }
  //   )
  // }

  // TODO: Create referral record
  // const referral = await prisma.referral.create({
  //   data: {
  //     referrerId: userId,
  //     email,
  //     code: referralCode,
  //     message,
  //     platform,
  //     status: 'pending',
  //     createdAt: new Date()
  //   }
  // })

  // TODO: Send referral email/SMS based on platform
  // await sendReferralInvitation(email, referralCode, message, platform)

  const mockReferral = {
    id: crypto.randomUUID(),
    referrerId: mockUserId,
    email,
    code: referralCode,
    message,
    platform,
    status: 'pending',
    createdAt: new Date()
  }

  logger.info('Referral created', {
    requestId,
    referralId: mockReferral.id,
    referrerId: mockUserId,
    email: email.replace(/\d(?=\d{4})/g, '*'),
    platform
  })

  return NextResponse.json({
    success: true,
    message: 'Referral invitation sent successfully',
    data: {
      referralId: mockReferral.id,
      code: referralCode,
      platform,
      sentAt: new Date().toISOString()
    }
  })
}

async function handleRedeemReferral(request: NextRequest, requestId: string) {
  const body = await request.json()
  const { code, userId } = redeemReferralSchema.parse(body)

  // TODO: Validate referral code
  // const referral = await prisma.referral.findUnique({
  //   where: { code },
  //   include: {
  //     referrer: {
  //       select: {
  //         id: true,
  //         username: true,
  //         avatar: true
  //       }
  //     }
  //   }
  // })

  // if (!referral) {
  //   return NextResponse.json(
  //     { success: false, error: 'Invalid referral code' },
  //     { status: 404 }
  //   )
  // }

  // if (referral.status !== 'pending') {
  //   return NextResponse.json(
  //     { success: false, error: 'Referral code already used' },
  //     { status: 409 }
  //   )
  // }

  // if (referral.referrerId === userId) {
  //   return NextResponse.json(
  //     { success: false, error: 'Cannot use your own referral code' },
  //     { status: 400 }
  //   )
  // }

  // TODO: Update referral status and give rewards
  // await prisma.$transaction([
  //   prisma.referral.update({
  //     where: { id: referral.id },
  //     data: {
  //       status: 'completed',
  //       redeemedAt: new Date(),
  //       redeemedBy: userId
  //     }
  //   }),
  //   prisma.user.update({
  //     where: { id: referral.referrerId },
  //     data: {
  //       referralCount: { increment: 1 },
  //       referralRewards: { increment: 100 } // Example: 100 points
  //     }
  //   }),
  //   prisma.user.update({
  //     where: { id: userId },
  //     data: {
  //       referralRewards: { increment: 50 } // Example: 50 points for new user
  //     }
  //   })
  // ])

  logger.info('Referral redeemed', {
    requestId,
    code,
    referrerId: 'referrer_id',
    redeemedBy: userId
  })

  return NextResponse.json({
    success: true,
    message: 'Referral code redeemed successfully',
    data: {
      referrer: {
        id: 'referrer_id',
        username: 'referrer_user',
        avatar: null
      },
      rewards: {
        referrerReward: 100,
        newUserReward: 50
      },
      redeemedAt: new Date().toISOString()
    }
  })
}

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    // TODO: Get user from JWT token
    // const token = request.headers.get('authorization')?.replace('Bearer ', '')
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // const userId = decoded.userId

    const mockUserId = 'current_user_id'

    // TODO: Fetch user's referral stats
    // const stats = await prisma.referral.aggregate({
    //   where: { referrerId: userId },
    //   _count: true,
    //   _sum: { reward: true }
    // })

    // const recentReferrals = await prisma.referral.findMany({
    //   where: { referrerId: userId },
    //   orderBy: { createdAt: 'desc' },
    //   take: 10
    // })

    const mockStats = {
      totalReferrals: 5,
      successfulReferrals: 3,
      pendingReferrals: 2,
      totalRewards: 300,
      referralCode: generateReferralCode(mockUserId)
    }

    const mockRecentReferrals = [
      {
        id: '1',
        email: 'friend@example.com',
        status: 'completed',
        platform: 'email',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        redeemedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        email: 'colleague@example.com',
        status: 'pending',
        platform: 'twitter',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        redeemedAt: null
      }
    ]

    return NextResponse.json({
      success: true,
      data: {
        stats: mockStats,
        recentReferrals: mockRecentReferrals
      }
    })
  } catch (error) {
    logger.error('Get referral stats error', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json(
      { success: false, error: 'Failed to fetch referral stats' },
      { status: 500 }
    )
  }
}

function generateReferralCode(userId: string): string {
  // Generate a unique referral code based on user ID and timestamp
  const timestamp = Date.now().toString(36)
  const userHash = userId.slice(-4)
  return `TWINEN-${userHash.toUpperCase()}-${timestamp.toUpperCase()}`
}

// Helper function to send referral invitation
async function sendReferralInvitation(
  email: string, 
  code: string, 
  message: string, 
  platform: string
): Promise<void> {
  // TODO: Implement platform-specific invitation sending
  console.log(`Sending ${platform} invitation to ${email} with code ${code}`)
}
