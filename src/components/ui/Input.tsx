import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'cyber' | 'ghost' | 'outline'
  glow?: boolean
  icon?: React.ReactNode
  error?: string
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'cyber', glow = false, icon, error, label, ...props }, ref) => {
    const baseClasses = "flex w-full rounded-lg border transition-all duration-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
    
    const variants = {
      cyber: "bg-dark-700/80 border-dark-600 text-white placeholder-gray-400 focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20",
      ghost: "bg-dark-700/60 border-transparent text-white placeholder-gray-400 focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20",
      outline: "bg-dark-700/60 border-dark-600 text-white placeholder-gray-400 focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
    }
    
    const glowClasses = glow ? "animate-pulse-glow" : ""
    const errorClasses = error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
    
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <motion.input
            ref={ref}
            className={cn(
              baseClasses,
              variants[variant],
              glowClasses,
              errorClasses,
              icon && "pl-12",
              "px-4 py-3",
              className
            )}
            whileFocus={{ scale: 1.02 }}
            {...props}
          />
          {error && (
            <motion.p
              className="text-sm text-red-500 mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'cyber' | 'ghost' | 'outline'
  glow?: boolean
  error?: string
  label?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'cyber', glow = false, error, label, ...props }, ref) => {
    const baseClasses = "flex w-full rounded-lg border transition-all duration-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none"
    
    const variants = {
      cyber: "bg-dark-700/80 border-dark-600 text-white placeholder-gray-400 focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20",
      ghost: "bg-dark-700/60 border-transparent text-white placeholder-gray-400 focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20",
      outline: "bg-dark-700/60 border-dark-600 text-white placeholder-gray-400 focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
    }
    
    const glowClasses = glow ? "animate-pulse-glow" : ""
    const errorClasses = error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
    
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <motion.textarea
          ref={ref}
          className={cn(
            baseClasses,
            variants[variant],
            glowClasses,
            errorClasses,
            "px-4 py-3",
            className
          )}
          whileFocus={{ scale: 1.02 }}
          {...props}
        />
        {error && (
          <motion.p
            className="text-sm text-red-500 mt-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Input, Textarea }
