import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glow' | 'glow-pink' | 'glow-purple' | 'glow-blue' | 'outline'
  hover?: boolean
  glow?: boolean
  children: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = true, glow = false, children, ...props }, ref) => {
    const baseClasses = "rounded-xl transition-all duration-300"
    
    const variants = {
      default: "bg-dark-800/95 backdrop-blur-sm border border-dark-600/50 shadow-xl",
      glow: "bg-dark-800/95 backdrop-blur-sm border border-dark-600/50 shadow-xl hover:shadow-neon-purple",
      'glow-pink': "bg-dark-800/95 backdrop-blur-sm border border-dark-600/50 shadow-xl hover:border-neon-pink/50 hover:shadow-neon-pink",
      'glow-purple': "bg-dark-800/95 backdrop-blur-sm border border-dark-600/50 shadow-xl hover:border-neon-purple/50 hover:shadow-neon-purple",
      'glow-blue': "bg-dark-800/95 backdrop-blur-sm border border-dark-600/50 shadow-xl hover:border-neon-blue/50 hover:shadow-neon-blue",
      outline: "bg-dark-800/90 border border-dark-600 hover:border-neon-purple shadow-lg"
    }
    
    const hoverClasses = hover ? "hover:scale-105" : ""
    const glowClasses = glow ? "animate-pulse-glow" : ""
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          hoverClasses,
          glowClasses,
          className
        )}
        whileHover={hover ? { scale: 1.02 } : {}}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight text-white", className)}
      {...props}
    >
      {children}
    </h3>
  )
)
CardTitle.displayName = 'CardTitle'

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-gray-400", className)}
      {...props}
    >
      {children}
    </p>
  )
)
CardDescription.displayName = 'CardDescription'

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  )
)
CardContent.displayName = 'CardContent'

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
