import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
})

export const metadata: Metadata = {
  title: 'Twinen - The social network that moves with you',
  description: 'Alive, personal, and connected. Your AI Twin helps you weave meaningful connections.',
  keywords: ['social network', 'AI', 'cyberpunk', 'connections', 'AI Twin'],
  authors: [{ name: 'Twinen Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FF10F0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root" className="min-h-screen bg-dark-900">
          {children}
        </div>
      </body>
    </html>
  )
}
