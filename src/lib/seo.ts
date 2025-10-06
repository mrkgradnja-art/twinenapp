interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  siteName?: string
  locale?: string
}

interface UserProfile {
  id: string
  username: string
  displayName?: string
  bio?: string
  avatar?: string
  isVerified: boolean
  followersCount: number
  followingCount: number
}

interface Post {
  id: string
  content: string
  author: UserProfile
  media?: Array<{
    url: string
    type: string
    alt?: string
  }>
  createdAt: Date
  likesCount: number
  commentsCount: number
  sharesCount: number
  tags: string[]
}

export class SEOGenerator {
  private static readonly DEFAULT_CONFIG = {
    siteName: 'Twinen',
    locale: 'en_US',
    type: 'website' as const
  }

  /**
   * Generate SEO metadata for homepage
   */
  static generateHomepageSEO(): SEOConfig {
    return {
      title: 'Twinen - The Social Network That Moves With You',
      description: 'Connect with your AI Twin and build meaningful relationships in a cyberpunk-inspired social network. Experience the future of social media with AI-powered features, collective streaks, and immersive cyberpunk aesthetics.',
      keywords: [
        'social network',
        'AI twin',
        'cyberpunk',
        'social media',
        'artificial intelligence',
        'neon',
        'futuristic',
        'community',
        'connections'
      ],
      image: '/images/twinen-og-image.png',
      url: 'https://twinen.app',
      type: 'website',
      ...this.DEFAULT_CONFIG
    }
  }

  /**
   * Generate SEO metadata for user profile
   */
  static generateProfileSEO(user: UserProfile): SEOConfig {
    const title = user.displayName 
      ? `${user.displayName} (@${user.username}) | Twinen`
      : `@${user.username} | Twinen`
    
    const description = user.bio 
      ? `${user.bio} • ${user.followersCount.toLocaleString()} followers on Twinen`
      : `Follow @${user.username} on Twinen • ${user.followersCount.toLocaleString()} followers`

    return {
      title,
      description,
      keywords: [
        user.username,
        user.displayName || '',
        'twinen',
        'social media',
        'profile'
      ].filter(Boolean),
      image: user.avatar || '/images/default-avatar.png',
      url: `https://twinen.app/profile/${user.username}`,
      type: 'profile',
      ...this.DEFAULT_CONFIG
    }
  }

  /**
   * Generate SEO metadata for post
   */
  static generatePostSEO(post: Post): SEOConfig {
    const title = post.content.length > 60 
      ? `${post.content.substring(0, 60)}... | Twinen`
      : `${post.content} | Twinen`
    
    const description = `Post by @${post.author.username} on Twinen • ${post.likesCount} likes, ${post.commentsCount} comments`
    
    const keywords = [
      post.author.username,
      ...post.tags,
      'twinen',
      'social media',
      'post'
    ]

    const image = post.media?.find(m => m.type === 'image')?.url || post.author.avatar || '/images/default-post-image.png'

    return {
      title,
      description,
      keywords,
      image,
      url: `https://twinen.app/post/${post.id}`,
      type: 'article',
      ...this.DEFAULT_CONFIG
    }
  }

  /**
   * Generate OpenGraph tags
   */
  static generateOpenGraphTags(config: SEOConfig): Record<string, string> {
    return {
      'og:title': config.title,
      'og:description': config.description,
      'og:image': config.image || '',
      'og:url': config.url || '',
      'og:type': config.type || 'website',
      'og:site_name': config.siteName || 'Twinen',
      'og:locale': config.locale || 'en_US',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': config.title
    }
  }

  /**
   * Generate Twitter Card tags
   */
  static generateTwitterCardTags(config: SEOConfig, user?: UserProfile): Record<string, string> {
    const cardType = config.image ? 'summary_large_image' : 'summary'
    
    return {
      'twitter:card': cardType,
      'twitter:title': config.title,
      'twitter:description': config.description,
      'twitter:image': config.image || '',
      'twitter:image:alt': config.title,
      'twitter:site': '@twinenapp',
      'twitter:creator': user ? `@${user.username}` : '@twinenapp'
    }
  }

  /**
   * Generate structured data (JSON-LD)
   */
  static generateStructuredData(config: SEOConfig, user?: UserProfile, post?: Post): object {
    if (post) {
      return {
        '@context': 'https://schema.org',
        '@type': 'SocialMediaPosting',
        headline: config.title,
        description: config.description,
        image: config.image,
        url: config.url,
        datePublished: post.createdAt.toISOString(),
        author: {
          '@type': 'Person',
          name: user?.displayName || user?.username,
          url: user ? `https://twinen.app/profile/${user.username}` : undefined,
          image: user?.avatar,
          sameAs: user ? [`https://twinen.app/profile/${user.username}`] : undefined
        },
        publisher: {
          '@type': 'Organization',
          name: 'Twinen',
          url: 'https://twinen.app',
          logo: 'https://twinen.app/images/logo.png'
        },
        interactionStatistic: [
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/LikeAction',
            userInteractionCount: post.likesCount
          },
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/CommentAction',
            userInteractionCount: post.commentsCount
          },
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/ShareAction',
            userInteractionCount: post.sharesCount
          }
        ]
      }
    }

    if (user) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: user.displayName || user.username,
        alternateName: user.username,
        description: config.description,
        image: config.image,
        url: config.url,
        sameAs: [`https://twinen.app/profile/${user.username}`],
        knowsAbout: user.bio ? [user.bio] : undefined
      }
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: config.siteName || 'Twinen',
      description: config.description,
      url: config.url || 'https://twinen.app',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://twinen.app/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  }

  /**
   * Generate complete meta tags for Next.js
   */
  static generateMetaTags(config: SEOConfig, user?: UserProfile, post?: Post) {
    const ogTags = this.generateOpenGraphTags(config)
    const twitterTags = this.generateTwitterCardTags(config, user)
    const structuredData = this.generateStructuredData(config, user, post)

    return {
      title: config.title,
      description: config.description,
      keywords: config.keywords.join(', '),
      openGraph: ogTags,
      twitter: twitterTags,
      other: {
        'application-name': 'Twinen',
        'apple-mobile-web-app-title': 'Twinen',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
        'mobile-web-app-capable': 'yes',
        'msapplication-TileColor': '#000000',
        'theme-color': '#000000'
      }
    }
  }

  /**
   * Generate sitemap entry
   */
  static generateSitemapEntry(url: string, lastModified: Date, priority: number = 0.5): string {
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified.toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
  }

  /**
   * Generate robots.txt content
   */
  static generateRobotsTxt(disallowPaths: string[] = []): string {
    const disallowRules = disallowPaths.map(path => `Disallow: ${path}`).join('\n')
    
    return `User-agent: *
${disallowRules}

Sitemap: https://twinen.app/sitemap.xml`
  }
}