import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const createPostSchema = z.object({
  content: z.string().min(1).max(2000),
  media: z.array(z.object({
    url: z.string().url(),
    type: z.enum(['image', 'video', 'audio']),
    alt: z.string().optional()
  })).optional(),
  visibility: z.enum(['public', 'friends', 'private']),
  tags: z.array(z.string()).optional(),
  theme: z.string().optional()
})

const getPostsSchema = z.object({
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('10'),
  type: z.enum(['all', 'following', 'trending', 'ai_curated']).optional().default('all'),
  timeRange: z.enum(['all', 'today', 'week', 'month']).optional().default('all')
})

// Mock posts data
const mockPosts = [
  {
    id: '1',
    authorId: '1',
    author: {
      id: '1',
      username: 'cyberpunk_user',
      avatar: '/images/cyberpunk-avatar.svg',
      isVerified: true,
      status: 'online' as const
    },
    content: 'Just discovered this amazing cyberpunk cityscape! The neon lights and futuristic architecture are absolutely breathtaking. #cyberpunk #neon #futuristic',
    media: [{
      id: '1',
      url: '/images/cyberpunk-cityscape.svg',
      type: 'image' as const,
      alt: 'Cyberpunk cityscape with neon lights'
    }],
    type: 'image' as const,
    visibility: 'public' as const,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: [],
    comments: [],
    shares: [],
    reactions: [],
    tags: ['cyberpunk', 'neon', 'futuristic'],
    isPinned: false,
    aiGenerated: false
  },
  {
    id: '2',
    authorId: '2',
    author: {
      id: '2',
      username: 'neon_artist',
      avatar: null,
      isVerified: false,
      status: 'online' as const
    },
    content: 'Working on a new digital art piece. The colors are so vibrant! 🎨✨',
    media: [],
    type: 'text' as const,
    visibility: 'public' as const,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    likes: [],
    comments: [],
    shares: [],
    reactions: [],
    tags: ['art', 'digital', 'creative'],
    isPinned: false,
    aiGenerated: false
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const params = getPostsSchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      type: searchParams.get('type'),
      timeRange: searchParams.get('timeRange')
    })

    const page = parseInt(params.page)
    const limit = parseInt(params.limit)
    const offset = (page - 1) * limit

    // TODO: Replace with actual database query
    // const posts = await prisma.post.findMany({
    //   where: {
    //     ...(params.type === 'following' && {
    //       author: {
    //         followers: {
    //           some: { followerId: userId }
    //         }
    //       }
    //     }),
    //     ...(params.timeRange !== 'all' && {
    //       createdAt: {
    //         gte: getTimeRangeDate(params.timeRange)
    //       }
    //     })
    //   },
    //   include: {
    //     author: true,
    //     likes: true,
    //     comments: true,
    //     shares: true,
    //     reactions: true
    //   },
    //   orderBy: { createdAt: 'desc' },
    //   skip: offset,
    //   take: limit
    // })

    const posts = mockPosts.slice(offset, offset + limit)
    const total = mockPosts.length

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: offset + limit < total,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Get posts error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, media, visibility, tags, theme } = createPostSchema.parse(body)

    // TODO: Get user from JWT token
    // const token = request.headers.get('authorization')?.replace('Bearer ', '')
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // const userId = decoded.userId

    // TODO: Replace with actual database query
    // const post = await prisma.post.create({
    //   data: {
    //     authorId: userId,
    //     content,
    //     media: media || [],
    //     visibility,
    //     tags: tags || [],
    //     theme,
    //     type: media && media.length > 0 ? 'image' : 'text'
    //   },
    //   include: {
    //     author: true,
    //     likes: true,
    //     comments: true,
    //     shares: true,
    //     reactions: true
    //   }
    // })

    const mockPost = {
      id: Date.now().toString(),
      authorId: '1',
      author: {
        id: '1',
        username: 'cyberpunk_user',
        avatar: null,
        isVerified: true,
        status: 'online' as const
      },
      content,
      media: media || [],
      type: media && media.length > 0 ? 'image' as const : 'text' as const,
      visibility,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: [],
      comments: [],
      shares: [],
      reactions: [],
      tags: tags || [],
      isPinned: false,
      aiGenerated: false
    }

    return NextResponse.json({
      success: true,
      data: mockPost,
      message: 'Post created successfully'
    })
  } catch (error) {
    console.error('Create post error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
