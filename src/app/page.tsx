'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, TrendingUp, Users, MessageCircle, Heart, Share2, MoreHorizontal, Plus } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import PostCard from '@/components/social/PostCard'
import AuthModal from '@/components/auth/AuthModal'

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
    likes: Array(245).fill({ id: 'mock', userId: 'mock' }),
    comments: Array(32).fill({ id: 'mock', userId: 'mock', content: 'mock' }),
    shares: Array(18).fill({ id: 'mock', userId: 'mock' }),
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
    likes: Array(189).fill({ id: 'mock', userId: 'mock' }),
    comments: Array(45).fill({ id: 'mock', userId: 'mock', content: 'mock' }),
    shares: Array(23).fill({ id: 'mock', userId: 'mock' }),
    tags: ['AI', 'technology', 'future', 'social media'],
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

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
    setShowAuthModal(false)
  }

  const handleLike = (postId: string) => {
    console.log('Liked post:', postId)
  }

  const handleComment = (postId: string) => {
    console.log('Commented on post:', postId)
  }

  const handleShare = (postId: string) => {
    console.log('Shared post:', postId)
  }

  const handleBookmark = (postId: string) => {
    console.log('Bookmarked post:', postId)
  }

  const handleReport = (postId: string) => {
    console.log('Reported post:', postId)
  }

  if (!isLoggedIn) {
  return (
      <div className="min-h-screen bg-dark-900">
        {/* Modern Hero Section */}
        <div className="relative overflow-hidden min-h-screen flex items-center">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-purple/10 via-transparent to-neon-pink/10"></div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-neon-pink rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-neon-blue rounded-full animate-pulse delay-500"></div>
            <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-neon-purple rounded-full animate-pulse delay-2000"></div>
          </div>
          
          <div className="relative container mx-auto px-6 py-32">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h1 className="text-7xl md:text-8xl font-bold text-white mb-8 font-orbitron leading-tight">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent animate-gradient">
                Twinen
                  </span>
                </h1>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                The next-generation social network that moves with you. Connect with your AI Twin and build meaningful relationships in a cyberpunk-inspired digital world.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <motion.button
                  onClick={() => {
                    setAuthMode('register')
                    setShowAuthModal(true)
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-gradient-to-r from-neon-pink to-neon-purple text-white font-bold rounded-2xl hover:from-neon-pink/90 hover:to-neon-purple/90 transition-all duration-300 shadow-2xl hover:shadow-neon-purple/30 text-lg backdrop-blur-sm"
                >
                  Join the Future
                </motion.button>
                <motion.button
                  onClick={() => {
                    setAuthMode('login')
                    setShowAuthModal(true)
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm text-lg shadow-xl"
                >
                  Sign In
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>


        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode={authMode}
          onLogin={(data) => {
            console.log('Login:', data)
            handleAuthSuccess()
          }}
          onRegister={(data) => {
            console.log('Register:', data)
            handleAuthSuccess()
          }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Modern Header Navigation */}
      <div className="bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="text-3xl font-bold text-white font-orbitron tracking-tight">Twinen</div>
            <nav className="flex items-center space-x-1">
              <a href="#" className="px-4 py-2 rounded-xl text-white font-medium bg-white/10 border border-white/20">Home</a>
              <a href="/profile/adrian" className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">Profile</a>
              <a href="/messages" className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">Messages</a>
              <a href="/friends" className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">Friends</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Avatar src="/images/cyberpunk-avatar.svg" size="md" />
              <span className="text-white font-medium">Adrian</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Search */}
            <div className="modern-card theme-glow rounded-2xl">
              <div className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    placeholder="Search Twinen..."
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-white/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="modern-card theme-glow rounded-2xl">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-white/60" />
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
            </div>

            {/* Suggested Users */}
            <div className="modern-card theme-glow rounded-2xl">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-white/60" />
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
                      <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Create Post */}
            <div className="modern-card theme-glow rounded-2xl">
              <div className="p-6">
                <div className="flex items-start space-x-3">
                  <Avatar src="/images/cyberpunk-avatar.svg" size="md" />
                  <div className="flex-1">
                    <textarea
                      placeholder="What's happening in the cyberpunk world?"
                      className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none text-lg mb-4"
                      rows={3}
                    />
                    <div className="flex items-center justify-between">
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
            </div>

            {/* Feed Posts */}
            <div className="space-y-6">
              {mockFeed.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                  onBookmark={handleBookmark}
                  onReport={handleReport}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* AI Twin Suggestions */}
            <div className="modern-card theme-glow rounded-2xl">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-white/60" />
                  AI Twin Suggestions
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                    <div className="text-sm text-white font-medium mb-1">
                      Trending in your network
                    </div>
                    <div className="text-xs text-gray-300">
                      #cyberpunk is gaining popularity among your connections
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                    <div className="text-sm text-white font-medium mb-1">
                      Suggested post
                    </div>
                    <div className="text-xs text-gray-300">
                      Share your thoughts on AI in creative industries
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="modern-card theme-glow rounded-2xl">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5">
                    <Heart className="w-4 h-4 mr-2" />
                    Liked Posts
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Your Comments
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5">
                    <Share2 className="w-4 h-4 mr-2" />
                    Shared Posts
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}