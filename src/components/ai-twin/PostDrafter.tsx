'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  Sparkles, 
  Send, 
  RefreshCw,
  Wand2,
  Type,
  Image,
  Video,
  Hash,
  X,
  Check
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'

interface DraftPost {
  id: string
  content: string
  tone: 'casual' | 'professional' | 'friendly' | 'witty' | 'empathetic'
  style: 'concise' | 'detailed' | 'conversational' | 'analytical'
  hashtags: string[]
  suggestions: string[]
  createdAt: Date
}

interface PostDrafterProps {
  isOpen: boolean
  onClose: () => void
  onSaveDraft?: (draft: DraftPost) => void
  onPublish?: (draft: DraftPost) => void
}

const PostDrafter: React.FC<PostDrafterProps> = ({
  isOpen,
  onClose,
  onSaveDraft,
  onPublish
}) => {
  const [prompt, setPrompt] = useState('')
  const [tone, setTone] = useState<'casual' | 'professional' | 'friendly' | 'witty' | 'empathetic'>('friendly')
  const [style, setStyle] = useState<'concise' | 'detailed' | 'conversational' | 'analytical'>('conversational')
  const [isGenerating, setIsGenerating] = useState(false)
  const [drafts, setDrafts] = useState<DraftPost[]>([])
  const [selectedDraft, setSelectedDraft] = useState<DraftPost | null>(null)

  const toneOptions = [
    { value: 'casual', label: 'Casual', description: 'Relaxed and informal' },
    { value: 'professional', label: 'Professional', description: 'Formal and business-like' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'witty', label: 'Witty', description: 'Clever and humorous' },
    { value: 'empathetic', label: 'Empathetic', description: 'Understanding and supportive' }
  ]

  const styleOptions = [
    { value: 'concise', label: 'Concise', description: 'Short and to the point' },
    { value: 'detailed', label: 'Detailed', description: 'Comprehensive and thorough' },
    { value: 'conversational', label: 'Conversational', description: 'Natural and flowing' },
    { value: 'analytical', label: 'Analytical', description: 'Logical and data-driven' }
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      const mockDraft: DraftPost = {
        id: Date.now().toString(),
        content: `Just discovered this amazing ${prompt.toLowerCase()}! The experience was absolutely incredible and I can't wait to share more about it. What are your thoughts on this? #${prompt.toLowerCase().replace(/\s+/g, '')} #discovery #excited`,
        tone,
        style,
        hashtags: [prompt.toLowerCase().replace(/\s+/g, ''), 'discovery', 'excited'],
        suggestions: [
          'Add a call-to-action to encourage engagement',
          'Include a personal story or experience',
          'Ask a question to start a conversation',
          'Share a tip or insight related to the topic'
        ],
        createdAt: new Date()
      }
      
      setDrafts(prev => [mockDraft, ...prev])
      setSelectedDraft(mockDraft)
      setIsGenerating(false)
    }, 2000)
  }

  const handleSaveDraft = () => {
    if (selectedDraft) {
      onSaveDraft?.(selectedDraft)
      onClose()
    }
  }

  const handlePublish = () => {
    if (selectedDraft) {
      onPublish?.(selectedDraft)
      onClose()
    }
  }

  const handleEditDraft = (draft: DraftPost) => {
    setSelectedDraft(draft)
  }

  const handleDeleteDraft = (draftId: string) => {
    setDrafts(prev => prev.filter(d => d.id !== draftId))
    if (selectedDraft?.id === draftId) {
      setSelectedDraft(null)
    }
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
            {/* Sidebar - Drafts */}
            <div className="w-1/3 border-r border-dark-600 bg-dark-800/50">
              <div className="p-6 border-b border-dark-600">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-glow-purple">AI Post Drafter</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Generate posts in your unique voice and style
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    What do you want to write about?
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to post about..."
                    className="bg-dark-800"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Tone
                    </label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value as any)}
                      className="w-full bg-dark-800 border border-dark-600 text-white rounded-lg px-3 py-2 text-sm focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
                    >
                      {toneOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Style
                    </label>
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value as any)}
                      className="w-full bg-dark-800 border border-dark-600 text-white rounded-lg px-3 py-2 text-sm focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
                    >
                      {styleOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  variant="cyber-purple"
                  onClick={handleGenerate}
                  loading={isGenerating}
                  className="w-full"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  {isGenerating ? 'Generating...' : 'Generate Post'}
                </Button>
              </div>

              {/* Drafts List */}
              <div className="p-6 border-t border-dark-600">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Recent Drafts</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-cyber">
                  {drafts.map((draft) => (
                    <motion.div
                      key={draft.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedDraft?.id === draft.id 
                          ? 'bg-neon-purple/20 border border-neon-purple/50' 
                          : 'bg-dark-700 hover:bg-dark-600'
                      }`}
                      onClick={() => handleEditDraft(draft)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{draft.content}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-400">{draft.tone}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-400">{draft.style}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteDraft(draft.id)
                          }}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content - Draft Editor */}
            <div className="flex-1 flex flex-col">
              {selectedDraft ? (
                <>
                  <div className="p-6 border-b border-dark-600">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Edit Draft</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">
                          {selectedDraft.tone} • {selectedDraft.style}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-6 space-y-6">
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">
                        Post Content
                      </label>
                      <Textarea
                        value={selectedDraft.content}
                        onChange={(e) => setSelectedDraft({
                          ...selectedDraft,
                          content: e.target.value
                        })}
                        className="bg-dark-800 min-h-32"
                        rows={6}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">
                        Hashtags
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedDraft.hashtags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-neon-purple/20 text-neon-purple rounded text-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">
                        AI Suggestions
                      </label>
                      <div className="space-y-2">
                        {selectedDraft.suggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-start space-x-2 p-3 bg-dark-800 rounded-lg">
                            <Sparkles className="w-4 h-4 text-neon-purple mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-300">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-dark-600">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        Generated by AI Twin • {selectedDraft.createdAt.toLocaleString()}
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          onClick={handleSaveDraft}
                        >
                          Save Draft
                        </Button>
                        <Button
                          variant="cyber-purple"
                          onClick={handlePublish}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Publish
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-neon-purple" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No Draft Selected</h3>
                    <p className="text-gray-400 mb-6">
                      Generate a new post or select a draft to edit
                    </p>
                    <Button
                      variant="cyber-purple"
                      onClick={handleGenerate}
                      disabled={!prompt.trim()}
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate New Post
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PostDrafter
