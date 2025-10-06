import { Metadata } from 'next'
import { Search, TrendingUp, Users, MessageCircle, Heart, Share2, MoreHorizontal } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/Avatar'
import PostCard from '@/components/social/PostCard'

export const metadata: Metadata = {
  title: 'Global Feed | Twinen',
  description: 'Discover posts from the Twinen community. See what\'s trending and connect with others.',
}

// Mock feed data
const mockFeed = [
  {
    id: '1',
    author: {
      id: '1',
      username: 'cyberpunk_creator',
      displayName: 'Cyberpunk Creator',
      avatar: '/images/cyberpunk-avatar.svg',
      isVerified: true
    },
    content: 'Just finished this amazing cyberpunk cityscape render! The neon lights and futuristic architecture create such an immersive atmosphere. What do you think about the color palette? #cyberpunk #neon #futuristic #art',
    media: [
      {
        id: '1',
        url: '/images/cyberpunk-cityscape.svg',
        type: 'image',
        alt: 'Cyberpunk cityscape with neon lights'
      }
    ],
    type: 'image',
    visibility: 'public',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likesCount: 245,
    commentsCount: 32,
    sharesCount: 18,
    tags: ['cyberpunk', 'neon', 'futuristic', 'art'],
    isPinned: false,
    aiGenerated: false
  },
  {
    id: '2',
    author: {
      id: '2',
      username: 'tech_enthusiast',
      displayName: 'Tech Enthusiast',
      avatar: '/images/tech-avatar.svg',
      isVerified: false
    },
    content: 'AI is revolutionizing how we create and consume content. My AI Twin just helped me draft this post about the future of social media. The possibilities are endless! 🤖✨',
    media: [],
    type: 'text',
    visibility: 'public',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    likesCount: 189,
    commentsCount: 45,
    sharesCount: 23,
    tags: ['AI', 'technology', 'future', 'social media'],
    isPinned: false,
    aiGenerated: false
  },
  {
    id: '3',
    author: {
      id: '3',
      username: 'neon_artist',
      displayName: 'Neon Artist',
      avatar: '/images/artist-avatar.svg',
      isVerified: true
    },
    content: 'Working on a new digital art piece inspired by the cyberpunk aesthetic. The way neon lights reflect off wet streets in the rain... there\'s something magical about it. #digitalart #cyberpunk #neon',
    media: [
      {
        id: '2',
        url: '/images/neon-art.svg',
        type: 'image',
        alt: 'Neon digital art piece'
      }
    ],
    type: 'image',
    visibility: 'public',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    likesCount: 312,
    commentsCount: 28,
    sharesCount: 41,
    tags: ['digitalart', 'cyberpunk', 'neon'],
    isPinned: false,
    aiGenerated: false
  }
]

const trendingTopics = [
  { tag: '#cyberpunk', posts: 1250, growth: '+15%' },
  { tag: '#AI', posts: 890, growth: '+22%' },
  { tag: '#neon', posts: 650, growth: '+8%' },
  { tag: '#futuristic', posts: 420, growth: '+12%' }
]

export default function GlobalFeedPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Search */}
            <Card className="bg-dark-800/50">
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search Twinen..."
                    className="pl-10 bg-dark-700/50 border-dark-600 focus:border-neon-purple"
                  />
                </div>
              </div>
            </Card>

            {/* Trending Topics */}
            <Card className="bg-dark-800/50">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-neon-purple" />
                  Trending
                </h3>
                
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={topic.tag} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                        <span className="text-white font-medium">{topic.tag}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-300">{topic.posts} posts</div>
                        <div className="text-xs text-green-400">{topic.growth}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Suggested Users */}
            <Card className="bg-dark-800/50">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-neon-purple" />
                  Suggested for You
                </h3>
                
                <div className="space-y-3">
                  {[
                    { name: 'Cyberpunk Designer', username: 'cyber_designer', followers: '12.5K' },
                    { name: 'AI Researcher', username: 'ai_researcher', followers: '8.9K' },
                    { name: 'Neon Artist', username: 'neon_creator', followers: '15.2K' }
                  ].map((user) => (
                    <div key={user.username} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar src="/images/suggested-avatar.svg" size="sm" />
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className="text-gray-400 text-sm">@{user.username}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-neon-purple">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Create Post */}
            <Card className="bg-dark-800/50">
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar src="/images/current-user.svg" size="md" />
                  <div className="flex-1">
                    <textarea
                      placeholder="What's happening in the cyberpunk world?"
                      className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none text-lg"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-400">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Photo
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400">
                          <Share2 className="w-5 h-5 mr-2" />
                          Video
                        </Button>
                      </div>
                      <Button variant="cyber-purple" size="sm">
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Feed Posts */}
            <div className="space-y-6">
              {mockFeed.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={(postId) => console.log('Like post:', postId)}
                  onComment={(postId) => console.log('Comment on post:', postId)}
                  onShare={(postId) => console.log('Share post:', postId)}
                  onBookmark={(postId) => console.log('Bookmark post:', postId)}
                  onReport={(postId) => console.log('Report post:', postId)}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* AI Twin Suggestions */}
            <Card className="bg-dark-800/50">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-neon-purple" />
                  AI Twin Suggestions
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/20">
                    <div className="text-sm text-white font-medium mb-1">
                      Trending in your network
                    </div>
                    <div className="text-xs text-gray-300">
                      #cyberpunk is gaining popularity among your connections
                    </div>
                  </div>
                  
                  <div className="p-3 bg-neon-blue/10 rounded-lg border border-neon-blue/20">
                    <div className="text-sm text-white font-medium mb-1">
                      Suggested post
                    </div>
                    <div className="text-xs text-gray-300">
                      Share your thoughts on AI in creative industries
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-dark-800/50">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-gray-300">
                    <Heart className="w-4 h-4 mr-2" />
                    Liked Posts
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Your Comments
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300">
                    <Share2 className="w-4 h-4 mr-2" />
                    Shared Posts
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
