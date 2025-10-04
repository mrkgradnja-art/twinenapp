'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TreePine, 
  Users, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Calendar,
  Sparkles,
  Zap,
  Mic,
  MicOff,
  Download,
  Plus,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { GenerationsTree as GenerationsTreeType, Interview, Question, Response } from '@/types'

interface GenerationsTreeProps {
  tree: GenerationsTreeType
  onStartInterview?: (interviewerId: string, intervieweeId: string) => void
  onAddQuestion?: (interviewId: string, question: Omit<Question, 'id'>) => void
  onAddResponse?: (questionId: string, response: Omit<Response, 'id'>) => void
  onPlayInterview?: (interviewId: string) => void
  onPauseInterview?: (interviewId: string) => void
}

const GenerationsTreeComponent: React.FC<GenerationsTreeProps> = ({
  tree,
  onStartInterview,
  onAddQuestion,
  onAddResponse,
  onPlayInterview,
  onPauseInterview
}) => {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showAddQuestion, setShowAddQuestion] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')
  const [newResponse, setNewResponse] = useState('')
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)

  const handlePlayPause = () => {
    if (selectedInterview) {
      setIsPlaying(!isPlaying)
      if (isPlaying) {
        onPauseInterview?.(selectedInterview.id)
      } else {
        onPlayInterview?.(selectedInterview.id)
      }
    }
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  const handleAddQuestion = () => {
    if (newQuestion.trim() && selectedInterview) {
      onAddQuestion?.(selectedInterview.id, {
        text: newQuestion,
        category: 'memories',
        isRequired: false
      })
      setNewQuestion('')
      setShowAddQuestion(false)
    }
  }

  const handleAddResponse = () => {
    if (newResponse.trim() && selectedQuestion) {
      onAddResponse?.(selectedQuestion.id, {
        content: newResponse,
        media: []
      })
      setNewResponse('')
      setSelectedQuestion(null)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleDateString()
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'childhood': return '👶'
      case 'family': return '👨‍👩‍👧‍👦'
      case 'values': return '💎'
      case 'memories': return '🧠'
      case 'advice': return '💡'
      default: return '❓'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'childhood': return 'text-pink-400'
      case 'family': return 'text-blue-400'
      case 'values': return 'text-purple-400'
      case 'memories': return 'text-green-400'
      case 'advice': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <TreePine className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-glow-purple">Generations Tree</h2>
            <p className="text-gray-400">Preserve family stories and wisdom</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMuteToggle}
            className={isMuted ? 'text-red-400' : 'text-gray-400'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="cyber-purple"
            onClick={handlePlayPause}
            disabled={!selectedInterview}
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? 'Pause' : 'Play'} Interview
          </Button>
        </div>
      </div>

      {/* Family Tree Visualization */}
      <Card variant="glow-green">
        <CardHeader>
          <CardTitle className="text-lg text-glow-green">Family Tree</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Family Tree Visualization</h3>
              <p className="text-gray-400 mb-4">
                Interactive family tree showing relationships and interview connections
              </p>
              <Button variant="cyber-blue">
                <TreePine className="w-4 h-4 mr-2" />
                View Full Tree
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interview List */}
        <Card variant="glow-blue">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-glow-blue">Interviews</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddQuestion(true)}
                className="text-gray-400 hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tree.interviews.map((interview, index) => (
                <motion.div
                  key={interview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedInterview?.id === interview.id 
                      ? 'bg-neon-blue/20 border border-neon-blue/50' 
                      : 'bg-dark-800/50 hover:bg-dark-800'
                  }`}
                  onClick={() => setSelectedInterview(interview)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar
                      name={interview.intervieweeId}
                      size="sm"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white text-sm">
                          Interview with {interview.intervieweeId}
                        </span>
                        <span className="text-xs text-gray-400">
                          {interview.responses.length} responses
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatTime(interview.createdAt)} • {interview.isPublic ? 'Public' : 'Private'}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <Play className="w-3 h-3" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interview Details */}
        {selectedInterview ? (
          <Card variant="glow-purple">
            <CardHeader>
              <CardTitle className="text-lg text-glow-purple">
                Interview with {selectedInterview.intervieweeId}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Questions and Responses */}
              {selectedInterview.questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-dark-800/50 rounded-lg"
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-neon-purple/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">{getCategoryIcon(question.category)}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-white">{question.text}</span>
                        <span className={`text-xs ${getCategoryColor(question.category)}`}>
                          {question.category}
                        </span>
                        {question.isRequired && (
                          <span className="text-xs text-red-400">Required</span>
                        )}
                      </div>
                      
                      {/* Responses */}
                      <div className="space-y-2">
                        {question.responses.map((response, responseIndex) => (
                          <div key={response.id} className="p-3 bg-dark-700 rounded-lg">
                            <div className="flex items-start space-x-3">
                              <button
                                onClick={() => setSelectedQuestion(question)}
                                className="p-1 text-gray-400 hover:text-white transition-colors"
                              >
                                <Play className="w-3 h-3" />
                              </button>
                              <div className="flex-1">
                                <p className="text-sm text-gray-300">{response.content}</p>
                                <div className="text-xs text-gray-500 mt-1">
                                  {formatTime(response.createdAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Add Response */}
                        <div className="p-3 bg-dark-700/50 rounded-lg border border-dashed border-dark-600">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => setSelectedQuestion(question)}
                              className="p-1 text-gray-400 hover:text-white transition-colors"
                            >
                              <Mic className="w-3 h-3" />
                            </button>
                            <span className="text-sm text-gray-400">Add response to this question</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card variant="glow">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-8 h-8 text-neon-purple" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Select an Interview</h3>
              <p className="text-gray-400">
                Choose an interview from the list to view questions and responses
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Question Form */}
      <AnimatePresence>
        {showAddQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card variant="glow-pink">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-glow-pink">Add Question</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddQuestion(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Question
                  </label>
                  <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="What would you like to ask?"
                    className="w-full bg-dark-800 border border-dark-600 text-white rounded-lg px-3 py-2 focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddQuestion(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="cyber-pink"
                    onClick={handleAddQuestion}
                    disabled={!newQuestion.trim()}
                  >
                    Add Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Response Form */}
      <AnimatePresence>
        {selectedQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card variant="glow-cyan">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-glow-cyan">Add Response</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedQuestion(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Response to: {selectedQuestion.text}
                  </label>
                  <textarea
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    placeholder="Share your response..."
                    className="w-full bg-dark-800 border border-dark-600 text-white rounded-lg px-3 py-2 focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
                    rows={4}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedQuestion(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="cyber-cyan"
                    onClick={handleAddResponse}
                    disabled={!newResponse.trim()}
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    Record Response
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GenerationsTreeComponent
