'use client'

import { useState } from 'react'
import { Search, UserPlus, Users, Settings, MoreVertical } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'

// Mock friends data
const mockFriends = [
  {
    id: '1',
    name: 'Sarah Chen',
    username: 'sarah_chen',
    avatar: '/images/friend-1.svg',
    status: 'online',
    mutualFriends: 12,
    lastActive: '2 minutes ago',
    isFollowing: true
  },
  {
    id: '2',
    name: 'Michael Torres',
    username: 'mike_torres',
    avatar: '/images/friend-2.svg',
    status: 'offline',
    mutualFriends: 8,
    lastActive: '2 hours ago',
    isFollowing: true
  },
  {
    id: '3',
    name: 'Alex Rivera',
    username: 'alex_rivera',
    avatar: '/images/friend-3.svg',
    status: 'online',
    mutualFriends: 15,
    lastActive: '1 minute ago',
    isFollowing: true
  },
  {
    id: '4',
    name: 'Emma Wilson',
    username: 'emma_wilson',
    avatar: '/images/friend-4.svg',
    status: 'away',
    mutualFriends: 5,
    lastActive: '30 minutes ago',
    isFollowing: false
  },
  {
    id: '5',
    name: 'David Park',
    username: 'david_park',
    avatar: '/images/friend-5.svg',
    status: 'online',
    mutualFriends: 20,
    lastActive: '5 minutes ago',
    isFollowing: true
  }
]

const mockSuggestedFriends = [
  {
    id: '6',
    name: 'Cyberpunk Designer',
    username: 'cyber_designer',
    avatar: '/images/suggested-avatar.svg',
    mutualFriends: 3,
    bio: 'Digital artist exploring cyberpunk aesthetics'
  },
  {
    id: '7',
    name: 'AI Researcher',
    username: 'ai_researcher',
    avatar: '/images/suggested-avatar.svg',
    mutualFriends: 7,
    bio: 'Studying the future of AI and human interaction'
  },
  {
    id: '8',
    name: 'Neon Artist',
    username: 'neon_creator',
    avatar: '/images/suggested-avatar.svg',
    mutualFriends: 2,
    bio: 'Creating vibrant neon art for the digital age'
  }
]

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'online' | 'suggestions'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFriends = mockFriends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const onlineFriends = mockFriends.filter(friend => friend.status === 'online')

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
              <a href="/messages" className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">Messages</a>
              <a href="#" className="px-4 py-2 rounded-xl text-white font-medium bg-white/10 border border-white/20">Friends</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Avatar src="/images/cyberpunk-avatar.svg" size="md" />
              <span className="text-white font-medium">Adrian</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Search */}
            <div className="modern-card theme-glow rounded-2xl">
              <div className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-white/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="modern-card theme-glow rounded-2xl">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Friends</h3>
                
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 ${
                      activeTab === 'all' 
                        ? 'bg-white/10 text-white border border-white/20' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Users className="w-5 h-5 mr-3" />
                    <span>All Friends</span>
                    <span className="ml-auto text-xs bg-white/10 px-2 py-1 rounded-full">
                      {mockFriends.length}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('online')}
                    className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 ${
                      activeTab === 'online' 
                        ? 'bg-white/10 text-white border border-white/20' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="w-5 h-5 mr-3 bg-green-500 rounded-full"></div>
                    <span>Online</span>
                    <span className="ml-auto text-xs bg-white/10 px-2 py-1 rounded-full">
                      {onlineFriends.length}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('suggestions')}
                    className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 ${
                      activeTab === 'suggestions' 
                        ? 'bg-white/10 text-white border border-white/20' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <UserPlus className="w-5 h-5 mr-3" />
                    <span>Suggestions</span>
                    <span className="ml-auto text-xs bg-white/10 px-2 py-1 rounded-full">
                      {mockSuggestedFriends.length}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Header */}
            <div className="modern-card theme-glow rounded-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {activeTab === 'all' && 'All Friends'}
                      {activeTab === 'online' && 'Online Friends'}
                      {activeTab === 'suggestions' && 'Suggested Friends'}
                    </h2>
                    <p className="text-gray-400">
                      {activeTab === 'all' && `${mockFriends.length} friends`}
                      {activeTab === 'online' && `${onlineFriends.length} online now`}
                      {activeTab === 'suggestions' && 'People you might know'}
                    </p>
                  </div>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </div>
              </div>
            </div>

            {/* Friends Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {(activeTab === 'suggestions' ? mockSuggestedFriends : 
                activeTab === 'online' ? onlineFriends : filteredFriends).map((friend) => (
                <div key={friend.id} className="modern-card theme-glow rounded-2xl">
                  <div className="p-6 text-center">
                    <div className="relative mb-4">
                      <Avatar 
                        src={friend.avatar} 
                        size="xl"
                        status={friend.status}
                      />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-1">{friend.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">@{friend.username}</p>
                    
                    {activeTab === 'suggestions' && (
                      <p className="text-gray-300 text-xs mb-3">{friend.bio}</p>
                    )}
                    
                    <div className="text-xs text-gray-400 mb-4">
                      {activeTab === 'suggestions' ? (
                        `${friend.mutualFriends} mutual friends`
                      ) : (
                        friend.status === 'online' ? 'Online now' : `Last active ${friend.lastActive}`
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      {activeTab === 'suggestions' ? (
                        <Button variant="cyber-purple" size="sm" className="flex-1">
                          <UserPlus className="w-4 h-4 mr-1" />
                          Follow
                        </Button>
                      ) : (
                        <>
                          <Button variant="outline" size="sm" className="flex-1 border-white/20 text-white hover:bg-white/10">
                            Message
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {activeTab === 'suggestions' && mockSuggestedFriends.length === 0 && (
              <div className="modern-card theme-glow rounded-2xl">
                <div className="p-12 text-center">
                  <UserPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Suggestions</h3>
                  <p className="text-gray-400">We couldn't find any friend suggestions for you right now.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
