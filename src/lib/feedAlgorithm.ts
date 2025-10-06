interface FeedPost {
  id: string
  authorId: string
  content: string
  createdAt: Date
  likesCount: number
  commentsCount: number
  sharesCount: number
  tags: string[]
  type: 'text' | 'image' | 'video' | 'audio'
  isPinned: boolean
  aiGenerated?: boolean
}

interface UserPreferences {
  interests: string[]
  blockedUsers: string[]
  mutedUsers: string[]
  followingUsers: string[]
  feedType: 'following' | 'latest' | 'trending' | 'ai_curated'
}

interface FeedOptions {
  userId: string
  page: number
  limit: number
  timeRange?: 'all' | 'today' | 'week' | 'month'
  type?: 'following' | 'latest' | 'trending' | 'ai_curated'
}

export class FeedAlgorithm {
  // Weight factors for different engagement types
  private static readonly WEIGHTS = {
    LIKE: 1,
    COMMENT: 3,
    SHARE: 5,
    PIN: 10,
    AI_GENERATED: 0.8, // Slight penalty for AI content
    RECENCY: 0.5
  }

  // Time decay factor (posts lose relevance over time)
  private static readonly TIME_DECAY = 0.1

  /**
   * Generate personalized feed for user
   */
  static async generateFeed(options: FeedOptions): Promise<FeedPost[]> {
    const { userId, page, limit, timeRange = 'all', type = 'following' } = options

    // TODO: Get user preferences from database
    // const userPrefs = await this.getUserPreferences(userId)
    
    const mockUserPrefs: UserPreferences = {
      interests: ['cyberpunk', 'technology', 'gaming'],
      blockedUsers: [],
      mutedUsers: [],
      followingUsers: ['user1', 'user2', 'user3'],
      feedType: type
    }

    // TODO: Fetch posts based on feed type
    // const posts = await this.fetchPosts(options, userPrefs)
    
    const mockPosts: FeedPost[] = [
      {
        id: '1',
        authorId: 'user1',
        content: 'Amazing cyberpunk cityscape!',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likesCount: 25,
        commentsCount: 5,
        sharesCount: 3,
        tags: ['cyberpunk', 'neon'],
        type: 'image',
        isPinned: false,
        aiGenerated: false
      },
      {
        id: '2',
        authorId: 'user2',
        content: 'Just finished building my new gaming setup',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likesCount: 15,
        commentsCount: 8,
        sharesCount: 2,
        tags: ['gaming', 'setup'],
        type: 'image',
        isPinned: false,
        aiGenerated: false
      }
    ]

    // Apply feed algorithm based on type
    switch (type) {
      case 'following':
        return this.generateFollowingFeed(mockPosts, mockUserPrefs, page, limit)
      case 'latest':
        return this.generateLatestFeed(mockPosts, page, limit)
      case 'trending':
        return this.generateTrendingFeed(mockPosts, page, limit)
      case 'ai_curated':
        return this.generateAICuratedFeed(mockPosts, mockUserPrefs, page, limit)
      default:
        return this.generateFollowingFeed(mockPosts, mockUserPrefs, page, limit)
    }
  }

  /**
   * Generate feed based on users you follow
   */
  private static generateFollowingFeed(
    posts: FeedPost[], 
    userPrefs: UserPreferences, 
    page: number, 
    limit: number
  ): FeedPost[] {
    // Filter posts from followed users
    const followingPosts = posts.filter(post => 
      userPrefs.followingUsers.includes(post.authorId)
    )

    // Apply engagement scoring
    const scoredPosts = followingPosts.map(post => ({
      ...post,
      score: this.calculateEngagementScore(post, userPrefs)
    }))

    // Sort by score (highest first)
    scoredPosts.sort((a, b) => b.score - a.score)

    // Apply pagination
    const startIndex = (page - 1) * limit
    return scoredPosts.slice(startIndex, startIndex + limit)
  }

  /**
   * Generate feed with latest posts
   */
  private static generateLatestFeed(
    posts: FeedPost[], 
    page: number, 
    limit: number
  ): FeedPost[] {
    // Sort by creation time (newest first)
    const sortedPosts = posts.sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    )

    // Apply pagination
    const startIndex = (page - 1) * limit
    return sortedPosts.slice(startIndex, startIndex + limit)
  }

  /**
   * Generate trending feed based on engagement
   */
  private static generateTrendingFeed(
    posts: FeedPost[], 
    page: number, 
    limit: number
  ): FeedPost[] {
    // Calculate trending score based on engagement velocity
    const trendingPosts = posts.map(post => ({
      ...post,
      score: this.calculateTrendingScore(post)
    }))

    // Sort by trending score
    trendingPosts.sort((a, b) => b.score - a.score)

    // Apply pagination
    const startIndex = (page - 1) * limit
    return trendingPosts.slice(startIndex, startIndex + limit)
  }

  /**
   * Generate AI-curated feed based on user interests
   */
  private static generateAICuratedFeed(
    posts: FeedPost[], 
    userPrefs: UserPreferences, 
    page: number, 
    limit: number
  ): FeedPost[] {
    // Score posts based on user interests
    const curatedPosts = posts.map(post => ({
      ...post,
      score: this.calculateInterestScore(post, userPrefs.interests)
    }))

    // Sort by interest score
    curatedPosts.sort((a, b) => b.score - a.score)

    // Apply pagination
    const startIndex = (page - 1) * limit
    return curatedPosts.slice(startIndex, startIndex + limit)
  }

  /**
   * Calculate engagement score for a post
   */
  private static calculateEngagementScore(post: FeedPost, userPrefs: UserPreferences): number {
    let score = 0

    // Base engagement score
    score += post.likesCount * this.WEIGHTS.LIKE
    score += post.commentsCount * this.WEIGHTS.COMMENT
    score += post.sharesCount * this.WEIGHTS.SHARE

    // Pinned posts get bonus
    if (post.isPinned) {
      score += this.WEIGHTS.PIN
    }

    // AI generated content gets slight penalty
    if (post.aiGenerated) {
      score *= this.WEIGHTS.AI_GENERATED
    }

    // Recency bonus (newer posts get higher scores)
    const ageInHours = (Date.now() - post.createdAt.getTime()) / (1000 * 60 * 60)
    const recencyScore = Math.max(0, 1 - (ageInHours * this.TIME_DECAY))
    score += recencyScore * this.WEIGHTS.RECENCY

    return score
  }

  /**
   * Calculate trending score based on engagement velocity
   */
  private static calculateTrendingScore(post: FeedPost): number {
    const ageInHours = (Date.now() - post.createdAt.getTime()) / (1000 * 60 * 60)
    const totalEngagement = post.likesCount + post.commentsCount + post.sharesCount
    
    // Trending score = engagement / age (higher for recent, high-engagement posts)
    return ageInHours > 0 ? totalEngagement / ageInHours : totalEngagement
  }

  /**
   * Calculate interest score based on user preferences
   */
  private static calculateInterestScore(post: FeedPost, interests: string[]): number {
    let score = 0
    
    // Match tags with user interests
    for (const tag of post.tags) {
      if (interests.includes(tag.toLowerCase())) {
        score += 2 // Bonus for interest matches
      }
    }

    // Add base engagement score
    score += post.likesCount * this.WEIGHTS.LIKE
    score += post.commentsCount * this.WEIGHTS.COMMENT
    score += post.sharesCount * this.WEIGHTS.SHARE

    return score
  }

  /**
   * Get user preferences from database
   */
  // TODO: Implement database query
  // private static async getUserPreferences(userId: string): Promise<UserPreferences> {
  //   const user = await prisma.user.findUnique({
  //     where: { id: userId },
  //     include: {
  //       following: true,
  //       blocked: true,
  //       muted: true,
  //       preferences: true
  //     }
  //   })
  //   
  //   return {
  //     interests: user.preferences.interests || [],
  //     blockedUsers: user.blocked.map(b => b.blockedId),
  //     mutedUsers: user.muted.map(m => m.mutedId),
  //     followingUsers: user.following.map(f => f.followingId),
  //     feedType: user.preferences.feedType || 'following'
  //   }
  // }

  /**
   * Fetch posts based on criteria
   */
  // TODO: Implement database query
  // private static async fetchPosts(options: FeedOptions, userPrefs: UserPreferences): Promise<FeedPost[]> {
  //   const whereClause = {
  //     AND: [
  //       { isDeleted: false },
  //       { visibility: { in: ['public', 'friends'] } },
  //       { authorId: { notIn: userPrefs.blockedUsers } },
  //       { authorId: { notIn: userPrefs.mutedUsers } }
  //     ]
  //   }
  //   
  //   if (options.timeRange !== 'all') {
  //     const timeMap = {
  //       today: 24 * 60 * 60 * 1000,
  //       week: 7 * 24 * 60 * 60 * 1000,
  //       month: 30 * 24 * 60 * 60 * 1000
  //     }
  //     
  //     whereClause.AND.push({
  //       createdAt: {
  //         gte: new Date(Date.now() - timeMap[options.timeRange])
  //       }
  //     })
  //   }
  //   
  //   return await prisma.post.findMany({
  //     where: whereClause,
  //     include: {
  //       likes: true,
  //       comments: true,
  //       shares: true
  //     },
  //     orderBy: { createdAt: 'desc' },
  //     take: 1000 // Fetch more than needed for algorithm processing
  //   })
  // }
}