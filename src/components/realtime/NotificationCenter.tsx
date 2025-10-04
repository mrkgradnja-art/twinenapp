'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  X, 
  Heart, 
  MessageCircle, 
  Share2, 
  UserPlus, 
  Sparkles,
  Zap,
  Users,
  Settings,
  Check,
  CheckCheck
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { Notification } from '@/types'
import { formatDate } from '@/lib/utils'

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
  notifications: Notification[]
  onMarkAsRead?: (notificationId: string) => void
  onMarkAllAsRead?: () => void
  onClearAll?: () => void
  onActionClick?: (notification: Notification) => void
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onActionClick
}) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'mentions' | 'likes' | 'follows'>('all')
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.isRead
      case 'mentions':
        return notification.type === 'mention'
      case 'likes':
        return notification.type === 'like'
      case 'follows':
        return notification.type === 'follow'
      default:
        return true
    }
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-4 h-4 text-red-400" />
      case 'comment': return <MessageCircle className="w-4 h-4 text-blue-400" />
      case 'share': return <Share2 className="w-4 h-4 text-green-400" />
      case 'follow': return <UserPlus className="w-4 h-4 text-purple-400" />
      case 'mention': return <Sparkles className="w-4 h-4 text-yellow-400" />
      case 'ai_twin': return <Zap className="w-4 h-4 text-neon-purple" />
      case 'system': return <Settings className="w-4 h-4 text-gray-400" />
      default: return <Bell className="w-4 h-4 text-gray-400" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'like': return 'border-red-500/30 bg-red-500/10'
      case 'comment': return 'border-blue-500/30 bg-blue-500/10'
      case 'share': return 'border-green-500/30 bg-green-500/10'
      case 'follow': return 'border-purple-500/30 bg-purple-500/10'
      case 'mention': return 'border-yellow-500/30 bg-yellow-500/10'
      case 'ai_twin': return 'border-neon-purple/30 bg-neon-purple/10'
      case 'system': return 'border-gray-500/30 bg-gray-500/10'
      default: return 'border-gray-500/30 bg-gray-500/10'
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      onMarkAsRead?.(notification.id)
    }
    onActionClick?.(notification)
    setSelectedNotification(notification)
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
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 h-full w-full max-w-md bg-dark-900 border-l border-dark-600"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dark-600">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bell className="w-5 h-5 text-neon-purple" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{unreadCount}</span>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Notifications</h2>
                  <p className="text-sm text-gray-400">{notifications.length} total</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMarkAllAsRead}
                    className="text-gray-400 hover:text-white"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="p-6 border-b border-dark-600">
              <div className="flex space-x-2 overflow-x-auto">
                {[
                  { value: 'all', label: 'All', count: notifications.length },
                  { value: 'unread', label: 'Unread', count: unreadCount },
                  { value: 'mentions', label: 'Mentions', count: notifications.filter(n => n.type === 'mention').length },
                  { value: 'likes', label: 'Likes', count: notifications.filter(n => n.type === 'like').length },
                  { value: 'follows', label: 'Follows', count: notifications.filter(n => n.type === 'follow').length }
                ].map((filterOption) => (
                  <Button
                    key={filterOption.value}
                    variant={filter === filterOption.value ? 'cyber-purple' : 'outline'}
                    size="sm"
                    onClick={() => setFilter(filterOption.value as any)}
                    className="text-xs whitespace-nowrap"
                  >
                    {filterOption.label} ({filterOption.count})
                  </Button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto scrollbar-cyber">
              {filteredNotifications.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No notifications</h3>
                    <p className="text-gray-400">
                      {filter === 'unread' ? 'All caught up!' : 'No notifications match your filter.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-6 space-y-3">
                  {filteredNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                        notification.isRead 
                          ? 'bg-dark-800/50 border border-dark-600' 
                          : `bg-dark-800 border ${getNotificationColor(notification.type)}`
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-white text-sm truncate">
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-neon-purple rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                              {formatDate(notification.createdAt)}
                            </span>
                            {notification.actionUrl && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-neon-purple hover:text-neon-pink"
                              >
                                View
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-dark-600">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  {unreadCount} unread notifications
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearAll}
                    className="text-gray-400 hover:text-white"
                  >
                    Clear All
                  </Button>
                  <Button
                    variant="cyber-purple"
                    size="sm"
                    onClick={onClose}
                  >
                    Close
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

export default NotificationCenter
