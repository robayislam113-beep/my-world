import React, { useState } from 'react';
import { UserProfile, Post } from '../types.ts';
import PostCard from './PostCard.tsx';

interface ProfileViewProps {
  profile: UserProfile;
  posts: Post[];
  onUpdate: (updated: UserProfile) => void;
  onLike: (id: string) => void;
  onOpenPrivacy: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ profile, posts, onUpdate, onLike, onOpenPrivacy }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);
  const [editedBio, setEditedBio] = useState(profile.bio);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ ...profile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ ...profile, banner: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    onUpdate({ ...profile, name: editedName, bio: editedBio });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col bg-white dark:bg-dark-bg min-h-full transition-colors duration-300">
      <div className="h-44 relative group">
        <div className="w-full h-full overflow-hidden bg-slate-200 dark:bg-slate-800">
          <img 
            src={profile.banner || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'} 
            className="w-full h-full object-cover" 
            alt="Cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <label className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/60 transition opacity-0 group-hover:opacity-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          </svg>
          <input type="file" className="hidden" accept="image/*" onChange={handleBannerChange} />
        </label>
        
        <div className="absolute -bottom-14 left-6 z-20">
          <div className="relative group p-1 bg-white dark:bg-dark-bg rounded-[32px] shadow-lg">
            <div className="overflow-hidden rounded-[28px] w-28 h-28 border-2 border-white dark:border-white/10">
              <img 
                src={profile.avatar} 
                className="w-full h-full object-cover shadow-inner transition-transform duration-500" 
              />
            </div>
            <label className="absolute inset-1 flex items-center justify-center bg-black/30 rounded-[28px] opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300 backdrop-blur-[1px]">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
              <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
            </label>
          </div>
        </div>
      </div>

      <div className="pt-4 px-6 pb-6">
        <div className="flex justify-end gap-2 items-center h-12">
          <button 
            onClick={onOpenPrivacy}
            className="w-10 h-10 flex items-center justify-center border border-slate-100 dark:border-white/10 text-slate-400 dark:text-slate-500 rounded-full hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200 active:scale-90"
            title="Privacy Settings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </button>
          {isEditing ? (
            <button 
              onClick={saveProfile}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold text-sm shadow-lg shadow-indigo-100 dark:shadow-none transition-all duration-200 active:scale-95"
            >
              Save Profile
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-full font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200 active:scale-95"
            >
              Edit Settings
            </button>
          )}
        </div>

        <div className="mt-8">
          {isEditing ? (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div>
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 block">Display Name</label>
                <input 
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full text-xl font-bold text-slate-900 dark:text-white border-b-2 border-slate-100 dark:border-white/5 focus:border-indigo-500 outline-none pb-2 transition-colors bg-transparent"
                  placeholder="What shall we call you?"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 block">Your Sanctuary Bio</label>
                <textarea 
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  className="w-full text-slate-600 dark:text-slate-400 border-b-2 border-slate-100 dark:border-white/5 focus:border-indigo-500 outline-none h-24 resize-none transition-colors py-1 bg-transparent leading-relaxed"
                  placeholder="Share a little about your world..."
                />
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">{profile.name}</h2>
              <p className="text-indigo-500 dark:text-indigo-400 font-semibold text-sm mt-1.5 mb-4 tracking-tight">{profile.handle}</p>
              <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed mb-6 font-[450] max-w-sm">{profile.bio}</p>
            </>
          )}
        </div>

        <div className="flex gap-8 text-sm border-t border-slate-50 dark:border-white/5 pt-4">
          <div className="flex gap-1.5 items-center">
            <span className="font-extrabold text-slate-900 dark:text-white text-base">{profile.followingCount}</span>
            <span className="text-slate-400 dark:text-slate-500 font-medium tracking-tight">Following</span>
          </div>
          <div className="flex gap-1.5 items-center">
            <span className="font-extrabold text-slate-900 dark:text-white text-base">{profile.followerCount}</span>
            <span className="text-slate-400 dark:text-slate-500 font-medium tracking-tight">Followers</span>
          </div>
        </div>
      </div>

      <div className="flex border-b border-slate-100 dark:border-white/5 px-6 mt-2">
        <div className="relative py-4 px-4 font-bold text-slate-900 dark:text-white transition cursor-pointer">
          Reflections
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 dark:bg-indigo-500 rounded-t-full"></div>
        </div>
        <div className="py-4 px-8 font-medium text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 transition cursor-pointer">
          Interactions
        </div>
      </div>

      <div className="flex flex-col pb-24">
        {posts.map(post => (
          <PostCard key={post.id} post={post} userProfile={profile} onLike={onLike} />
        ))}
        {posts.length === 0 && (
          <div className="py-24 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-[20px] flex items-center justify-center text-slate-300 dark:text-slate-700">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-slate-400 dark:text-slate-600 text-sm font-medium">Your sanctuary is ready for its first thought. ✨</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;