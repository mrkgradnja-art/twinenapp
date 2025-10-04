'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Users, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Calendar,
  Sparkles,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarGroup } from '@/components/ui/Avatar'

interface FamilyMember {
  id: string
  name: string
  avatar?: string
  relationship: 'parent' | 'child' | 'sibling' | 'grandparent' | 'other'
  isOnline: boolean
  lastActive: Date
}

interface FamilyPost {
  id: string
  author: FamilyMember
  content: string
  media?: {
    url: string
    type: 'image' | 'video' | 'audio'
    thumbnail?: string
  }[]
  timestamp: Date
  likes: number
  comments: number
  isHighlight: boolean
}

interface HomeChannelProps {
  familyMembers: FamilyMember[]
  posts: FamilyPost[]
  onPlayChannel?: () => void
  onPauseChannel?: () => void
  onLikePost?: (postId: string) => void
  onCommentPost?: (postId: string) => void
  onSharePost?: (postId: string) => void
}

const HomeChannel: React.FC<HomeChannelProps> = ({
  familyMembers,
  posts,
  onPlayChannel,
  onPauseChannel,
  onLikePost,
  onCommentPost,
  onSharePost
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      onPauseChannel?.()
    } else {
      onPlayChannel?.()
    }
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship) {
      case 'parent': return '👨‍👩‍👧‍👦'
      case 'child': return '👶'
      case 'sibling': return '👫'
      case 'grandparent': return '👴'
      default: return '👤'
    }
  }

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'parent': return 'text-blue-400'
      case 'child': return 'text-pink-400'
      case 'sibling': return 'text-green-400'
      case 'grandparent': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-neon-purple to-neon-pink rounded-full flex items-center justify-center">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-glow-purple">Home Channel</h2>
            <p className="text-gray-400">Your family's shared moments and memories</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMuteToggle}
            className={isMuted ? 'text-red-400' : 'text-gray-400'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="cyber-purple"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? 'Pause' : 'Play'} Channel
          </Button>
        </div>
      </div>

      {/* Family Members */}
      <Card variant="glow-blue">
        <CardHeader>
          <CardTitle className="text-lg text-glow-blue">Family Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {familyMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-3 p-3 bg-dark-800/50 rounded-lg hover:bg-dark-800 transition-colors"
              >
                <div className="relative">
                  <Avatar
                    src={member.avatar}
                    name={member.name}
                    size="md"
                    status={member.isOnline ? 'online' : 'offline'}
                  />
                  <div className="absolute -top-1 -right-1 text-lg">
                    {getRelationshipIcon(member.relationship)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">{member.name}</span>
                    <span className={`text-xs ${getRelationshipColor(member.relationship)}`}>
                      {member.relationship}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {member.isOnline ? 'Online' : `Last seen ${formatTime(member.lastActive)}`}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Highlights */}
      <Card variant="glow-pink">
        <CardHeader>
          <CardTitle className="text-lg text-glow-pink">Today's Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.filter(post => post.isHighlight).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 bg-dark-800/50 rounded-lg border border-neon-pink/30"
              >
                <div className="flex-shrink-0">
                  <Avatar
                    src={post.author.avatar}
                    name={post.author.name}
                    size="md"
                    status={post.author.isOnline ? 'online' : 'offline'}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-white">{post.author.name}</span>
                    <span className={`text-xs ${getRelationshipColor(post.author.relationship)}`}>
                      {post.author.relationship}
                    </span>
                    <span className="text-xs text-gray-400">{formatTime(post.timestamp)}</span>
                    <div className="flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-neon-pink" />
                      <span className="text-xs text-neon-pink">Highlight</span>
                    </div>
                  </div>
                  <p className="text-white mb-3">{post.content}</p>
                  {post.media && post.media.length > 0 && (
                    <div className="mb-3">
                      {post.media[0].type === 'image' ? (
                        <img
                          src={post.media[0].url}
                          alt="Family moment"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ) : post.media[0].type === 'video' ? (
                        <video
                          src={post.media[0].url}
                          className="w-full h-48 object-cover rounded-lg"
                          controls
                          poster={post.media[0].thumbnail}
                        />
                      ) : null}
                    </div>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <button
                      onClick={() => onLikePost?.(post.id)}
                      className="flex items-center space-x-1 hover:text-neon-pink transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => onCommentPost?.(post.id)}
                      className="flex items-center space-x-1 hover:text-neon-blue transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button
                      onClick={() => onSharePost?.(post.id)}
                      className="flex items-center space-x-1 hover:text-neon-cyan transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card variant="glow">
        <CardHeader>
          <CardTitle className="text-lg">Recent Family Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.filter(post => !post.isHighlight).slice(0, 5).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 bg-dark-800/30 rounded-lg hover:bg-dark-800/50 transition-colors"
              >
                <Avatar
                  src={post.author.avatar}
                  name={post.author.name}
                  size="sm"
                  status={post.author.isOnline ? 'online' : 'offline'}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-white text-sm">{post.author.name}</span>
                    <span className={`text-xs ${getRelationshipColor(post.author.relationship)}`}>
                      {post.author.relationship}
                    </span>
                    <span className="text-xs text-gray-400">{formatTime(post.timestamp)}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{post.content}</p>
                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="glow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-neon-purple">{posts.length}</div>
            <div className="text-sm text-gray-400">Total Posts</div>
          </CardContent>
        </Card>
        <Card variant="glow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-neon-blue">{familyMembers.length}</div>
            <div className="text-sm text-gray-400">Family Members</div>
          </CardContent>
        </Card>
        <Card variant="glow">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-neon-pink">
              {posts.filter(post => post.isHighlight).length}
            </div>
            <div className="text-sm text-gray-400">Highlights</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HomeChannel
