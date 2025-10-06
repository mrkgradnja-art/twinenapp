import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimiter } from '@/lib/rateLimiter'
import { logger } from '@/lib/logger'

const reportSchema = z.object({
  type: z.enum(['user', 'post', 'comment', 'message']),
  targetId: z.string().min(1, 'Target ID required'),
  reason: z.enum([
    'spam',
    'harassment',
    'hate_speech',
    'violence',
    'nudity',
    'copyright',
    'fake_news',
    'self_harm',
    'other'
  ]),
  description: z.string().max(1000, 'Description too long').optional(),
  evidence: z.array(z.string().url()).optional()
})

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    // Rate limiting for reports
    const rateLimitResult = await rateLimiter.checkLimit(request, 'create_report', 5, 3600)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many reports submitted. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { type, targetId, reason, description, evidence } = reportSchema.parse(body)

    // TODO: Get user from JWT token
    // const token = request.headers.get('authorization')?.replace('Bearer ', '')
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // const userId = decoded.userId

    const mockUserId = 'current_user_id'

    // TODO: Check if user has already reported this target
    // const existingReport = await prisma.report.findFirst({
    //   where: {
    //     reporterId: userId,
    //     targetType: type,
    //     targetId
    //   }
    // })

    // if (existingReport) {
    //   return NextResponse.json(
    //     { success: false, error: 'You have already reported this content' },
    //     { status: 409 }
    //   )
    // }

    // TODO: Create report
    // const report = await prisma.report.create({
    //   data: {
    //     reporterId: userId,
    //     targetType: type,
    //     targetId,
    //     reason,
    //     description,
    //     evidence,
    //     status: 'pending',
    //     priority: getReportPriority(reason),
    //     createdAt: new Date()
    //   }
    // })

    // TODO: Trigger moderation workflow
    // await triggerModerationWorkflow(report.id, type, reason)

    // Mock report ID
    const reportId = crypto.randomUUID()

    logger.info('Report created', {
      requestId,
      reportId,
      reporterId: mockUserId,
      targetType: type,
      targetId,
      reason,
      hasDescription: !!description,
      evidenceCount: evidence?.length || 0
    })

    return NextResponse.json({
      success: true,
      message: 'Report submitted successfully. Our moderation team will review it.',
      data: {
        reportId,
        status: 'pending',
        estimatedReviewTime: '24-48 hours'
      }
    })
  } catch (error) {
    logger.error('Create report error', {
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
      { success: false, error: 'Failed to submit report' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)

    // TODO: Get user from JWT token (admin/moderator only)
    // const token = request.headers.get('authorization')?.replace('Bearer ', '')
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // const userId = decoded.userId

    // TODO: Check if user has moderation permissions
    // const user = await prisma.user.findUnique({
    //   where: { id: userId },
    //   include: { roles: true }
    // })

    // if (!user || !user.roles.some(role => ['admin', 'moderator'].includes(role.name))) {
    //   return NextResponse.json(
    //     { success: false, error: 'Insufficient permissions' },
    //     { status: 403 }
    //   )
    // }

    // TODO: Fetch reports with pagination
    // const reports = await prisma.report.findMany({
    //   where: status !== 'all' ? { status } : {},
    //   include: {
    //     reporter: { select: { id: true, username: true, avatar: true } },
    //     moderator: { select: { id: true, username: true } }
    //   },
    //   orderBy: { createdAt: 'desc' },
    //   skip: (page - 1) * limit,
    //   take: limit
    // })

    // const totalCount = await prisma.report.count({
    //   where: status !== 'all' ? { status } : {}
    // })

    const mockReports = [
      {
        id: '1',
        reporter: { id: '1', username: 'user1', avatar: null },
        targetType: 'post',
        targetId: 'post_1',
        reason: 'spam',
        description: 'This post contains spam content',
        status: 'pending',
        priority: 'medium',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    ]

    return NextResponse.json({
      success: true,
      data: {
        reports: mockReports,
        pagination: {
          page,
          limit,
          total: 1,
          totalPages: 1
        }
      }
    })
  } catch (error) {
    logger.error('Get reports error', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}

// Helper function to determine report priority
function getReportPriority(reason: string): 'low' | 'medium' | 'high' | 'urgent' {
  const priorityMap = {
    'self_harm': 'urgent',
    'violence': 'high',
    'hate_speech': 'high',
    'harassment': 'medium',
    'nudity': 'medium',
    'spam': 'low',
    'copyright': 'low',
    'fake_news': 'medium',
    'other': 'low'
  }
  
  return priorityMap[reason as keyof typeof priorityMap] || 'low'
}