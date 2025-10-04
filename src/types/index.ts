// Core User Types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  banner?: string;
  bio?: string;
  status: 'online' | 'offline' | 'away';
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  links?: UserLink[];
  privacy: UserPrivacy;
}

export interface UserLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

export interface UserPrivacy {
  profileVisibility: 'public' | 'friends' | 'private';
  allowDirectMessages: boolean;
  showOnlineStatus: boolean;
  allowTagging: boolean;
}

// Post Types
export interface Post {
  id: string;
  authorId: string;
  author: User;
  content: string;
  media?: Media[];
  type: 'text' | 'image' | 'video' | 'album';
  visibility: 'public' | 'friends' | 'private';
  createdAt: Date;
  updatedAt: Date;
  likes: Like[];
  comments: Comment[];
  shares: Share[];
  reactions: Reaction[];
  tags: string[];
  theme?: string;
  isPinned: boolean;
  aiGenerated?: boolean;
  aiTwinAction?: string;
}

export interface Media {
  id: string;
  url: string;
  type: 'image' | 'video' | 'audio';
  thumbnail?: string;
  duration?: number;
  size: number;
  alt?: string;
}

export interface Like {
  id: string;
  userId: string;
  user: User;
  postId: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: User;
  content: string;
  parentId?: string;
  replies: Comment[];
  likes: Like[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Share {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content?: string;
  createdAt: Date;
}

export interface Reaction {
  id: string;
  userId: string;
  user: User;
  postId: string;
  type: '❤️' | '👍' | '😂' | '😢' | '🔥' | '🤔' | '🎉' | '💯';
  createdAt: Date;
}

// AI Twin Types
export interface AITwin {
  id: string;
  userId: string;
  name: string;
  personality: TwinPersonality;
  capabilities: TwinCapability[];
  isActive: boolean;
  lastActive: Date;
  settings: TwinSettings;
}

export interface TwinPersonality {
  tone: 'casual' | 'professional' | 'friendly' | 'witty' | 'empathetic';
  humor: 'none' | 'light' | 'moderate' | 'high';
  formality: 'very_casual' | 'casual' | 'neutral' | 'formal' | 'very_formal';
  interests: string[];
  communicationStyle: 'concise' | 'detailed' | 'conversational' | 'analytical';
}

export interface TwinCapability {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  settings?: Record<string, any>;
}

export interface TwinSettings {
  autoSummarize: boolean;
  autoDraft: boolean;
  themeAssist: boolean;
  familyLoom: boolean;
  carePings: boolean;
  empathyLens: boolean;
  memoryCapsules: boolean;
  lifePatchNotes: boolean;
  trustTokens: boolean;
}

// Theme Types
export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  effects: ThemeEffects;
  isPublic: boolean;
  createdBy: string;
  downloads: number;
  tags: string[];
  createdAt: Date;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  glow: string;
}

export interface ThemeFonts {
  primary: string;
  secondary: string;
  mono: string;
}

export interface ThemeEffects {
  glow: boolean;
  animations: boolean;
  particles: boolean;
  transitions: boolean;
}

// Social Features Types
export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  follower: User;
  following: User;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'share' | 'follow' | 'mention' | 'ai_twin' | 'system';
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  sender: User;
  content: string;
  media?: Media[];
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageThread {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
  type: 'direct' | 'group';
}

// Novel Social Mechanics
export interface Streak {
  id: string;
  participants: string[];
  type: 'daily' | 'weekly' | 'monthly';
  currentCount: number;
  longestCount: number;
  lastActivity: Date;
  isActive: boolean;
  name: string;
  description: string;
}

export interface DuetThread {
  id: string;
  originalPostId: string;
  originalPost: Post;
  responses: Post[];
  isActive: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export interface MoodSkin {
  id: string;
  name: string;
  description: string;
  theme: Theme;
  participants: string[];
  isActive: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export interface MemoryCapsule {
  id: string;
  userId: string;
  content: string;
  media?: Media[];
  unlockDate: Date;
  isUnlocked: boolean;
  createdAt: Date;
  tags: string[];
  isPublic: boolean;
}

// Family & Intimacy Features
export interface FamilyGroup {
  id: string;
  name: string;
  description: string;
  members: User[];
  admins: string[];
  settings: FamilySettings;
  createdAt: Date;
}

export interface FamilySettings {
  allowKids: boolean;
  requireApproval: boolean;
  sharedMemories: boolean;
  generationsTree: boolean;
  ritualEngine: boolean;
}

export interface GenerationsTree {
  id: string;
  familyId: string;
  interviews: Interview[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Interview {
  id: string;
  interviewerId: string;
  intervieweeId: string;
  questions: Question[];
  responses: Response[];
  createdAt: Date;
  isPublic: boolean;
}

export interface Question {
  id: string;
  text: string;
  category: 'childhood' | 'family' | 'values' | 'memories' | 'advice';
  isRequired: boolean;
}

export interface Response {
  id: string;
  questionId: string;
  content: string;
  media?: Media[];
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface PostForm {
  content: string;
  media?: File[];
  visibility: 'public' | 'friends' | 'private';
  tags: string[];
  theme?: string;
}

export interface CommentForm {
  content: string;
  parentId?: string;
}

// Store Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UIState {
  theme: Theme | null;
  sidebarOpen: boolean;
  notificationsOpen: boolean;
  aiTwinOpen: boolean;
  reducedMotion: boolean;
}

export interface FeedState {
  posts: Post[];
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
  filters: FeedFilters;
}

export interface FeedFilters {
  type: 'all' | 'following' | 'trending' | 'ai_curated';
  timeRange: 'all' | 'today' | 'week' | 'month';
  tags: string[];
  themes: string[];
}
