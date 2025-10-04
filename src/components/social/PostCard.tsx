'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Bookmark,
  Flag,
  Eye,
  EyeOff
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { formatDate, formatNumber } from '@/lib/utils'
import { Post } from '@/types'

interface PostCardProps {
  post: Post
  onLike?: (postId: string) => void
  onComment?: (postId: string) => void
  onShare?: (postId: string) => void
  onBookmark?: (postId: string) => void
  onReport?: (postId: string) => void
  showActions?: boolean
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onReport,
  showActions = true
}) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showFullContent, setShowFullContent] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike?.(post.id)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onBookmark?.(post.id)
  }

  const handleMenuToggle = () => {
    setShowMenu(!showMenu)
  }

  const shouldTruncate = post.content.length > 200
  const displayContent = shouldTruncate && !showFullContent 
    ? post.content.substring(0, 200) + '...' 
    : post.content

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card variant="glow-purple" className="overflow-hidden">
        <CardContent className="p-0">
          {/* Post Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center space-x-3">
              <Avatar
                src={post.author.avatar}
                name={post.author.username}
                size="md"
                status={post.author.status}
                verified={post.author.isVerified}
                glow
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-white">@{post.author.username}</span>
                  {post.author.isVerified && (
                    <div className="w-4 h-4 bg-neon-blue rounded-full flex items-center justify-center">
                      <span className="text-xs text-dark-900 font-bold">✓</span>
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-400">{formatDate(post.createdAt)}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {post.aiGenerated && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-neon-purple/20 rounded-full">
                  <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse" />
                  <span className="text-xs text-neon-purple font-medium">AI Twin</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMenuToggle}
                className="text-gray-400 hover:text-white"
              >
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-6 pb-4">
            <div className="prose prose-invert max-w-none">
              <p className="text-white leading-relaxed whitespace-pre-wrap">
                {displayContent}
              </p>
              {shouldTruncate && (
                <button
                  onClick={() => setShowFullContent(!showFullContent)}
                  className="text-neon-purple hover:text-neon-pink transition-colors text-sm mt-2"
                >
                  {showFullContent ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          </div>

          {/* Post Media */}
          {post.media && post.media.length > 0 && (
            <div className="px-6 pb-4">
              <div className="relative rounded-xl overflow-hidden bg-dark-800">
                {post.media[0].type === 'image' ? (
                  <img
                    src={post.media[0].url}
                    alt={post.media[0].alt || 'Post media'}
                    className="w-full h-64 object-cover"
                  />
                ) : post.media[0].type === 'video' ? (
                  <video
                    src={post.media[0].url}
                    className="w-full h-64 object-cover"
                    controls
                    poster={post.media[0].thumbnail}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          )}

          {/* Post Stats */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>{formatNumber(post.likes.length)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments.length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>{post.shares.length}</span>
                </div>
              </div>
              <div className="text-xs opacity-70">
                {post.views || 0} views
              </div>
            </div>
          </div>

          {/* Post Actions */}
          {showActions && (
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <motion.button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 transition-colors ${
                      isLiked ? 'text-neon-pink' : 'text-gray-400 hover:text-neon-pink'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="font-medium">Like</span>
                  </motion.button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onComment?.(post.id)}
                    className="text-gray-400 hover:text-neon-blue"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Comment
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onShare?.(post.id)}
                    className="text-gray-400 hover:text-neon-cyan"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBookmark}
                  className={`text-gray-400 hover:text-neon-purple ${
                    isBookmarked ? 'text-neon-purple' : ''
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
          )}

          {/* Dropdown Menu */}
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-16 right-6 bg-dark-800 border border-dark-600 rounded-lg shadow-lg py-2 z-10"
            >
              <button
                onClick={() => {
                  onReport?.(post.id)
                  setShowMenu(false)
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-dark-700 hover:text-white transition-colors"
              >
                <Flag className="w-4 h-4" />
                <span>Report</span>
              </button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.article>
  )
}

export default PostCard
