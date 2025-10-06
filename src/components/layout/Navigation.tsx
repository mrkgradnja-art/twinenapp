'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, User, MessageCircle, Users, Settings, ChevronDown } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'

interface NavigationProps {
  currentUser?: {
    id: string
    username: string
    displayName: string
    avatar?: string
  }
}

export default function Navigation({ currentUser }: NavigationProps) {
  const pathname = usePathname()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home, description: 'Global Feed' },
    { name: 'Profile', href: `/profile/${currentUser?.username || 'me'}`, icon: User, description: 'Your Space' },
    { name: 'Messages', href: '/messages', icon: MessageCircle, description: 'Chat' },
    { name: 'Friends', href: '/friends', icon: Users, description: 'Connections' }
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-dark-800/95 backdrop-blur-sm border-b border-dark-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-white font-orbitron">
              Twinen
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                        : 'text-gray-300 hover:text-white hover:bg-dark-700/50'
                    }`}
                    title={item.description}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* User Menu */}
          {currentUser && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-dark-700/50 transition-colors"
              >
                <Avatar 
                  src={currentUser.avatar} 
                  alt={currentUser.displayName}
                  size="sm"
                />
                <span className="text-white font-medium hidden sm:block">
                  {currentUser.displayName}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-lg shadow-xl border border-dark-700 py-2 z-50">
                  <Link
                    href="/profile/me"
                    className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-700/50 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Your Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-700/50 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Link>
                  <div className="border-t border-dark-700 my-2"></div>
                  <button
                    onClick={() => {
                      // Handle logout
                      setShowUserMenu(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-700/50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showUserMenu && (
          <div className="md:hidden border-t border-dark-700 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-neon-purple/20 text-neon-purple'
                        : 'text-gray-300 hover:text-white hover:bg-dark-700/50'
                    }`}
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
