import React from 'react'
import { motion } from 'framer-motion'
import { cn, getInitials } from '@/lib/utils'
import { Camera, Check, Edit3 } from 'lucide-react'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  status?: 'online' | 'offline' | 'away'
  glow?: boolean
  verified?: boolean
  isEditable?: boolean
  onEdit?: () => void
  uploadProgress?: number
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    className, 
    src, 
    alt, 
    name, 
    size = 'md', 
    status, 
    glow = false,
    verified = false,
    isEditable = false,
    onEdit,
    uploadProgress,
    ...props 
  }, ref) => {
    const sizes = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-lg',
      '2xl': 'w-20 h-20 text-xl'
    }
    
    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-gray-500',
      away: 'bg-yellow-500'
    }
    
    const glowClasses = glow ? 'animate-pulse-glow' : ''
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-gray-800 group',
          sizes[size],
          glowClasses,
          isEditable && 'cursor-pointer',
          className
        )}
        whileHover={{ scale: isEditable ? 1.05 : 1.02 }}
        transition={{ duration: 0.2 }}
        onClick={isEditable ? onEdit : undefined}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-white font-bold">
            {name ? getInitials(name) : '?'}
          </span>
        )}

        {/* Edit overlay */}
        {isEditable && (
          <motion.div
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-full"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <Camera className="w-4 h-4 text-white" />
          </motion.div>
        )}

        {/* Upload progress overlay */}
        {uploadProgress !== undefined && uploadProgress < 100 && (
          <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
            <div className="text-white text-xs font-medium">{uploadProgress}%</div>
          </div>
        )}

        {/* Status indicator */}
        {status && (
          <motion.div 
            className={cn(
              'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white',
              statusColors[status]
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />
        )}
        
        {/* Verification badge */}
        {verified && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Check className="w-2 h-2 text-white" />
          </motion.div>
        )}

        {/* Gradient overlay for better contrast */}
        {!src && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full" />
        )}
      </motion.div>
    )
  }
)

Avatar.displayName = 'Avatar'

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max = 3, size = 'md', ...props }, ref) => {
    const childrenArray = React.Children.toArray(children)
    const visibleChildren = childrenArray.slice(0, max)
    const remainingCount = childrenArray.length - max
    
    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16'
    }
    
    return (
      <div
        ref={ref}
        className={cn('flex -space-x-2', className)}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div key={index} className="relative">
            {React.cloneElement(child as React.ReactElement, { size })}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className={cn(
            'relative inline-flex items-center justify-center rounded-full bg-dark-700 border-2 border-dark-600 text-white font-medium',
            sizes[size],
            'text-xs'
          )}>
            +{remainingCount}
          </div>
        )}
      </div>
    )
  }
)

AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarGroup }
