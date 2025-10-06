import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimiter } from '@/lib/rateLimiter'
import { logger } from '@/lib/logger'

const interactionSchema = z.object({
  type: z.enum(['like', 'unlike', 'repost', 'unrepost', 'bookmark', 'unbookmark']),
  postId: z.string().min(1, 'Post ID required')
})

export async function POST(request: NextRequest, { params }: { params: { postId: string } }) {
  const requestId = crypto.randomUUID()
  
  try {
    // Rate limiting
    const rateLimitResult = await rateLimiter.checkLimit(request, 'post_interaction', 100, 3600)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many interactions. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { type } = interactionSchema.parse(body)
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

    switch (type) {
      case 'like':
      case 'unlike':
        return await handleLikeInteraction(postId, mockUserId, type === 'like', requestId)
      
      case 'repost':
      case 'unrepost':
        return await handleRepostInteraction(postId, mockUserId, type === 'repost', requestId)
      
      case 'bookmark':
      case 'unbookmark':
        return await handleBookmarkInteraction(postId, mockUserId, type === 'bookmark', requestId)
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid interaction type' },
          { status: 400 }
        )
    }
  } catch (error) {
    logger.error('Post interaction error', {
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
      { success: false, error: 'Failed to process interaction' },
      { status: 500 }
    )
  }
}

async function handleLikeInteraction(postId: string, userId: string, isLike: boolean, requestId: string) {
  try {
    if (isLike) {
      // TODO: Check if already liked
      // const existingLike = await prisma.like.findFirst({
      //   where: {
      //     userId,
      //     postId
      //   }
      // })

      // if (existingLike) {
      //   return NextResponse.json(
      //     { success: false, error: 'Already liked this post' },
      //     { status: 409 }
      //   )
      // }

      // TODO: Create like and update count
      // await prisma.$transaction([
      //   prisma.like.create({
      //     data: {
      //       userId,
      //       postId,
      //       createdAt: new Date()
      //     }
      //   }),
      //   prisma.post.update({
      //     where: { id: postId },
      //     data: { likesCount: { increment: 1 } }
      //   })
      // ])

      logger.info('Post liked', { requestId, userId, postId })
      
      return NextResponse.json({
        success: true,
        message: 'Post liked successfully',
        data: { liked: true, likesCount: 1 }
      })
    } else {
      // TODO: Remove like and update count
      // const deletedLike = await prisma.like.deleteMany({
      //   where: {
      //     userId,
      //     postId
      //   }
      // })

      // if (deletedLike.count > 0) {
      //   await prisma.post.update({
      //     where: { id: postId },
      //     data: { likesCount: { decrement: 1 } }
      //   })
      // }

      logger.info('Post unliked', { requestId, userId, postId })
      
      return NextResponse.json({
        success: true,
        message: 'Post unliked successfully',
        data: { liked: false, likesCount: 0 }
      })
    }
  } catch (error) {
    throw error
  }
}

async function handleRepostInteraction(postId: string, userId: string, isRepost: boolean, requestId: string) {
  try {
    if (isRepost) {
      // TODO: Check if already reposted
      // const existingRepost = await prisma.repost.findFirst({
      //   where: {
      //     userId,
      //     postId
      //   }
      // })

      // if (existingRepost) {
      //   return NextResponse.json(
      //     { success: false, error: 'Already reposted this post' },
      //     { status: 409 }
      //   )
      // }

      // TODO: Create repost and update count
      // await prisma.$transaction([
      //   prisma.repost.create({
      //     data: {
      //       userId,
      //       postId,
      //       createdAt: new Date()
      //     }
      //   }),
      //   prisma.post.update({
      //     where: { id: postId },
      //     data: { repostsCount: { increment: 1 } }
      //   })
      // ])

      logger.info('Post reposted', { requestId, userId, postId })
      
      return NextResponse.json({
        success: true,
        message: 'Post reposted successfully',
        data: { reposted: true, repostsCount: 1 }
      })
    } else {
      // TODO: Remove repost and update count
      // const deletedRepost = await prisma.repost.deleteMany({
      //   where: {
      //     userId,
      //     postId
      //   }
      // })

      // if (deletedRepost.count > 0) {
      //   await prisma.post.update({
      //     where: { id: postId },
      //     data: { repostsCount: { decrement: 1 } }
      //   })
      // }

      logger.info('Post unreposted', { requestId, userId, postId })
      
      return NextResponse.json({
        success: true,
        message: 'Post unreposted successfully',
        data: { reposted: false, repostsCount: 0 }
      })
    }
  } catch (error) {
    throw error
  }
}

async function handleBookmarkInteraction(postId: string, userId: string, isBookmark: boolean, requestId: string) {
  try {
    if (isBookmark) {
      // TODO: Check if already bookmarked
      // const existingBookmark = await prisma.bookmark.findFirst({
      //   where: {
      //     userId,
      //     postId
      //   }
      // })

      // if (existingBookmark) {
      //   return NextResponse.json(
      //     { success: false, error: 'Already bookmarked this post' },
      //     { status: 409 }
      //   )
      // }

      // TODO: Create bookmark
      // await prisma.bookmark.create({
      //   data: {
      //     userId,
      //     postId,
      //     createdAt: new Date()
      //   }
      // })

      logger.info('Post bookmarked', { requestId, userId, postId })
      
      return NextResponse.json({
        success: true,
        message: 'Post bookmarked successfully',
        data: { bookmarked: true }
      })
    } else {
      // TODO: Remove bookmark
      // await prisma.bookmark.deleteMany({
      //   where: {
      //     userId,
      //     postId
      //   }
      // })

      logger.info('Post unbookmarked', { requestId, userId, postId })
      
      return NextResponse.json({
        success: true,
        message: 'Post unbookmarked successfully',
        data: { bookmarked: false }
      })
    }
  } catch (error) {
    throw error
  }
}
