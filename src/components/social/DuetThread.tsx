'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Users, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  MoreHorizontal,
  Plus,
  X,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { DuetThread as DuetThreadType, Post } from '@/types'

interface DuetThreadProps {
  duetThread: DuetThreadType
  onJoinDuet?: (duetId: string) => void
  onLeaveDuet?: (duetId: string) => void
  onAddResponse?: (duetId: string, content: string) => void
}

const DuetThreadComponent: React.FC<DuetThreadProps> = ({
  duetThread,
  onJoinDuet,
  onLeaveDuet,
  onAddResponse
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showAddResponse, setShowAddResponse] = useState(false)
  const [newResponse, setNewResponse] = useState('')
  const [currentResponseIndex, setCurrentResponseIndex] = useState(0)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  const handleAddResponse = () => {
    if (newResponse.trim()) {
      onAddResponse?.(duetThread.id, newResponse)
      setNewResponse('')
      setShowAddResponse(false)
    }
  }

  const handleNextResponse = () => {
    setCurrentResponseIndex(prev => 
      prev < duetThread.responses.length - 1 ? prev + 1 : 0
    )
  }

  const handlePrevResponse = () => {
    setCurrentResponseIndex(prev => 
      prev > 0 ? prev - 1 : duetThread.responses.length - 1
    )
  }

  const currentResponse = duetThread.responses[currentResponseIndex]

  return (
    <Card variant="glow-purple" className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-purple to-neon-pink rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-glow-purple">Duet Thread</CardTitle>
              <p className="text-sm text-gray-400">
                {duetThread.responses.length} responses • {duetThread.isActive ? 'Active' : 'Closed'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddResponse(!showAddResponse)}
              className="text-gray-400 hover:text-white"
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Original Post */}
        <div className="p-4 bg-dark-800/50 rounded-lg border border-dark-600">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar
              src={duetThread.originalPost.author.avatar}
              name={duetThread.originalPost.author.username}
              size="sm"
              verified={duetThread.originalPost.author.isVerified}
            />
            <div>
              <span className="font-semibold text-white">@{duetThread.originalPost.author.username}</span>
              <span className="text-sm text-gray-400 ml-2">Original</span>
            </div>
          </div>
          <p className="text-white mb-3">{duetThread.originalPost.content}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>❤️ {duetThread.originalPost.likes.length}</span>
            <span>💬 {duetThread.originalPost.comments.length}</span>
            <span>🔄 {duetThread.originalPost.shares.length}</span>
          </div>
        </div>

        {/* Responses */}
        {duetThread.responses.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Responses</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">
                  {currentResponseIndex + 1} of {duetThread.responses.length}
                </span>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrevResponse}
                    className="text-gray-400 hover:text-white"
                  >
                    ←
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNextResponse}
                    className="text-gray-400 hover:text-white"
                  >
                    →
                  </Button>
                </div>
              </div>
            </div>

            {/* Current Response */}
            <motion.div
              key={currentResponseIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-4 bg-dark-800/50 rounded-lg border border-neon-purple/30"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Avatar
                  src={currentResponse.author.avatar}
                  name={currentResponse.author.username}
                  size="sm"
                  verified={currentResponse.author.isVerified}
                />
                <div>
                  <span className="font-semibold text-white">@{currentResponse.author.username}</span>
                  <span className="text-sm text-gray-400 ml-2">
                    {new Date(currentResponse.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="text-white mb-3">{currentResponse.content}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>❤️ {currentResponse.likes.length}</span>
                <span>💬 {currentResponse.comments.length}</span>
                <span>🔄 {currentResponse.shares.length}</span>
              </div>
            </motion.div>

            {/* Response Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="cyber-purple"
                size="sm"
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? 'Pause' : 'Play'} Thread
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleMuteToggle}
                className={isMuted ? 'text-red-400' : 'text-gray-400'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        )}

        {/* Add Response Form */}
        <AnimatePresence>
          {showAddResponse && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-dark-800/50 rounded-lg border border-dark-600"
            >
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Your Response
                  </label>
                  <textarea
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    placeholder="Add your response to this duet thread..."
                    className="w-full bg-dark-800 border border-dark-600 text-white rounded-lg px-3 py-2 focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddResponse(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="cyber-purple"
                    size="sm"
                    onClick={handleAddResponse}
                    disabled={!newResponse.trim()}
                  >
                    Add Response
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thread Info */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Created {new Date(duetThread.createdAt).toLocaleDateString()}</span>
            {duetThread.expiresAt && (
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Expires {new Date(duetThread.expiresAt).toLocaleDateString()}</span>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <Heart className="w-4 h-4 mr-1" />
              Like
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DuetThreadComponent
