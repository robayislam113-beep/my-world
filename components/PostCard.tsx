import React, { useState } from 'react';
import { Post, UserProfile, Comment } from '../types.ts';

interface PostCardProps {
  post: Post;
  userProfile: UserProfile;
  onLike: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, userProfile, onLike }) => {
  const [showComments, setShowComments] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
  };

  const CommentItem = ({ comment, isFirst = false }: { comment: Comment; isFirst?: boolean }) => (
    <div className={`flex gap-4 group ${isFirst ? 'animate-in fade-in slide-in-from-top-2 duration-700' : ''}`}>
      <div className="shrink-0 pt-1">
        <img 
          src={comment.authorAvatar} 
          className="w-9 h-9 rounded-[14px] border border-slate-100 dark:border-white/10 shadow-sm" 
          alt={comment.authorName}
        />
      </div>
      <div className={`p-4 rounded-[20px] rounded-tl-none flex-1 border transition-colors ${
        isFirst 
          ? 'bg-indigo-50/40 dark:bg-indigo-500/5 border-indigo-100/50 dark:border-indigo-500/10' 
          : 'bg-slate-50/80 dark:bg-white/5 border-slate-100 dark:border-white/5 group-hover:bg-indigo-50/30 dark:group-hover:bg-indigo-500/5'
      }`}>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-extrabold text-slate-900 dark:text-slate-200 tracking-tight">
            {comment.authorName} {isFirst && <span className="ml-1 text-[10px] text-indigo-500 dark:text-indigo-400 font-black uppercase tracking-widest">● Top Fan</span>}
          </span>
          <span className="text-[9px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest">{timeAgo(comment.timestamp)}</span>
        </div>
        <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-[450]">{comment.content}</p>
      </div>
    </div>
  );

  return (
    <div className="border-b border-slate-50 dark:border-white/5 p-6 animate-feed-item bg-white dark:bg-dark-bg hover:bg-slate-50/40 dark:hover:bg-white/2 transition-all duration-300">
      <div className="flex gap-4 mb-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-[18px] overflow-hidden border border-slate-100 dark:border-white/10 shadow-sm">
            <img 
              src={userProfile.avatar} 
              alt={userProfile.name} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
            />
          </div>
        </div>
        <div className="flex flex-col min-w-0 justify-center">
          <span className="font-extrabold text-slate-900 dark:text-slate-100 leading-none truncate tracking-tight">{userProfile.name}</span>
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1.5">
            <span>{timeAgo(post.timestamp)}</span>
            <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700"></span>
            <span className="text-indigo-400 dark:text-indigo-500">Reflection</span>
          </div>
        </div>
      </div>

      <p className="text-[16px] text-slate-800 dark:text-slate-300 leading-relaxed mb-6 whitespace-pre-wrap break-words font-[450] tracking-tight">
        {post.content}
      </p>

      <div className="flex items-center justify-between py-2 border-t border-slate-50 dark:border-white/5">
        <div className="flex -space-x-2">
           <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white ring-2 ring-white dark:ring-dark-bg shadow-md">
             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg>
           </div>
           <div className="w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white ring-2 ring-white dark:ring-dark-bg shadow-md">
             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
           </div>
           <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white ring-2 ring-white dark:ring-dark-bg shadow-md">
             <span className="text-[10px]">✨</span>
           </div>
        </div>
        <div className="flex gap-4 text-slate-400 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider">
          <span 
            onClick={() => setShowComments(!showComments)}
            className="hover:text-slate-600 dark:hover:text-slate-300 transition cursor-pointer"
          >
            {post.comments.length} comments
          </span>
          <span className="hover:text-slate-600 dark:hover:text-slate-300 transition cursor-pointer">{formatNumber(post.reposts)} ripples</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between gap-2 mt-2">
        <PostAction 
          active={post.isLiked} 
          onClick={() => onLike(post.id)}
          activeColor="text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400"
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.708C19.743 10 20.5 10.895 20.5 12c0 .412-.125.825-.375 1.125L16.5 19.5a1.5 1.5 0 01-1.25.5H8.5a1 1 0 01-1-1v-8.5l3.5-3.5L12.5 5.5a1 1 0 011.5 1V10zM7.5 20.5a1 1 0 01-1-1v-10a1 1 0 011-1H4a1 1 0 00-1 1v10a1 1 0 001 1h3.5z" />}
          label="Support"
        />
        
        <PostAction 
          active={showComments}
          onClick={() => setShowComments(!showComments)}
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />}
          label="Connect"
        />

        <PostAction 
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />}
          label="Ripple"
        />
      </div>

      <div className="mt-6 space-y-4">
        {post.comments.length === 0 ? (
          <div className="py-4 flex items-center gap-4 animate-pulse">
            <div className="w-9 h-9 bg-slate-100 dark:bg-white/5 rounded-[14px]"></div>
            <div className="flex-1 space-y-2">
              <div className="h-2 bg-slate-100 dark:bg-white/5 rounded w-1/4"></div>
              <div className="h-2 bg-slate-100 dark:bg-white/5 rounded w-3/4"></div>
            </div>
          </div>
        ) : (
          <>
            <CommentItem comment={post.comments[0]} isFirst={true} />
            
            {showComments && post.comments.slice(1).map(comment => (
              <div key={comment.id} className="animate-in slide-in-from-top-4 duration-500">
                <CommentItem comment={comment} />
              </div>
            ))}

            {post.comments.length > 1 && !showComments && (
              <button 
                onClick={() => setShowComments(true)}
                className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest pl-14 hover:underline transition"
              >
                View {post.comments.length - 1} more supportive responses
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const PostAction = ({ active, onClick, icon, label, activeColor }: any) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 rounded-2xl transition-all duration-300 active:scale-95 border border-transparent ${active ? (activeColor || 'text-indigo-600 font-extrabold bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20') : 'text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-300'}`}
  >
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icon}
    </svg>
    <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
  </button>
);

export default PostCard;