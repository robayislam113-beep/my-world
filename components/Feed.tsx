import React from 'react';
import { Post, UserProfile } from '../types.ts';
import PostCard from './PostCard.tsx';

interface FeedProps {
  posts: Post[];
  userProfile: UserProfile;
  onLike: (id: string) => void;
  onCompose: () => void;
}

const Feed: React.FC<FeedProps> = ({ posts, userProfile, onLike, onCompose }) => {
  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      <div className="p-4 bg-white dark:bg-dark-bg border-b border-slate-100 dark:border-white/5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100 dark:border-white/10 flex-shrink-0">
          <img src={userProfile.avatar} alt="User" className="w-full h-full object-cover" />
        </div>
        <button 
          onClick={onCompose}
          className="flex-1 h-10 px-4 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex items-center text-slate-500 dark:text-slate-400 text-[15px] font-medium hover:bg-slate-100 dark:hover:bg-white/10 transition active:scale-[0.98]"
        >
          What's on your mind?
        </button>
        <button 
          onClick={onCompose}
          className="p-2 text-green-500 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 5a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2H4zm1 2h14v10H5V7zm3 2a1 1 0 100 2 1 1 0 000-2zm0 6l3-3 2 2 4-4v5H8z" />
          </svg>
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center h-64">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">Your Space</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            No reflections yet. Start your journey today.
          </p>
        </div>
      ) : (
        <>
          {posts.map(post => (
            <PostCard key={post.id} post={post} userProfile={userProfile} onLike={onLike} />
          ))}
          <div className="p-8 text-center text-slate-400 dark:text-slate-600 text-sm italic">
            That's everything for now. You're doing great. 🌿
          </div>
        </>
      )}
    </div>
  );
};

export default Feed;