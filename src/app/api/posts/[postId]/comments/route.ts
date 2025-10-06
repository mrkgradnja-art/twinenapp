import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimiter } from '@/lib/rateLimiter'
import { logger } from '@/lib/logger'

const commentSchema = z.object({
  content: z.string().min(1).max(1000, 'Comment too long'),
  parentId: z.string().optional(),
  mentions: z.array(z.string()).optional(),
  media: z.array(z.object({
    url: z.string().url(),
    type: z.enum(['image', 'video', 'audio']),
    alt: z.string().optional()
  })).optional()
})

export async function POST(request: NextRequest, { params }: { params: { postId: string } }) {
  const requestId = crypto.randomUUID()
  
  try {
    // Rate limiting for comments
    const rateLimitResult = await rateLimiter.checkLimit(request, 'create_comment', 20, 3600)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many comments. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { content, parentId, mentions, media } = commentSchema.parse(body)
    const { postId } = params

    // TODO: Get user from JWT token
    // const token = request.headers.get('authorization')?.replace('Bearer ', '')
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // const userId = decoded.userId

    const mockUserId = 'current_user_id'

    // TODO: Verify post exists
    // const post = await prisma.post.findUnique({
    //   where: { id: postId },
    //   include: { author: true }
    // })

    // if (!post) {
    //   return NextResponse.json(
    //     { success: false, error: 'Post not found' },
    //     { status: 404 }
    //   )
    // }

    // TODO: Create comment
    // const comment = await prisma.comment.create({
    //   data: {
    //     content,
    //     authorId: userId,
    //     postId,
    //     parentId,
    //     mentions: mentions || [],
    //     media: media || [],
    //     createdAt: new Date()
    //   },
    //   include: {
    //     author: {
    //       select: {
    //         id: true,
    //         username: true,
    //         avatar: true,
    //         isVerified: true
    //       }
    //     }
    //   }
    // })

    // TODO: Update post comment count
    // await prisma.post.update({
    //   where: { id: postId },
    //   data: { commentsCount: { increment: 1 } }
    // })

    // TODO: Create notifications for mentions
    // if (mentions && mentions.length > 0) {
    //   for (const mentionId of mentions) {
    //     await prisma.notification.create({
    //       data: {
    //         userId: mentionId,
    //         type: 'mention',
    //         actorId: userId,
    //         targetId: comment.id,
    //         message: `${user.username} mentioned you in a comment`,
    //         createdAt: new Date()
    //       }
    //     })
    //   }
    // }

    // TODO: Create notification for post author (if not the commenter)
    // if (post.authorId !== userId) {
    //   await prisma.notification.create({
    //     data: {
    //       userId: post.authorId,
    //       type: 'comment',
    //       actorId: userId,
    //       targetId: comment.id,
    //       message: `${user.username} commented on your post`,
    //       createdAt: new Date()
    //     }
    //   })
    // }

    const mockComment = {
      id: crypto.randomUUID(),
      content,
      author: {
        id: mockUserId,
        username: 'current_user',
        avatar: null,
        isVerified: false
      },
      postId,
      parentId,
      mentions: mentions || [],
      media: media || [],
      likesCount: 0,
      repliesCount: 0,
      createdAt: new Date()
    }

    logger.info('Comment created', {
      requestId,
      commentId: mockComment.id,
      postId,
      authorId: mockUserId,
      hasMentions: (mentions?.length || 0) > 0,
      hasMedia: (media?.length || 0) > 0
    })

    return NextResponse.json({
      success: true,
      message: 'Comment created successfully',
      data: mockComment
    })
  } catch (error) {
    logger.error('Create comment error', {
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
      { success: false, error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  const requestId = crypto.randomUUID()
  
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
    const sortBy = searchParams.get('sort') || 'newest' // newest, oldest, popular
    const { postId } = params

    // TODO: Fetch comments with pagination
    // const orderBy = sortBy === 'popular' 
    //   ? { likesCount: 'desc' as const }
    //   : sortBy === 'oldest'
    //   ? { createdAt: 'asc' as const }
    //   : { createdAt: 'desc' as const }

    // const comments = await prisma.comment.findMany({
    //   where: { postId },
    //   include: {
    //     author: {
    //       select: {
    //         id: true,
    //         username: true,
    //         avatar: true,
    //         isVerified: true
    //       }
    //     },
    //     _count: {
    //       select: {
    //         replies: true,
    //         likes: true
    //       }
    //     }
    //   },
    //   orderBy,
    //   skip: (page - 1) * limit,
    //   take: limit
    // })

    // const totalCount = await prisma.comment.count({ where: { postId } })

    const mockComments = [
      {
        id: '1',
        content: 'Great post! Really enjoyed reading this.',
        author: {
          id: '2',
          username: 'commenter1',
          avatar: null,
          isVerified: false
        },
        postId,
        parentId: null,
        mentions: [],
        media: [],
        likesCount: 5,
        repliesCount: 2,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    ]

    return NextResponse.json({
      success: true,
      data: {
        comments: mockComments,
        pagination: {
          page,
          limit,
          total: 1,
          totalPages: 1
        },
        sortBy
      }
    })
  } catch (error) {
    logger.error('Get comments error', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}
