'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Flame, 
  Users, 
  Trophy, 
  Calendar,
  Target,
  Zap,
  Heart,
  MessageCircle,
  Share2,
  Plus,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarGroup } from '@/components/ui/Avatar'
import { Streak } from '@/types'

interface StreakTrackerProps {
  streaks: Streak[]
  onCreateStreak?: (streak: Omit<Streak, 'id'>) => void
  onJoinStreak?: (streakId: string) => void
  onLeaveStreak?: (streakId: string) => void
}

const StreakTracker: React.FC<StreakTrackerProps> = ({
  streaks,
  onCreateStreak,
  onJoinStreak,
  onLeaveStreak
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newStreak, setNewStreak] = useState({
    name: '',
    description: '',
    type: 'daily' as const,
    participants: [] as string[]
  })

  const handleCreateStreak = () => {
    if (newStreak.name.trim()) {
      onCreateStreak?.({
        ...newStreak,
        currentCount: 0,
        longestCount: 0,
        lastActivity: new Date(),
        isActive: true
      })
      setNewStreak({ name: '', description: '', type: 'daily', participants: [] })
      setShowCreateForm(false)
    }
  }

  const getStreakIcon = (type: string) => {
    switch (type) {
      case 'daily': return <Calendar className="w-5 h-5" />
      case 'weekly': return <Target className="w-5 h-5" />
      case 'monthly': return <Trophy className="w-5 h-5" />
      default: return <Flame className="w-5 h-5" />
    }
  }

  const getStreakColor = (count: number) => {
    if (count >= 30) return 'text-yellow-400'
    if (count >= 14) return 'text-orange-400'
    if (count >= 7) return 'text-red-400'
    return 'text-gray-400'
  }

  const getStreakGlow = (count: number) => {
    if (count >= 30) return 'shadow-yellow-400/50'
    if (count >= 14) return 'shadow-orange-400/50'
    if (count >= 7) return 'shadow-red-400/50'
    return 'shadow-gray-400/50'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-glow-purple">Collective Streaks</h2>
          <p className="text-gray-400">Build habits together with friends and family</p>
        </div>
        <Button
          variant="cyber-purple"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Streak
        </Button>
      </div>

      {/* Create Streak Form */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card variant="glow-blue">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-glow-blue">Create New Streak</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Streak Name
                    </label>
                    <input
                      type="text"
                      value={newStreak.name}
                      onChange={(e) => setNewStreak(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Daily Workout, Morning Meditation"
                      className="w-full bg-dark-800 border border-dark-600 text-white rounded-lg px-3 py-2 focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Type
                    </label>
                    <select
                      value={newStreak.type}
                      onChange={(e) => setNewStreak(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full bg-dark-800 border border-dark-600 text-white rounded-lg px-3 py-2 focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Description
                  </label>
                  <textarea
                    value={newStreak.description}
                    onChange={(e) => setNewStreak(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="What's this streak about?"
                    className="w-full bg-dark-800 border border-dark-600 text-white rounded-lg px-3 py-2 focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="cyber-purple"
                    onClick={handleCreateStreak}
                    disabled={!newStreak.name.trim()}
                  >
                    Create Streak
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Streaks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {streaks.map((streak, index) => (
          <motion.div
            key={streak.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              variant="glow" 
              className={`hover:scale-105 transition-all duration-300 ${
                streak.isActive ? 'border-neon-purple/50' : 'border-dark-600'
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-neon-purple/20 ${
                      streak.isActive ? 'animate-pulse-glow' : ''
                    }`}>
                      {getStreakIcon(streak.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{streak.name}</CardTitle>
                      <p className="text-sm text-gray-400 capitalize">{streak.type}</p>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${getStreakColor(streak.currentCount)}`}>
                    {streak.currentCount}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-300">{streak.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Current Streak</span>
                    <span className="font-semibold text-white">{streak.currentCount} days</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Longest Streak</span>
                    <span className="font-semibold text-white">{streak.longestCount} days</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Participants</span>
                    <span className="font-semibold text-white">{streak.participants.length}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <AvatarGroup max={3}>
                    {streak.participants.slice(0, 3).map((participantId) => (
                      <Avatar
                        key={participantId}
                        name={`User ${participantId}`}
                        size="sm"
                      />
                    ))}
                  </AvatarGroup>
                  
                  <div className="flex space-x-2">
                    {streak.isActive ? (
                      <Button
                        variant="cyber-purple"
                        size="sm"
                        onClick={() => onJoinStreak?.(streak.id)}
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Join
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onLeaveStreak?.(streak.id)}
                      >
                        <X className="w-3 h-3 mr-1" />
                        Leave
                      </Button>
                    )}
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Last activity: {streak.lastActivity.toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {streaks.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Flame className="w-8 h-8 text-neon-purple" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Streaks Yet</h3>
          <p className="text-gray-400 mb-6">
            Create your first collective streak and start building habits together!
          </p>
          <Button variant="cyber-purple" onClick={() => setShowCreateForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Streak
          </Button>
        </motion.div>
      )}
    </div>
  )
}

export default StreakTracker
