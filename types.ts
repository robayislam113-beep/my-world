
export interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  banner?: string;
  bio: string;
  followerCount: string;
  followingCount: number;
}

export interface Comment {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  content: string;
  timestamp: number;
  likes: number;
}

export interface Post {
  id: string;
  content: string;
  timestamp: number;
  likes: number;
  reposts: number;
  comments: Comment[];
  isLiked?: boolean;
}

export enum View {
  HOME = 'home',
  PROFILE = 'profile',
  SEARCH = 'search',
  NOTIFICATIONS = 'notifications'
}
