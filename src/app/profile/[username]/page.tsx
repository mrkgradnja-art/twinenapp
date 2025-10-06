'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { User, Settings, Camera, Users, MessageCircle, Heart, Share2, ChevronDown } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import ImageUpload from '@/components/ui/ImageUpload'

interface ProfilePageProps {
  params: {
    username: string
  }
}

// Mock user data - in production, this would come from database
const mockUser = {
  id: '1',
  username: 'adrian',
  displayName: 'Adrian',
  bio: 'Cyberpunk enthusiast exploring the neon-lit future of social media. Building connections in the digital realm.',
  avatar: '/images/cyberpunk-avatar.svg',
  banner: '/images/cyberpunk-banner.svg',
  isVerified: true,
  followersCount: 1250,
  followingCount: 320,
  postsCount: 89,
  theme: 'cyberpunk',
  themeSettings: {
    primaryColor: '#ff006e', // Neon pink
    secondaryColor: '#8338ec', // Neon purple
    accentColor: '#3a86ff', // Neon blue
    backgroundPattern: 'circuit',
    glowIntensity: 'high'
  },
  friends: [
    { id: '1', username: 'sarah', displayName: 'Sarah', avatar: '/images/friend-1.svg', isOnline: true },
    { id: '2', username: 'michael', displayName: 'Michael', avatar: '/images/friend-2.svg', isOnline: false },
    { id: '3', username: 'drew', displayName: 'Drew', avatar: '/images/friend-3.svg', isOnline: true },
    { id: '4', username: 'ella', displayName: 'Ella', avatar: '/images/friend-4.svg', isOnline: true },
    { id: '5', username: 'jacob', displayName: 'Jacob', avatar: '/images/friend-5.svg', isOnline: false }
  ],
  photos: [
    { id: '1', url: '/images/photo-1.svg', alt: 'Cyberpunk portrait', likes: 45, comments: 12 },
    { id: '2', url: '/images/photo-2.svg', alt: 'Neon cityscape', likes: 89, comments: 23 },
    { id: '3', url: '/images/photo-3.svg', alt: 'Futuristic selfie', likes: 67, comments: 18 }
  ]
}

// Metadata will be handled by the layout or parent component

export default function ProfilePage({ params }: ProfilePageProps) {
  const user = mockUser // In production, fetch from database
  const [themeStyles, setThemeStyles] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  useEffect(() => {
    // Apply modern theme styles with subtle accents
    const styles = `
      .theme-glow {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05) !important;
      }
      
      .theme-text-primary {
        color: #ffffff !important;
      }
      
      .theme-text-secondary {
        color: #a0a0a0 !important;
      }
      
      .theme-border {
        border-color: rgba(255, 255, 255, 0.1) !important;
      }
      
      .theme-bg-gradient {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01)) !important;
        backdrop-filter: blur(10px) !important;
      }
      
      .modern-card {
        background: rgba(15, 15, 15, 0.8) !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        backdrop-filter: blur(20px) !important;
      }
    `
    setThemeStyles(styles)
  }, [user.themeSettings])
  
  if (!user) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Dynamic Theme Styles */}
      <style dangerouslySetInnerHTML={{ __html: themeStyles }} />

      {/* Modern Header Navigation */}
      <div className="bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="text-3xl font-bold text-white font-orbitron tracking-tight">Twinen</div>
            <nav className="flex items-center space-x-1">
              <a href="/" className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">Home</a>
              <a href="/profile/adrian" className="px-4 py-2 rounded-xl text-white font-medium bg-white/10 border border-white/20">Profile</a>
              <a href="/messages" className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">Messages</a>
              <a href="/friends" className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">Friends</a>
            </nav>
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Avatar src="/images/cyberpunk-avatar.svg" size="md" />
                <span className="text-white font-medium">Adrian</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-lg shadow-xl border border-dark-700 py-2 z-50">
                  <a
                    href="/profile/adrian"
                    className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-700/50 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Your Profile
                  </a>
                  <a
                    href="/settings"
                    className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-700/50 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </a>
                  <div className="border-t border-dark-700 my-2"></div>
                  <button
                    onClick={() => {
                      // Handle logout
                      setShowUserMenu(false)
                      console.log('Logout')
                    }}
                    className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-700/50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Column - User Profile & AI Twin */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Modern User Profile Card */}
            <div className="modern-card theme-glow rounded-2xl p-8 text-center">
              <div className="relative mb-6">
                <Avatar
                  src={user.avatar}
                  alt={user.displayName}
                  size="2xl"
                  className="mx-auto"
                  status="online"
                  isEditable={true}
                  onEdit={() => console.log('Edit avatar')}
                />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {user.displayName}
              </h1>
              <p className="text-gray-400 text-sm mb-6">Digital Creator</p>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-white">{user.postsCount}</div>
                  <div className="text-xs text-gray-400">Posts</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{user.followersCount}</div>
                  <div className="text-xs text-gray-400">Followers</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{user.followingCount}</div>
                  <div className="text-xs text-gray-400">Following</div>
                </div>
              </div>
            </div>

            {/* Modern AI Twin Menu */}
            <div className="modern-card theme-glow rounded-2xl">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">AI Twin</h3>
                
                <div className="space-y-2">
                  <a href="#" className="flex items-center p-4 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/15 transition-all duration-200">
                    <Settings className="w-5 h-5 mr-3" />
                    <span className="font-medium">Theme Settings</span>
                  </a>
                  <a href="#" className="flex items-center p-4 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                    <User className="w-5 h-5 mr-3" />
                    <span>About Me</span>
                  </a>
                  <a href="#" className="flex items-center p-4 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                    <Camera className="w-5 h-5 mr-3" />
                    <span>Photos</span>
                  </a>
                  <a href="#" className="flex items-center p-4 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                    <Users className="w-5 h-5 mr-3" />
                    <span>Friends</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Modern Theme Banner */}
            <div className="modern-card theme-glow rounded-2xl overflow-hidden">
              <div className="relative h-80">
                <img 
                  src="/images/cyberpunk-cityscape.svg" 
                  alt="Modern Theme Banner"
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-3">Modern Cyberpunk</h2>
                      <p className="text-gray-300 text-lg">Sleek • Minimal • Future-forward</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() => console.log('Edit banner')}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Edit Banner
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modern About Me Section */}
            <div className="modern-card theme-glow rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">About Me</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Exploring the intersection of technology and creativity in the digital age. 
                Passionate about building meaningful connections through innovative platforms 
                that blend the nostalgic with the futuristic.
              </p>
            </div>

            {/* Modern Photos Section */}
            <div className="modern-card theme-glow rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-white">Gallery</h3>
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <img 
                    src="/images/cyberpunk-portrait.svg" 
                    alt="Portrait"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <Heart className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-sm">Like</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Creative Process</h4>
                  <p className="text-gray-300 leading-relaxed">
                    This collection represents my journey in digital art and cyberpunk aesthetics. 
                    Each piece explores themes of technology, identity, and the future of human connection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Friends & Actions */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Simple Upload Box */}
            <div className="modern-card theme-glow rounded-2xl p-6">
              <div className="text-center">
                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 hover:border-white/40 transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 text-white/60 mx-auto mb-4" />
                  <h3 className="text-white font-medium mb-2">Upload Photo</h3>
                  <p className="text-white/50 text-sm mb-4">Click to browse or drag & drop</p>
                  <div className="text-xs text-white/40">
                    JPG, PNG, WebP • Max 5MB
                  </div>
                </div>
              </div>
            </div>

            {/* Modern Friends List */}
            <div className="modern-card theme-glow rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Connections</h3>
              
              <div className="space-y-4">
                {user.friends.slice(0, 2).map((friend) => (
                  <div key={friend.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-200">
                    <Avatar 
                      src={friend.avatar} 
                      alt={friend.displayName}
                      size="md"
                      status={friend.isOnline ? "online" : "offline"}
                    />
                    <div className="flex-1">
                      <div className="text-white font-medium">{friend.displayName}</div>
                      <div className="text-gray-400 text-sm">@{friend.username}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full mt-4 text-white hover:bg-white/10">
                View All Connections
              </Button>
            </div>

            {/* Modern Friends Grid */}
            <div className="modern-card theme-glow rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
              
              <div className="grid grid-cols-3 gap-4">
                {user.friends.slice(2, 5).map((friend) => (
                  <div key={friend.id} className="text-center group cursor-pointer">
                    <Avatar 
                      src={friend.avatar} 
                      alt={friend.displayName}
                      size="md"
                      status={friend.isOnline ? "online" : "offline"}
                      className="mx-auto mb-3 group-hover:scale-110 transition-transform duration-200"
                    />
                    <div className="text-white text-sm font-medium">{friend.displayName}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
