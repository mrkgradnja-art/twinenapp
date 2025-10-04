# Twinen - The Social Network That Moves With You

> **"Alive, personal, and connected. Your AI Twin helps you weave meaningful connections."**

Twinen is a revolutionary social network that combines cyberpunk aesthetics with AI-powered features to create deeper, more meaningful connections. Built with Next.js, TypeScript, and Tailwind CSS, featuring a stunning neon cyberpunk design system.

## ✨ Features

### 🤖 AI Twin Powers
- **Feed Summarizer**: Get daily highlights and important mentions
- **Post Drafter**: AI generates posts in your unique voice and style
- **Theme Assistant**: Instantly preview and apply cyberpunk themes
- **Smart Notifications**: AI-curated notifications that matter

### 🔥 Novel Social Mechanics
- **Collective Streaks**: Build habits together with friends and family
- **Duet Threads**: Side-by-side responses like TikTok duets for richer conversations
- **Mood Skins**: Themed skins applied across friend groups for shared vibes
- **Memory Capsules**: Lock posts until future, AI creates then-vs-now recaps

### 👨‍👩‍👧‍👦 Family & Intimacy Features
- **Home Channel**: Auto-collects family/friends' shared posts into nightly "radio"
- **Generations Tree**: Kids + grandparents record prompted Q&A → builds living family archive
- **Micro-Visits**: 15-sec video "doorbells" → stitched into 1-min conversations
- **Little Wins**: AI detects micro-achievements → triggers circle celebrations

### 🎨 Cyberpunk Design System
- **Neon Color Palette**: Pink, purple, blue, and cyan neon highlights
- **Dark UI**: Deep black backgrounds with glowing borders
- **Animated Transitions**: Smooth, futuristic animations
- **Accessibility**: WCAG-safe palettes and reduced motion support

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **State Management**: Zustand
- **Real-time**: WebSocket support
- **Authentication**: JWT-based auth system

## 🎯 Core Identity

**Name**: Twinen (suggests "twin" + "woven" → your AI Twin + woven connections)

**Tagline**: "The social network that moves with you — alive, personal, and connected."

**Theme**: Neon cyberpunk meets human warmth. Dark UI with glowing highlights.

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/twinen.git
   cd twinen
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your environment variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   OPENAI_API_KEY=your-openai-key
   DATABASE_URL=your-database-url
   JWT_SECRET=your-jwt-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Color Palette
```css
/* Neon Colors */
--neon-pink: #FF10F0
--neon-purple: #8B5CF6
--neon-blue: #06B6D4
--neon-cyan: #00FFFF

/* Dark Backgrounds */
--dark-900: #0A0A0A
--dark-800: #1A1A1A
--dark-700: #2A2A2A
--dark-600: #3A3A3A
```

### Typography
- **Primary Font**: Inter (clean, modern)
- **Cyber Font**: Orbitron (futuristic, for headings)

### Components
- **Buttons**: Cyber-themed with glow effects
- **Cards**: Glass-morphism with neon borders
- **Inputs**: Dark with neon focus states
- **Avatars**: Gradient backgrounds with status indicators

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ai-twin/          # AI Twin features
│   ├── auth/             # Authentication
│   ├── family/           # Family features
│   ├── realtime/         # Real-time features
│   ├── social/           # Social features
│   └── ui/               # Base UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── store/                # State management
└── types/                # TypeScript types
```

## 🤖 AI Twin Features

### Feed Summarizer
- Analyzes your social activity
- Identifies key moments and trends
- Provides personalized insights
- Generates daily/weekly summaries

### Post Drafter
- Generates posts in your unique voice
- Multiple tone options (casual, professional, witty)
- Style customization (concise, detailed, conversational)
- Real-time preview and editing

### Theme Assistant
- Instant theme previews
- Cyberpunk, Matrix, Synthwave themes
- Live preview with your content
- One-click theme application

## 🔥 Social Mechanics

### Collective Streaks
- Group habit building
- Visual progress tracking
- Achievement celebrations
- Social accountability

### Duet Threads
- Side-by-side responses
- Video conversation threads
- Playback controls
- Engagement tracking

### Memory Capsules
- Time-locked posts
- Future self reflections
- AI-generated comparisons
- Emotional journey tracking

## 👨‍👩‍👧‍👦 Family Features

### Home Channel
- Family post aggregation
- Highlighted moments
- Real-time updates
- Privacy controls

### Generations Tree
- Interview recording system
- Question templates
- Response playback
- Family history preservation

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify` - Email verification

### Posts
- `GET /api/posts` - Get posts with filtering
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### AI Twin
- `POST /api/ai/summarize` - Generate feed summary
- `POST /api/ai/draft` - Generate post draft
- `POST /api/ai/theme` - Apply theme

### Real-time
- WebSocket connection for live updates
- Notification streaming
- Real-time collaboration

## 🎨 Customization

### Themes
Create custom themes by extending the base theme:

```typescript
const customTheme = {
  colors: {
    primary: '#your-color',
    secondary: '#your-color',
    // ... other colors
  },
  fonts: {
    primary: 'Your-Font',
    // ... other fonts
  }
}
```

### Components
All components are fully customizable with props:

```tsx
<Button 
  variant="cyber-purple" 
  size="lg" 
  glow={true}
  loading={false}
>
  Custom Button
</Button>
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

### Docker
```bash
docker build -t twinen .
docker run -p 3000:3000 twinen
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by cyberpunk aesthetics and human-centered design
- Built with love for meaningful social connections
- Special thanks to the open-source community

## 📞 Support

- 📧 Email: support@twinen.com
- 💬 Discord: [Join our community](https://discord.gg/twinen)
- 📖 Documentation: [docs.twinen.com](https://docs.twinen.com)

---

**Built with ❤️ and neon lights by the Twinen team**

*"The future of social networking is here, and it's beautifully cyberpunk."*
"# twinenapp" 
