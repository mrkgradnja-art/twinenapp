import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimiter } from '@/lib/rateLimiter'
import { logger } from '@/lib/logger'

const createGroupSchema = z.object({
  name: z.string().min(1).max(50, 'Group name too long'),
  description: z.string().max(200, 'Description too long').optional(),
  participants: z.array(z.string()).min(1, 'At least one participant required').max(50, 'Too many participants'),
  isPrivate: z.boolean().default(true),
  avatar: z.string().url().optional()
})

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    // Rate limiting
    const rateLimitResult = await rateLimiter.checkLimit(request, 'get_conversations', 50, 3600)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // TODO: Get user from JWT token
    // const token = request.headers.get('authorization')?.replace('Bearer ', '')
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // const userId = decoded.userId

    const mockUserId = 'current_user_id'

    // TODO: Fetch user's conversations
    // const conversations = await prisma.conversation.findMany({
    //   where: {
    //     participants: {
    //       some: { userId }
    //     }
    //   },
    //   include: {
    //     participants: {
    //       include: {
    //         user: {
    //           select: {
    //             id: true,
    //             username: true,
    //             avatar: true,
    //             isVerified: true,
    //             status: true
    //           }
    //         }
    //       }
    //     },
    //     lastMessage: {
    //       include: {
    //         sender: {
    //           select: {
    //             id: true,
    //             username: true
    //           }
    //         }
    //       }
    //     },
    //     _count: {
    //       select: {
    //         messages: true
    //       }
    //     }
    //   },
    //   orderBy: { lastMessageAt: 'desc' }
    // })

    const mockConversations = [
      {
        id: 'conv_1',
        type: 'direct',
        name: null,
        description: null,
        avatar: null,
        isPrivate: true,
        participants: [
          {
            user: {
              id: mockUserId,
              username: 'current_user',
              avatar: null,
              isVerified: false,
              status: 'online'
            },
            joinedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
            lastReadAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
          },
          {
            user: {
              id: 'user_2',
              username: 'friend_user',
              avatar: '/images/cyberpunk-avatar.svg',
              isVerified: true,
              status: 'online'
            },
            joinedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
            lastReadAt: new Date(Date.now() - 30 * 60 * 1000)
          }
        ],
        lastMessage: {
          id: 'msg_1',
          content: 'Hey! How are you doing?',
          type: 'text',
          sender: {
            id: mockUserId,
            username: 'current_user'
          },
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        unreadCount: 3,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: 'conv_2',
        type: 'group',
        name: 'Cyberpunk Squad',
        description: 'Our awesome cyberpunk group chat',
        avatar: '/images/cyberpunk-avatar.svg',
        isPrivate: true,
        participants: [
          {
            user: {
              id: mockUserId,
              username: 'current_user',
              avatar: null,
              isVerified: false,
              status: 'online'
            },
            joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            lastReadAt: new Date(Date.now() - 10 * 60 * 1000)
          },
          {
            user: {
              id: 'user_3',
              username: 'cyberpunk_artist',
              avatar: null,
              isVerified: true,
              status: 'offline'
            },
            joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            lastReadAt: new Date(Date.now() - 5 * 60 * 1000)
          },
          {
            user: {
              id: 'user_4',
              username: 'neon_designer',
              avatar: null,
              isVerified: false,
              status: 'away'
            },
            joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            lastReadAt: new Date(Date.now() - 15 * 60 * 1000)
          }
        ],
        lastMessage: {
          id: 'msg_2',
          content: 'Check out this amazing neon artwork!',
          type: 'image',
          sender: {
            id: 'user_3',
            username: 'cyberpunk_artist'
          },
          createdAt: new Date(Date.now() - 10 * 60 * 1000)
        },
        unreadCount: 0,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 10 * 60 * 1000)
      }
    ]

    logger.info('Conversations fetched', {
      requestId,
      userId: mockUserId,
      conversationCount: mockConversations.length
    })

    return NextResponse.json({
      success: true,
      data: {
        conversations: mockConversations,
        totalUnread: mockConversations.reduce((sum, conv) => sum + conv.unreadCount, 0)
      }
    })
  } catch (error) {
    logger.error('Get conversations error', {
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json(
      { success: false, error: 'Failed to fetch conversations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    // Rate limiting for creating groups
    const rateLimitResult = await rateLimiter.checkLimit(request, 'create_group', 5, 3600)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many group creation attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, description, participants, isPrivate, avatar } = createGroupSchema.parse(body)

    // TODO: Get user from JWT token
    // const token = request.headers.get('authorization')?.replace('Bearer ', '')
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // const userId = decoded.userId

    const mockUserId = 'current_user_id'

    // TODO: Validate participants exist and can be added
    // const validParticipants = await validateParticipants(participants)
    // if (validParticipants.length !== participants.length) {
    //   return NextResponse.json(
    //     { success: false, error: 'Some participants are invalid' },
    //     { status: 400 }
    //   )
    // }

    // TODO: Create group conversation
    // const conversation = await prisma.conversation.create({
    //   data: {
    //     type: 'group',
    //     name,
    //     description,
    //     avatar,
    //     isPrivate,
    //     createdBy: userId,
    //     participants: {
    //       create: [
    //         { userId, role: 'admin', joinedAt: new Date() },
    //         ...participants.map(pId => ({
    //           userId: pId,
    //           role: 'member',
    //           joinedAt: new Date()
    //         }))
    //       ]
    //     },
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   include: {
    //     participants: {
    //       include: {
    //         user: {
    //           select: {
    //             id: true,
    //             username: true,
    //             avatar: true,
    //             isVerified: true
    //           }
    //         }
    //       }
    //     }
    //   }
    // })

    // TODO: Send welcome message
    // await prisma.message.create({
    //   data: {
    //     conversationId: conversation.id,
    //     senderId: userId,
    //     content: `${user.username} created the group "${name}"`,
    //     type: 'system',
    //     createdAt: new Date()
    //   }
    // })

    const mockConversation = {
      id: crypto.randomUUID(),
      type: 'group',
      name,
      description,
      avatar,
      isPrivate,
      createdBy: mockUserId,
      participants: [
        {
          user: {
            id: mockUserId,
            username: 'current_user',
            avatar: null,
            isVerified: false
          },
          role: 'admin',
          joinedAt: new Date()
        },
        ...participants.map(pId => ({
          user: {
            id: pId,
            username: `user_${pId}`,
            avatar: null,
            isVerified: false
          },
          role: 'member',
          joinedAt: new Date()
        }))
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    logger.info('Group created', {
      requestId,
      groupId: mockConversation.id,
      creatorId: mockUserId,
      participantCount: participants.length + 1
    })

    return NextResponse.json({
      success: true,
      message: 'Group created successfully',
      data: mockConversation
    })
  } catch (error) {
    logger.error('Create group error', {
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
      { success: false, error: 'Failed to create group' },
      { status: 500 }
    )
  }
}

// Helper function to validate participants
async function validateParticipants(participantIds: string[]): Promise<string[]> {
  // TODO: Check if participants exist and are not blocked
  // const users = await prisma.user.findMany({
  //   where: {
  //     id: { in: participantIds },
  //     isActive: true
  //   },
  //   select: { id: true }
  // })
  // 
  // return users.map(user => user.id)
  
  return participantIds // Mock validation
}
