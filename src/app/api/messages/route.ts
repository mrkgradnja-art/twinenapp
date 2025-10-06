import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimiter } from '@/lib/rateLimiter'
import { logger } from '@/lib/logger'

const createMessageSchema = z.object({
  recipientId: z.string().min(1, 'Recipient ID required'),
  content: z.string().min(1).max(2000, 'Message too long'),
  type: z.enum(['text', 'image', 'video', 'audio', 'file']).default('text'),
  media: z.object({
    url: z.string().url(),
    type: z.enum(['image', 'video', 'audio', 'file']),
    name: z.string(),
    size: z.number()
  }).optional(),
  replyToId: z.string().optional()
})

const getMessagesSchema = z.object({
  conversationId: z.string().optional(),
  recipientId: z.string().optional(),
  page: z.number().min(1).max(100).default(1),
  limit: z.number().min(1).max(100).default(50),
  before: z.string().optional() // Message ID for pagination
})

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    // Rate limiting for messages
    const rateLimitResult = await rateLimiter.checkLimit(request, 'send_message', 100, 3600)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many messages. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { recipientId, content, type, media, replyToId } = createMessageSchema.parse(body)

    // TODO: Get user from JWT token
    // const token = request.headers.get('authorization')?.replace('Bearer ', '')
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // const userId = decoded.userId

    const mockUserId = 'current_user_id'

    // TODO: Check if users can message each other
    // const canMessage = await checkMessagePermissions(userId, recipientId)
    // if (!canMessage) {
    //   return NextResponse.json(
    //     { success: false, error: 'Cannot send message to this user' },
    //     { status: 403 }
    //   )
    // }

    // TODO: Create message
    // const message = await prisma.message.create({
    //   data: {
    //     senderId: userId,
    //     recipientId,
    //     content,
    //     type,
    //     media,
    //     replyToId,
    //     conversationId: await getOrCreateConversation(userId, recipientId),
    //     createdAt: new Date()
    //   },
    //   include: {
    //     sender: {
    //       select: {
    //         id: true,
    //         username: true,
    //         avatar: true,
    //         isVerified: true
    //       }
    //     },
    //     replyTo: true
    //   }
    // })

    // TODO: Update conversation last message
    // await prisma.conversation.update({
    //   where: { id: message.conversationId },
    //   data: {
    //     lastMessageId: message.id,
    //     lastMessageAt: new Date(),
    //     unreadCount: {
    //       increment: 1
    //     }
    //   }
    // })

    // TODO: Send real-time notification via WebSocket
    // await sendMessageNotification(recipientId, message)

    const mockMessage = {
      id: crypto.randomUUID(),
      senderId: mockUserId,
      recipientId,
      content,
      type,
      media,
      replyToId,
      conversationId: crypto.randomUUID(),
      createdAt: new Date(),
      readAt: null,
      deliveredAt: new Date()
    }

    logger.info('Message sent', {
      requestId,
      messageId: mockMessage.id,
      senderId: mockUserId,
      recipientId,
      type,
      hasMedia: !!media
    })

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      data: mockMessage
    })
  } catch (error) {
    logger.error('Send message error', {
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
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get('conversationId')
    const recipientId = searchParams.get('recipientId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const before = searchParams.get('before')

    const getData = getMessagesSchema.parse({
      conversationId,
      recipientId,
      page,
      limit,
      before
    })

    // TODO: Get user from JWT token
    // const token = request.headers.get('authorization')?.replace('Bearer ', '')
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // const userId = decoded.userId

    const mockUserId = 'current_user_id'

    // TODO: Fetch messages from database
    // const messages = await prisma.message.findMany({
    //   where: {
    //     OR: [
    //       { senderId: userId, recipientId: getData.recipientId },
    //       { senderId: getData.recipientId, recipientId: userId }
    //     ],
    //     ...(before && { id: { lt: before } })
    //   },
    //   include: {
    //     sender: {
    //       select: {
    //         id: true,
    //         username: true,
    //         avatar: true,
    //         isVerified: true
    //       }
    //     },
    //     replyTo: {
    //       include: {
    //         sender: {
    //           select: {
    //             id: true,
    //             username: true
    //           }
    //         }
    //       }
    //     }
    //   },
    //   orderBy: { createdAt: 'desc' },
    //   take: limit + 1 // +1 to check if there are more messages
    // })

    const mockMessages = [
      {
        id: '1',
        senderId: mockUserId,
        recipientId: getData.recipientId || 'recipient_id',
        content: 'Hey! How are you doing?',
        type: 'text',
        media: null,
        replyToId: null,
        conversationId: 'conv_1',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        readAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        deliveredAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        sender: {
          id: mockUserId,
          username: 'current_user',
          avatar: null,
          isVerified: false
        },
        replyTo: null
      },
      {
        id: '2',
        senderId: getData.recipientId || 'recipient_id',
        recipientId: mockUserId,
        content: 'I\'m doing great! Thanks for asking.',
        type: 'text',
        media: null,
        replyToId: null,
        conversationId: 'conv_1',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        readAt: null,
        deliveredAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        sender: {
          id: getData.recipientId || 'recipient_id',
          username: 'recipient_user',
          avatar: null,
          isVerified: true
        },
        replyTo: null
      }
    ]

    // TODO: Mark messages as read
    // if (messages.length > 0) {
    //   await prisma.message.updateMany({
    //     where: {
    //       id: { in: messages.map(m => m.id) },
    //       recipientId: userId,
    //       readAt: null
    //     },
    //     data: { readAt: new Date() }
    //   })
    // }

    return NextResponse.json({
      success: true,
      data: {
        messages: mockMessages,
        pagination: {
          page,
          limit,
          hasMore: false,
          total: mockMessages.length
        }
      }
    })
  } catch (error) {
    logger.error('Get messages error', {
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
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// Helper functions (to be implemented with database)
async function checkMessagePermissions(senderId: string, recipientId: string): Promise<boolean> {
  // TODO: Check if users can message each other
  // - Not blocked
  // - Privacy settings allow messages
  // - Not muted
  return true
}

async function getOrCreateConversation(userId1: string, userId2: string): Promise<string> {
  // TODO: Get or create conversation between two users
  return crypto.randomUUID()
}

async function sendMessageNotification(recipientId: string, message: any): Promise<void> {
  // TODO: Send real-time notification via WebSocket
  console.log('Sending message notification to:', recipientId)
}
