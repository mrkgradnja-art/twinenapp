'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Palette, 
  Eye, 
  Download, 
  X,
  Check,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'

interface Theme {
  id: string
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    glow: string
  }
  preview: {
    posts: Array<{
      id: string
      author: string
      content: string
      likes: number
      comments: number
    }>
  }
}

interface ThemePreviewProps {
  isOpen: boolean
  onClose: () => void
  onApply: (theme: Theme) => void
}

const mockThemes: Theme[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon lights and futuristic vibes',
    colors: {
      primary: '#FF10F0',
      secondary: '#8B5CF6',
      accent: '#06B6D4',
      background: '#0A0A0A',
      surface: '#1A1A1A',
      text: '#FFFFFF',
      glow: '#FF10F0'
    },
    preview: {
      posts: [
        {
          id: '1',
          author: 'cyberpunk_user',
          content: 'Just discovered this amazing cyberpunk cityscape! The neon lights and futuristic architecture are absolutely breathtaking.',
          likes: 24000,
          comments: 156
        },
        {
          id: '2',
          author: 'neon_artist',
          content: 'Working on a new digital art piece. The colors are so vibrant!',
          likes: 8900,
          comments: 67
        }
      ]
    }
  },
  {
    id: 'matrix',
    name: 'Matrix',
    description: 'Green code rain and digital matrix',
    colors: {
      primary: '#00FF00',
      secondary: '#00CC00',
      accent: '#00FFFF',
      background: '#000000',
      surface: '#001100',
      text: '#00FF00',
      glow: '#00FF00'
    },
    preview: {
      posts: [
        {
          id: '1',
          author: 'matrix_user',
          content: 'The Matrix has you... Welcome to the real world!',
          likes: 15000,
          comments: 89
        }
      ]
    }
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    description: '80s retro and synthwave aesthetics',
    colors: {
      primary: '#FF6B35',
      secondary: '#F7931E',
      accent: '#FFD23F',
      background: '#0D0D0D',
      surface: '#1A1A1A',
      text: '#FFFFFF',
      glow: '#FF6B35'
    },
    preview: {
      posts: [
        {
          id: '1',
          author: 'synthwave_user',
          content: 'Cruising through the digital sunset. The vibes are immaculate! 🌅',
          likes: 12000,
          comments: 45
        }
      ]
    }
  }
]

const ThemePreview: React.FC<ThemePreviewProps> = ({ isOpen, onClose, onApply }) => {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(mockThemes[0])
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : mockThemes.length - 1
    setCurrentIndex(newIndex)
    setSelectedTheme(mockThemes[newIndex])
  }

  const handleNext = () => {
    const newIndex = currentIndex < mockThemes.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    setSelectedTheme(mockThemes[newIndex])
  }

  const handleApply = () => {
    onApply(selectedTheme)
    onClose()
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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute inset-4 max-w-6xl mx-auto bg-dark-900 rounded-xl border border-dark-600 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full">
            {/* Theme Controls */}
            <div className="w-1/3 p-6 border-r border-dark-600 bg-dark-800/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-glow-purple">Theme Preview</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrevious}
                    className="text-gray-400 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 text-center">
                    <h3 className="text-lg font-semibold text-white">{selectedTheme.name}</h3>
                    <p className="text-sm text-gray-400">{selectedTheme.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNext}
                    className="text-gray-400 hover:text-white"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Colors</label>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(selectedTheme.colors).map(([key, color]) => (
                        <div key={key} className="space-y-1">
                          <div 
                            className="w-full h-8 rounded border border-dark-600"
                            style={{ backgroundColor: color }}
                          />
                          <p className="text-xs text-gray-400 capitalize">{key}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="cyber-purple"
                    onClick={handleApply}
                    className="flex-1"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Apply Theme
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {/* Download theme */}}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="flex-1 p-6">
              <div className="h-full overflow-y-auto scrollbar-cyber">
                <div 
                  className="rounded-xl p-6 min-h-full"
                  style={{ 
                    backgroundColor: selectedTheme.colors.background,
                    color: selectedTheme.colors.text
                  }}
                >
                  <div className="space-y-6">
                    {selectedTheme.preview.posts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-lg p-4 border"
                        style={{ 
                          backgroundColor: selectedTheme.colors.surface,
                          borderColor: selectedTheme.colors.primary + '30'
                        }}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar 
                            name={post.author} 
                            size="sm"
                            className="bg-gradient-to-br from-purple-500 to-pink-500"
                          />
                          <div>
                            <span className="font-semibold">@{post.author}</span>
                            <span className="text-sm opacity-70 ml-2">2h ago</span>
                          </div>
                        </div>
                        <p className="mb-3">{post.content}</p>
                        <div className="flex items-center space-x-4 text-sm opacity-70">
                          <span>❤️ {post.likes.toLocaleString()}</span>
                          <span>💬 {post.comments}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ThemePreview
