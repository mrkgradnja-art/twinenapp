'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Filter, 
  TrendingUp, 
  Users, 
  Clock,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import PostCard from './PostCard'
import { Post, FeedFilters } from '@/types'

interface FeedProps {
  posts: Post[]
  isLoading?: boolean
  onLoadMore?: () => void
  onFilterChange?: (filters: FeedFilters) => void
  filters?: FeedFilters
}

const Feed: React.FC<FeedProps> = ({
  posts,
  isLoading = false,
  onLoadMore,
  onFilterChange,
  filters = {
    type: 'all',
    timeRange: 'all',
    tags: [],
    themes: []
  }
}) => {
  const [showFilters, setShowFilters] = useState(false)
  const [localFilters, setLocalFilters] = useState<FeedFilters>(filters)

  const filterOptions = {
    type: [
      { value: 'all', label: 'All Posts', icon: Sparkles },
      { value: 'following', label: 'Following', icon: Users },
      { value: 'trending', label: 'Trending', icon: TrendingUp },
      { value: 'ai_curated', label: 'AI Curated', icon: Sparkles }
    ],
    timeRange: [
      { value: 'all', label: 'All Time' },
      { value: 'today', label: 'Today' },
      { value: 'week', label: 'This Week' },
      { value: 'month', label: 'This Month' }
    ]
  }

  const handleFilterChange = (key: keyof FeedFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      {/* Feed Header */}
      <Card variant="glow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CardTitle className="text-xl font-bold text-glow-purple">
                Your Feed
              </CardTitle>
              <div className="flex items-center space-x-2">
                {filterOptions.type.map((option) => (
                  <Button
                    key={option.value}
                    variant={localFilters.type === option.value ? 'cyber-purple' : 'ghost'}
                    size="sm"
                    onClick={() => handleFilterChange('type', option.value)}
                    className="text-xs"
                  >
                    <option.icon className="w-3 h-3 mr-1" />
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="text-gray-400 hover:text-white"
              >
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                className="text-gray-400 hover:text-white"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Time Range
                    </label>
                    <div className="flex space-x-2">
                      {filterOptions.timeRange.map((option) => (
                        <Button
                          key={option.value}
                          variant={localFilters.timeRange === option.value ? 'cyber-blue' : 'outline'}
                          size="sm"
                          onClick={() => handleFilterChange('timeRange', option.value)}
                          className="text-xs"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Posts */}
      <div className="space-y-6">
        <AnimatePresence>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <PostCard
                post={post}
                onLike={(postId) => console.log('Like post:', postId)}
                onComment={(postId) => console.log('Comment on post:', postId)}
                onShare={(postId) => console.log('Share post:', postId)}
                onBookmark={(postId) => console.log('Bookmark post:', postId)}
                onReport={(postId) => console.log('Report post:', postId)}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-8"
          >
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-neon-purple border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-400">Loading posts...</span>
            </div>
          </motion.div>
        )}

        {/* Load More Button */}
        {onLoadMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <Button
              variant="cyber-purple"
              onClick={onLoadMore}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                'Load More Posts'
              )}
            </Button>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-neon-purple" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No posts yet</h3>
            <p className="text-gray-400 mb-6">
              Start following people or create your first post to see content here.
            </p>
            <Button variant="cyber-purple">
              Create Your First Post
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Feed
