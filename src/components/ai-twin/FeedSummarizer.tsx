'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Filter,
  Download
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'

interface FeedSummary {
  id: string
  type: 'daily' | 'weekly' | 'custom'
  title: string
  description: string
  highlights: Array<{
    id: string
    type: 'trending' | 'important' | 'mention' | 'achievement'
    title: string
    description: string
    postId: string
    author: string
    engagement: number
    timestamp: Date
  }>
  stats: {
    totalPosts: number
    totalLikes: number
    totalComments: number
    totalShares: number
    topHashtags: string[]
    topThemes: string[]
  }
  insights: Array<{
    type: 'engagement' | 'growth' | 'trend' | 'connection'
    title: string
    description: string
    value: string
    trend: 'up' | 'down' | 'stable'
  }>
  createdAt: Date
}

interface FeedSummarizerProps {
  isOpen: boolean
  onClose: () => void
  onViewPost?: (postId: string) => void
}

const FeedSummarizer: React.FC<FeedSummarizerProps> = ({
  isOpen,
  onClose,
  onViewPost
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'custom'>('daily')
  const [isGenerating, setIsGenerating] = useState(false)

  // Mock summary data
  const mockSummary: FeedSummary = {
    id: '1',
    type: selectedPeriod,
    title: `${selectedPeriod === 'daily' ? 'Today\'s' : selectedPeriod === 'weekly' ? 'This Week\'s' : 'Custom'} Feed Summary`,
    description: 'Your personalized digest of the most important moments and conversations',
    highlights: [
      {
        id: '1',
        type: 'trending',
        title: 'Cyberpunk Art Trending',
        description: 'Your post about cyberpunk cityscapes got 24K likes and sparked a conversation',
        postId: '1',
        author: 'cyberpunk_user',
        engagement: 24000,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: '2',
        type: 'mention',
        title: 'You were mentioned 5 times',
        description: 'People are talking about your latest digital art piece',
        postId: '2',
        author: 'neon_artist',
        engagement: 1500,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        id: '3',
        type: 'achievement',
        title: 'New Follower Milestone',
        description: 'You reached 1,000 followers! Your community is growing strong.',
        postId: '',
        author: 'system',
        engagement: 1000,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
      }
    ],
    stats: {
      totalPosts: 12,
      totalLikes: 45600,
      totalComments: 2340,
      totalShares: 890,
      topHashtags: ['#cyberpunk', '#neon', '#art', '#digital', '#futuristic'],
      topThemes: ['Cyberpunk', 'Digital Art', 'Technology']
    },
    insights: [
      {
        type: 'engagement',
        title: 'Engagement Rate',
        description: 'Your posts are getting 15% more engagement than last week',
        value: '+15%',
        trend: 'up'
      },
      {
        type: 'growth',
        title: 'Follower Growth',
        description: 'You gained 45 new followers this week',
        value: '+45',
        trend: 'up'
      },
      {
        type: 'trend',
        title: 'Top Content',
        description: 'Cyberpunk-themed posts perform best for you',
        value: 'Cyberpunk',
        trend: 'stable'
      }
    ],
    createdAt: new Date()
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  const formatNumber = (num: number) => {
    if (num < 1000) return num.toString()
    if (num < 1000000) return `${(num / 1000).toFixed(1)}K`
    return `${(num / 1000000).toFixed(1)}M`
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    return `${hours}h ago`
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute inset-4 max-w-4xl mx-auto bg-dark-900 rounded-xl border border-dark-600 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-600">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-pink rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-glow-purple">Feed Summary</h2>
                  <p className="text-sm text-gray-400">AI-powered insights from your social activity</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleGenerate}
                  loading={isGenerating}
                  className="text-gray-400 hover:text-white"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isGenerating ? 'Generating...' : 'Regenerate'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </Button>
              </div>
            </div>

            {/* Period Selector */}
            <div className="p-6 border-b border-dark-600">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-300">Time Period:</span>
                {['daily', 'weekly', 'custom'].map((period) => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? 'cyber-purple' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPeriod(period as any)}
                    className="text-xs capitalize"
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-cyber">
              {/* Summary Stats */}
              <Card variant="glow-blue">
                <CardHeader>
                  <CardTitle className="text-lg text-glow-blue">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-pink">{mockSummary.stats.totalPosts}</div>
                      <div className="text-sm text-gray-400">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-purple">{formatNumber(mockSummary.stats.totalLikes)}</div>
                      <div className="text-sm text-gray-400">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-blue">{formatNumber(mockSummary.stats.totalComments)}</div>
                      <div className="text-sm text-gray-400">Comments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-cyan">{formatNumber(mockSummary.stats.totalShares)}</div>
                      <div className="text-sm text-gray-400">Shares</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Highlights */}
              <Card variant="glow-purple">
                <CardHeader>
                  <CardTitle className="text-lg text-glow-purple">Key Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockSummary.highlights.map((highlight, index) => (
                      <motion.div
                        key={highlight.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4 p-4 bg-dark-800/50 rounded-lg hover:bg-dark-800 transition-colors cursor-pointer"
                        onClick={() => highlight.postId && onViewPost?.(highlight.postId)}
                      >
                        <div className="flex-shrink-0">
                          {highlight.type === 'trending' && <TrendingUp className="w-5 h-5 text-neon-pink" />}
                          {highlight.type === 'mention' && <MessageCircle className="w-5 h-5 text-neon-blue" />}
                          {highlight.type === 'achievement' && <Sparkles className="w-5 h-5 text-neon-purple" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white">{highlight.title}</h4>
                          <p className="text-sm text-gray-400 mt-1">{highlight.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>@{highlight.author}</span>
                            <span>{formatNumber(highlight.engagement)} engagement</span>
                            <span>{formatTime(highlight.timestamp)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Insights */}
              <Card variant="glow-pink">
                <CardHeader>
                  <CardTitle className="text-lg text-glow-pink">AI Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockSummary.insights.map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-dark-800/50 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{insight.title}</h4>
                          <span className={`text-sm font-bold ${
                            insight.trend === 'up' ? 'text-green-400' : 
                            insight.trend === 'down' ? 'text-red-400' : 
                            'text-gray-400'
                          }`}>
                            {insight.value}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{insight.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Hashtags & Themes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="glow">
                  <CardHeader>
                    <CardTitle className="text-lg">Top Hashtags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {mockSummary.stats.topHashtags.map((tag, index) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card variant="glow">
                  <CardHeader>
                    <CardTitle className="text-lg">Top Themes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {mockSummary.stats.topThemes.map((theme, index) => (
                        <span
                          key={theme}
                          className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full text-sm"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-dark-600">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Generated by AI Twin • {mockSummary.createdAt.toLocaleString()}
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="cyber-purple" size="sm">
                    Share Summary
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default FeedSummarizer
