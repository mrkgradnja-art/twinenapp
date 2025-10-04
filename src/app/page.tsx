'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Sparkles,
  Zap,
  Brain,
  Users,
  Settings,
  Bell,
  Home,
  Flame,
  TreePine,
  MessageSquare
} from 'lucide-react'

// Import components
import AuthModal from '@/components/auth/AuthModal'
import AITwinInterface from '@/components/ai-twin/AITwinInterface'
import ThemePreview from '@/components/ai-twin/ThemePreview'
import FeedSummarizer from '@/components/ai-twin/FeedSummarizer'
import PostDrafter from '@/components/ai-twin/PostDrafter'
import Feed from '@/components/social/Feed'
import PostCard from '@/components/social/PostCard'
import StreakTracker from '@/components/social/StreakTracker'
import DuetThread from '@/components/social/DuetThread'
import HomeChannel from '@/components/family/HomeChannel'
import GenerationsTree from '@/components/family/GenerationsTree'
import NotificationCenter from '@/components/realtime/NotificationCenter'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'

// Mock data for demonstration
const mockUser = {
  id: '1',
  username: 'cyberpunk_user',
  avatar: '/images/cyberpunk-avatar.svg',
  isVerified: true,
  status: 'online' as const
}

const mockPosts = [
  {
    id: '1',
    authorId: '1',
    author: mockUser,
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
  }
]

const mockStreaks = [
  {
    id: '1',
    participants: ['1', '2', '3'],
    type: 'daily' as const,
    currentCount: 15,
    longestCount: 30,
    lastActivity: new Date(),
    isActive: true,
    name: 'Daily Workout',
    description: 'Stay fit together with daily exercise'
  }
]

const mockFamilyMembers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '/images/cyberpunk-avatar.svg',
    relationship: 'parent' as const,
    isOnline: true,
    lastActive: new Date()
  },
  {
    id: '2',
    name: 'Mike Johnson',
    avatar: '/images/cyberpunk-avatar.svg',
    relationship: 'parent' as const,
    isOnline: false,
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000)
  }
]

const mockNotifications = [
  {
    id: '1',
    userId: '1',
    type: 'like' as const,
    title: 'New Like',
    message: 'Sarah liked your post about cyberpunk art',
    isRead: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    actionUrl: '/post/1'
  }
]

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentView, setCurrentView] = useState<'feed' | 'ai-twin' | 'streaks' | 'family' | 'tree'>('feed')
  const [showAuth, setShowAuth] = useState(false)
  const [showAITwin, setShowAITwin] = useState(false)
  const [showThemePreview, setShowThemePreview] = useState(false)
  const [showFeedSummarizer, setShowFeedSummarizer] = useState(false)
  const [showPostDrafter, setShowPostDrafter] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleLogin = (data: any) => {
    console.log('Login:', data)
    setIsAuthenticated(true)
    setShowAuth(false)
  }

  const handleRegister = (data: any) => {
    console.log('Register:', data)
    setIsAuthenticated(true)
    setShowAuth(false)
  }

  const handleAITwinAction = (action: string) => {
    switch (action) {
      case 'summarize':
        setShowFeedSummarizer(true)
        break
      case 'draft':
        setShowPostDrafter(true)
        break
      case 'theme':
        setShowThemePreview(true)
        break
    }
  }

  const navigationItems = [
    { id: 'feed', label: 'Feed', icon: MessageSquare, color: 'purple' },
    { id: 'ai-twin', label: 'AI Twin', icon: Brain, color: 'pink' },
    { id: 'streaks', label: 'Streaks', icon: Flame, color: 'blue' },
    { id: 'family', label: 'Family', icon: Home, color: 'cyan' },
    { id: 'tree', label: 'Tree', icon: TreePine, color: 'green' }
  ]

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-600/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <motion.h1 
                className="text-2xl font-bold text-glow-pink font-cyber"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Twinen
              </motion.h1>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-neon-pink" />
                <Heart className="w-5 h-5 text-neon-pink" />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {!isAuthenticated ? (
                <Button
                  variant="cyber-purple"
                  onClick={() => setShowAuth(true)}
                >
                  Sign In
                </Button>
              ) : (
                <>
                  <button 
                    className="p-2 rounded-lg hover:bg-dark-800 transition-colors relative"
                    onClick={() => setShowNotifications(true)}
                  >
                    <Bell className="w-5 h-5 text-gray-400" />
                    {mockNotifications.filter(n => !n.isRead).length > 0 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                    )}
                  </button>
                  <Avatar
                    name={mockUser.username}
                    size="sm"
                    status="online"
                    verified={mockUser.isVerified}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation */}
      <nav className="border-b border-dark-600/50 bg-dark-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? `cyber-${item.color}` as any : 'ghost'}
                size="sm"
                onClick={() => setCurrentView(item.id as any)}
                className="flex items-center space-x-2"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {isLoaded && (
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentView === 'feed' && (
                <Feed
                  posts={mockPosts}
                  onLoadMore={() => console.log('Load more posts')}
                  onFilterChange={(filters) => console.log('Filter change:', filters)}
                />
              )}

              {currentView === 'ai-twin' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-neon-purple to-neon-pink rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-glow-purple mb-4">AI Twin Powers</h2>
                    <p className="text-gray-400 mb-8">Your personal AI assistant for social connections</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Button
                        variant="cyber-purple"
                        onClick={() => handleAITwinAction('summarize')}
                        className="h-20 flex-col space-y-2"
                      >
                        <Brain className="w-6 h-6" />
                        <span>Summarize Feed</span>
                      </Button>
                      <Button
                        variant="cyber-pink"
                        onClick={() => handleAITwinAction('draft')}
                        className="h-20 flex-col space-y-2"
                      >
                        <Zap className="w-6 h-6" />
                        <span>Draft Post</span>
                      </Button>
                      <Button
                        variant="cyber-blue"
                        onClick={() => handleAITwinAction('theme')}
                        className="h-20 flex-col space-y-2"
                      >
                        <Sparkles className="w-6 h-6" />
                        <span>Change Theme</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'streaks' && (
                <StreakTracker
                  streaks={mockStreaks}
                  onCreateStreak={(streak) => console.log('Create streak:', streak)}
                  onJoinStreak={(id) => console.log('Join streak:', id)}
                  onLeaveStreak={(id) => console.log('Leave streak:', id)}
                />
              )}

              {currentView === 'family' && (
                <HomeChannel
                  familyMembers={mockFamilyMembers}
                  posts={[]}
                  onPlayChannel={() => console.log('Play channel')}
                  onPauseChannel={() => console.log('Pause channel')}
                  onLikePost={(id) => console.log('Like post:', id)}
                  onCommentPost={(id) => console.log('Comment post:', id)}
                  onSharePost={(id) => console.log('Share post:', id)}
                />
              )}

              {currentView === 'tree' && (
                <GenerationsTree
                  tree={{
                    id: '1',
                    familyId: '1',
                    interviews: [],
                    createdAt: new Date(),
                    updatedAt: new Date()
                  }}
                  onStartInterview={(interviewerId, intervieweeId) => console.log('Start interview:', interviewerId, intervieweeId)}
                  onAddQuestion={(interviewId, question) => console.log('Add question:', interviewId, question)}
                  onAddResponse={(questionId, response) => console.log('Add response:', questionId, response)}
                  onPlayInterview={(id) => console.log('Play interview:', id)}
                  onPauseInterview={(id) => console.log('Pause interview:', id)}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <AITwinInterface
        isOpen={showAITwin}
        onClose={() => setShowAITwin(false)}
      />

      <ThemePreview
        isOpen={showThemePreview}
        onClose={() => setShowThemePreview(false)}
        onApply={(theme) => console.log('Apply theme:', theme)}
      />

      <FeedSummarizer
        isOpen={showFeedSummarizer}
        onClose={() => setShowFeedSummarizer(false)}
        onViewPost={(postId) => console.log('View post:', postId)}
      />

      <PostDrafter
        isOpen={showPostDrafter}
        onClose={() => setShowPostDrafter(false)}
        onSaveDraft={(draft) => console.log('Save draft:', draft)}
        onPublish={(draft) => console.log('Publish:', draft)}
      />

      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={mockNotifications}
        onMarkAsRead={(id) => console.log('Mark as read:', id)}
        onMarkAllAsRead={() => console.log('Mark all as read')}
        onClearAll={() => console.log('Clear all')}
        onActionClick={(notification) => console.log('Action click:', notification)}
      />
    </div>
  )
}
