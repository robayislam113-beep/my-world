
import React, { useState, useEffect, useCallback } from 'react';
import { View, Post, UserProfile } from './types';
import Feed from './components/Feed';
import ProfileView from './components/ProfileView';
import Layout from './components/Layout';
import ComposeModal from './components/ComposeModal';
import PrivacyModal from './components/PrivacyModal';
import { generateSupportiveComments } from './services/gemini';

const INITIAL_PROFILE: UserProfile = {
  name: 'Dreamer',
  handle: '@myworld_user',
  avatar: 'https://picsum.photos/seed/myworld/200/200',
  banner: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  bio: 'This is my private sanctuary for thoughts and reflections. ✨',
  followerCount: '1.2M',
  followingCount: 142
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [posts, setPosts] = useState<Post[]>([]);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('mw_theme') as 'light' | 'dark') || 'light';
  });

  // Handle Theme switching
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('mw_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // Persistence
  useEffect(() => {
    const savedPosts = localStorage.getItem('mw_posts');
    const savedProfile = localStorage.getItem('mw_profile');
    
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile({ ...INITIAL_PROFILE, ...parsed });
    }
    
    if (!savedPosts || JSON.parse(savedPosts).length === 0) {
      setIsPrivacyOpen(true);
    }
    
    setIsInitializing(false);
  }, []);

  useEffect(() => {
    if (!isInitializing) {
      localStorage.setItem('mw_posts', JSON.stringify(posts));
      localStorage.setItem('mw_profile', JSON.stringify(profile));
    }
  }, [posts, profile, isInitializing]);

  const handleCreatePost = async (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      timestamp: Date.now(),
      likes: Math.floor(Math.random() * 15000) + 5000,
      reposts: Math.floor(Math.random() * 3000) + 500,
      comments: [],
      isLiked: false
    };

    setPosts(prev => [newPost, ...prev]);
    setIsComposeOpen(false);

    const aiComments = await generateSupportiveComments(content);
    setPosts(prev => prev.map(p => 
      p.id === newPost.id ? { ...p, comments: aiComments } : p
    ));
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => 
      p.id === postId ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setProfile(updated);
  };

  if (isInitializing) return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-white dark:bg-dark-bg shadow-xl relative overflow-hidden border-x border-slate-100 dark:border-white/5 transition-colors duration-300">
      <Layout 
        currentView={currentView} 
        setView={setCurrentView} 
        onCompose={() => setIsComposeOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        userProfile={profile}
      >
        {currentView === View.HOME && (
          <Feed 
            posts={posts} 
            userProfile={profile} 
            onLike={handleLikePost} 
            onCompose={() => setIsComposeOpen(true)} 
          />
        )}
        {currentView === View.PROFILE && (
          <ProfileView 
            profile={profile} 
            posts={posts} 
            onUpdate={handleUpdateProfile} 
            onLike={handleLikePost}
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
          />
        )}
        {(currentView === View.SEARCH || currentView === View.NOTIFICATIONS) && (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 px-6 text-center">
            <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-full mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-1">Coming Soon</h3>
            <p className="text-sm dark:text-slate-500">This space is being curated for your peace of mind.</p>
          </div>
        )}
      </Layout>

      {isComposeOpen && (
        <ComposeModal 
          userProfile={profile} 
          onClose={() => setIsComposeOpen(false)} 
          onSubmit={handleCreatePost} 
        />
      )}

      {isPrivacyOpen && (
        <PrivacyModal onClose={() => setIsPrivacyOpen(false)} />
      )}
    </div>
  );
};

export default App;
