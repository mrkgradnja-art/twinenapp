import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyber' | 'cyber-purple' | 'cyber-blue' | 'cyber-cyan' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  loading?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'cyber', 
    size = 'md', 
    glow = false,
    loading = false,
    icon,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = "relative overflow-hidden font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
    
    const variants = {
      cyber: "bg-transparent border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-dark-900 hover:shadow-neon-pink focus:ring-neon-pink",
      'cyber-purple': "bg-transparent border-2 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-dark-900 hover:shadow-neon-purple focus:ring-neon-purple",
      'cyber-blue': "bg-transparent border-2 border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-dark-900 hover:shadow-neon-blue focus:ring-neon-blue",
      'cyber-cyan': "bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-900 hover:shadow-neon-cyan focus:ring-neon-cyan",
      ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-dark-800 focus:ring-gray-500",
      outline: "bg-transparent border border-dark-600 text-white hover:bg-dark-800 hover:border-neon-purple focus:ring-neon-purple"
    }
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    }
    
    const glowClasses = glow ? "animate-pulse-glow" : ""
    
    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          glowClasses,
          className
        )}
        disabled={disabled || loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
        
        <div className={cn("flex items-center justify-center space-x-2", loading && "opacity-0")}>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
        </div>
        
        {/* Shimmer effect for cyber buttons */}
        {variant.startsWith('cyber') && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full transition-transform duration-700 hover:translate-x-full opacity-20" />
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
