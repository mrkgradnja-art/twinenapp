import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimiter } from '@/lib/rateLimiter'
import { logger } from '@/lib/logger'

const searchSchema = z.object({
  query: z.string().min(1).max(100, 'Search query too long'),
  type: z.enum(['all', 'users', 'posts', 'hashtags']).default('all'),
  page: z.number().min(1).max(100).default(1),
  limit: z.number().min(1).max(50).default(20),
  filters: z.object({
    timeRange: z.enum(['all', 'today', 'week', 'month', 'year']).optional(),
    contentType: z.enum(['text', 'image', 'video', 'audio']).optional(),
    verifiedOnly: z.boolean().optional()
  }).optional()
})

export async function GET(request: NextRequest) {
  const requestId = crypto.randomUUID()
  
  try {
    // Rate limiting for search
    const rateLimitResult = await rateLimiter.checkLimit(request, 'search', 100, 3600)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many search requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const type = searchParams.get('type') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const timeRange = searchParams.get('timeRange') || 'all'
    const contentType = searchParams.get('contentType')
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true'

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Search query required' },
        { status: 400 }
      )
    }

    const searchData = searchSchema.parse({
      query,
      type,
      page,
      limit,
      filters: {
        timeRange,
        contentType,
        verifiedOnly
      }
    })

    // TODO: Implement actual search with database
    // const searchResults = await performSearch(searchData)

    // Mock search results
    const mockResults = await generateMockSearchResults(searchData)

    logger.info('Search performed', {
      requestId,
      query: query.substring(0, 50),
      type,
      page,
      limit,
      resultCount: mockResults.total
    })

    return NextResponse.json({
      success: true,
      data: mockResults
    })
  } catch (error) {
    logger.error('Search error', {
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
      { success: false, error: 'Search failed' },
      { status: 500 }
    )
  }
}

async function generateMockSearchResults(searchData: any) {
  const { query, type, page, limit } = searchData
  
  const mockUsers = [
    {
      id: '1',
      username: 'cyberpunk_user',
      displayName: 'Cyberpunk User',
      avatar: '/images/cyberpunk-avatar.svg',
      isVerified: true,
      followersCount: 1250,
      followingCount: 320,
      bio: 'Cyberpunk enthusiast and tech lover',
      tags: ['cyberpunk', 'tech', 'gaming']
    }
  ]

  const mockPosts = [
    {
      id: '1',
      content: `Found this amazing ${query} content!`,
      author: {
        id: '1',
        username: 'user1',
        avatar: null,
        isVerified: false
      },
      media: [],
      type: 'text',
      likesCount: 15,
      commentsCount: 3,
      sharesCount: 1,
      tags: [query.toLowerCase()],
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ]

  const mockHashtags = [
    {
      tag: query.toLowerCase(),
      postsCount: 150,
      trendingScore: 85,
      isTrending: true
    }
  ]

  let results = []
  let total = 0

  switch (type) {
    case 'users':
      results = mockUsers.filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.bio.toLowerCase().includes(query.toLowerCase())
      )
      total = results.length
      break
    case 'posts':
      results = mockPosts.filter(post =>
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.includes(query.toLowerCase()))
      )
      total = results.length
      break
    case 'hashtags':
      results = mockHashtags.filter(hashtag =>
        hashtag.tag.includes(query.toLowerCase())
      )
      total = results.length
      break
    case 'all':
    default:
      results = [
        { type: 'users', data: mockUsers },
        { type: 'posts', data: mockPosts },
        { type: 'hashtags', data: mockHashtags }
      ]
      total = mockUsers.length + mockPosts.length + mockHashtags.length
      break
  }

  const startIndex = (page - 1) * limit
  const paginatedResults = Array.isArray(results) 
    ? results.slice(startIndex, startIndex + limit)
    : results

  return {
    query,
    type,
    results: paginatedResults,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    },
    suggestions: generateSearchSuggestions(query),
    trending: await getTrendingTopics()
  }
}

function generateSearchSuggestions(query: string): string[] {
  const suggestions = [
    'cyberpunk',
    'neon lights',
    'futuristic',
    'technology',
    'gaming',
    'AI',
    'virtual reality',
    'sci-fi'
  ]
  
  return suggestions
    .filter(s => s.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5)
}

async function getTrendingTopics() {
  return [
    { tag: 'cyberpunk', postsCount: 1250, growth: '+15%' },
    { tag: 'neon', postsCount: 890, growth: '+8%' },
    { tag: 'futuristic', postsCount: 650, growth: '+12%' },
    { tag: 'AI', postsCount: 2100, growth: '+25%' }
  ]
}
