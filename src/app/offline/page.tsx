import { Metadata } from 'next'
import { WifiOff, RefreshCw, Home } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'You are offline | Twinen',
  description: 'Twinen is currently unavailable. Please check your internet connection.',
}

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center p-8">
        <div className="mb-6">
          <div className="mx-auto w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mb-4">
            <WifiOff className="w-12 h-12 text-neon-pink" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">
            You're Offline
          </h1>
          
          <p className="text-gray-400 mb-6">
            It looks like you're not connected to the internet. 
            Don't worry, your data is safe and will sync when you're back online.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => window.location.reload()}
            variant="cyber-purple"
            size="lg"
            className="w-full"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          
          <Button
            onClick={() => window.location.href = '/'}
            variant="ghost"
            size="lg"
            className="w-full"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-dark-700">
          <h3 className="text-sm font-medium text-gray-300 mb-3">
            Available Offline
          </h3>
          
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center justify-between">
              <span>View cached posts</span>
              <span className="text-neon-green">✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Read messages</span>
              <span className="text-neon-green">✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Draft posts</span>
              <span className="text-neon-green">✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Profile settings</span>
              <span className="text-neon-green">✓</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p>
            Twinen works offline! Your posts and messages will be saved locally 
            and synced when you're back online.
          </p>
        </div>
      </Card>
    </div>
  )
}
