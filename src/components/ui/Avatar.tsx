import React from 'react'
import { motion } from 'framer-motion'
import { cn, getInitials } from '@/lib/utils'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'away'
  glow?: boolean
  verified?: boolean
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
    ...props 
  }, ref) => {
    const sizes = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-lg'
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
          'relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-neon-purple to-neon-pink',
          sizes[size],
          glowClasses,
          className
        )}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
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
        
        {status && (
          <div className={cn(
            'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-dark-900',
            statusColors[status]
          )} />
        )}
        
        {verified && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-blue rounded-full flex items-center justify-center border-2 border-dark-900">
            <span className="text-xs text-dark-900 font-bold">✓</span>
          </div>
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
