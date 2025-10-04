'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Zap, 
  Sparkles, 
  MessageSquare, 
  Users, 
  Heart, 
  Clock,
  Settings,
  X,
  Send
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'

interface AITwinMessage {
  id: string
  type: 'user' | 'twin'
  content: string
  timestamp: Date
  action?: string
}

interface AITwinInterfaceProps {
  isOpen: boolean
  onClose: () => void
}

const AITwinInterface: React.FC<AITwinInterfaceProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<AITwinMessage[]>([
    {
      id: '1',
      type: 'twin',
      content: "Hey! I'm your AI Twin. I'm here to help you connect, create, and navigate your social world. What would you like to do today?",
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickActions = [
    {
      id: 'summarize',
      name: 'Summarize Feed',
      description: 'Get highlights from your feed',
      icon: Brain,
      color: 'purple'
    },
    {
      id: 'draft',
      name: 'Draft Post',
      description: 'Create a post in your style',
      icon: Zap,
      color: 'pink'
    },
    {
      id: 'theme',
      name: 'Change Theme',
      description: 'Preview and apply themes',
      icon: Sparkles,
      color: 'blue'
    },
    {
      id: 'connect',
      name: 'Find Connections',
      description: 'Discover like-minded people',
      icon: Users,
      color: 'cyan'
    }
  ]

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: AITwinMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const twinMessage: AITwinMessage = {
        id: (Date.now() + 1).toString(),
        type: 'twin',
        content: "I understand! Let me help you with that. I can see you're interested in connecting with others who share your interests. Would you like me to suggest some people or help you craft a post to start a conversation?",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, twinMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleQuickAction = (actionId: string) => {
    const actionMessages = {
      summarize: "I'll analyze your feed and create a personalized summary of the most important updates and conversations.",
      draft: "I'll help you craft a post that matches your style and voice. What topic would you like to write about?",
      theme: "I can help you find the perfect theme for your profile! What mood or aesthetic are you going for?",
      connect: "I'll scan for people who share your interests and suggest meaningful connections."
    }

    const twinMessage: AITwinMessage = {
      id: Date.now().toString(),
      type: 'twin',
      content: actionMessages[actionId as keyof typeof actionMessages],
      timestamp: new Date(),
      action: actionId
    }

    setMessages(prev => [...prev, twinMessage])
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
                <Avatar 
                  name="AI Twin" 
                  size="md" 
                  glow 
                  className="bg-gradient-to-br from-neon-purple to-neon-pink"
                />
                <div>
                  <h2 className="text-lg font-semibold text-white">AI Twin</h2>
                  <p className="text-sm text-gray-400">Your personal assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-cyber">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {message.type === 'twin' && (
                      <Avatar 
                        name="AI" 
                        size="sm" 
                        glow 
                        className="bg-gradient-to-br from-neon-purple to-neon-pink"
                      />
                    )}
                    <div className={`rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-neon-purple text-dark-900' 
                        : 'bg-dark-800 text-white'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex space-x-3">
                    <Avatar 
                      name="AI" 
                      size="sm" 
                      glow 
                      className="bg-gradient-to-br from-neon-purple to-neon-pink"
                    />
                    <div className="bg-dark-800 text-white rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="p-6 border-t border-dark-600">
              <h3 className="text-sm font-medium text-gray-300 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    variant={`cyber-${action.color}` as any}
                    size="sm"
                    onClick={() => handleQuickAction(action.id)}
                    className="text-xs"
                  >
                    <action.icon className="w-3 h-3 mr-1" />
                    {action.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-6 border-t border-dark-600">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask your AI Twin..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="bg-dark-800"
                  />
                </div>
                <Button
                  variant="cyber-purple"
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AITwinInterface
