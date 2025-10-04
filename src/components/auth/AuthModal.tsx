'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { LoginForm as LoginFormType, RegisterForm as RegisterFormType } from '@/types'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'login' | 'register'
  onLogin?: (data: LoginFormType) => void
  onRegister?: (data: RegisterFormType) => void
  isLoading?: boolean
  error?: string
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
  onLogin,
  onRegister,
  isLoading = false,
  error
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode)

  const handleLogin = (data: LoginFormType) => {
    onLogin?.(data)
  }

  const handleRegister = (data: RegisterFormType) => {
    onRegister?.(data)
  }

  const switchToLogin = () => setMode('login')
  const switchToRegister = () => setMode('register')

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
          className="absolute inset-0 flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full max-w-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute -top-12 right-0 text-gray-400 hover:text-white z-10"
            >
              <X className="w-5 h-5" />
            </Button>

            <AnimatePresence mode="wait">
              {mode === 'login' ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginForm
                    onSubmit={handleLogin}
                    isLoading={isLoading}
                    error={error}
                    onSwitchToRegister={switchToRegister}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <RegisterForm
                    onSubmit={handleRegister}
                    isLoading={isLoading}
                    error={error}
                    onSwitchToLogin={switchToLogin}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AuthModal
