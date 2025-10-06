'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Camera, Image as ImageIcon, FileImage, AlertCircle, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  onUpload: (file: File) => void
  onRemove?: () => void
  currentImage?: string
  maxSize?: number // in MB
  acceptedTypes?: string[]
  className?: string
  variant?: 'default' | 'banner' | 'avatar' | 'gallery'
  placeholder?: string
  disabled?: boolean
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onUpload,
  onRemove,
  currentImage,
  maxSize = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  className,
  variant = 'default',
  placeholder = 'Upload image',
  disabled = false
}) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    setError(null)
    
    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload an image.')
      return
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    // Simulate upload progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null || prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setUploadProgress(null)
            onUpload(file)
          }, 500)
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 100)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    if (disabled) return
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setError(null)
    onRemove?.()
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'banner':
        return 'aspect-video h-48'
      case 'avatar':
        return 'aspect-square h-32 w-32 rounded-full'
      case 'gallery':
        return 'aspect-square h-36'
      default:
        return 'aspect-video h-32'
    }
  }

  const getIcon = () => {
    switch (variant) {
      case 'avatar':
        return <Camera className="w-8 h-8" />
      case 'banner':
        return <ImageIcon className="w-8 h-8" />
      case 'gallery':
        return <FileImage className="w-8 h-8" />
      default:
        return <Upload className="w-6 h-6" />
    }
  }

  return (
    <div className={cn('relative', className)}>
      <motion.div
        className={cn(
          'relative border-2 border-dashed rounded-2xl overflow-hidden cursor-pointer transition-all duration-200',
          getVariantClasses(),
          isDragOver ? 'border-blue-400 bg-blue-50/10' : 'border-white/20 hover:border-white/40',
          disabled && 'opacity-50 cursor-not-allowed',
          error && 'border-red-400 bg-red-50/10'
        )}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        transition={{ duration: 0.2 }}
      >
        {/* Current Image */}
        {currentImage && !uploadProgress && (
          <div className="relative w-full h-full">
            <img
              src={currentImage}
              alt="Upload preview"
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        {/* Upload Progress */}
        {uploadProgress !== null && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <motion.div
                className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full mb-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <div className="text-sm font-medium">{Math.round(uploadProgress)}%</div>
            </div>
          </div>
        )}

        {/* Upload Interface */}
        {!currentImage && uploadProgress === null && (
          <div className="w-full h-full flex flex-col items-center justify-center p-6">
            <motion.div
              className="text-white/60 mb-4"
              animate={{ scale: isDragOver ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {getIcon()}
            </motion.div>
            
            <div className="text-center space-y-2 w-full">
              <p className="text-white font-medium text-base leading-tight">{placeholder}</p>
              <p className="text-white/50 text-sm">
                Drag & drop or click
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="absolute bottom-2 left-2 right-2 p-2 bg-red-500/90 text-white text-sm rounded-lg flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Indicator */}
        <AnimatePresence>
          {uploadProgress === 100 && (
            <motion.div
              className="absolute inset-0 bg-green-500/20 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Check className="w-8 h-8 text-green-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            handleFileSelect(file)
          }
        }}
        className="hidden"
        disabled={disabled}
      />
    </div>
  )
}

export default ImageUpload
