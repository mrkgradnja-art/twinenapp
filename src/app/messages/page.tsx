'use client'

import { useState } from 'react'
import { Search, Send, MoreVertical, Phone, Video, Smile, Paperclip } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'

// Mock conversations data
const mockConversations = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Sarah Chen',
      username: 'sarah_chen',
      avatar: '/images/friend-1.svg',
      status: 'online'
    },
    lastMessage: 'Hey! Did you see the new cyberpunk art gallery?',
    timestamp: '2m ago',
    unreadCount: 2,
    isActive: true
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'Michael Torres',
      username: 'mike_torres',
      avatar: '/images/friend-2.svg',
      status: 'offline'
    },
    lastMessage: 'Thanks for the AI Twin tips!',
    timestamp: '1h ago',
    unreadCount: 0,
    isActive: false
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'Alex Rivera',
      username: 'alex_rivera',
      avatar: '/images/friend-3.svg',
      status: 'online'
    },
    lastMessage: 'Can\'t wait for the new theme update!',
    timestamp: '3h ago',
    unreadCount: 1,
    isActive: false
  }
]

const mockMessages = [
  {
    id: '1',
    senderId: '1',
    content: 'Hey Adrian! How are you?',
    timestamp: '10:30 AM',
    isOwn: false
  },
  {
    id: '2',
    senderId: 'me',
    content: 'Hi Sarah! I\'m doing great, thanks! Just working on some new cyberpunk designs.',
    timestamp: '10:32 AM',
    isOwn: true
  },
  {
    id: '3',
    senderId: '1',
    content: 'That sounds amazing! I\'d love to see them when you\'re ready.',
    timestamp: '10:35 AM',
    isOwn: false
  },
  {
    id: '4',
    senderId: 'me',
    content: 'Of course! I\'ll share them in a bit. Did you see the new art gallery?',
    timestamp: '10:36 AM',
    isOwn: true
  },
  {
    id: '5',
    senderId: '1',
    content: 'Yes! It\'s incredible. The neon lighting effects are perfect.',
    timestamp: '10:38 AM',
    isOwn: false
  }
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [messageInput, setMessageInput] = useState('')

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput)
      setMessageInput('')
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Modern Header Navigation */}
      <div className="bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="text-3xl font-bold text-white font-orbitron tracking-tight">Twinen</div>
            <nav className="flex items-center space-x-1">
              <a href="/" className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">Home</a>
              <a href="/profile/adrian" className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">Profile</a>
              <a href="#" className="px-4 py-2 rounded-xl text-white font-medium bg-white/10 border border-white/20">Messages</a>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
          
          {/* Conversations List */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search */}
            <div className="modern-card theme-glow rounded-2xl">
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-white/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Conversations */}
            <div className="modern-card theme-glow rounded-2xl overflow-hidden">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Conversations</h3>
                <div className="space-y-2">
                  {mockConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        conversation.isActive 
                          ? 'bg-white/10 border border-white/20' 
                          : 'hover:bg-white/5'
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar 
                            src={conversation.user.avatar} 
                            size="md"
                            status={conversation.user.status}
                          />
                          {conversation.unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-xs text-white font-bold">{conversation.unreadCount}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-medium truncate">{conversation.user.name}</h4>
                            <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="modern-card theme-glow rounded-2xl h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar 
                      src={selectedConversation.user.avatar} 
                      size="md"
                      status={selectedConversation.user.status}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{selectedConversation.user.name}</h3>
                      <p className="text-sm text-gray-400">@{selectedConversation.user.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.isOwn
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-white/10">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-white/20 focus:outline-none"
                    />
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    variant="cyber-purple" 
                    size="sm"
                    disabled={!messageInput.trim()}
                  >
                    <Send className="w-4 h-4" />
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
