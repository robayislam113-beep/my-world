
import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../types';

interface ComposeModalProps {
  userProfile: UserProfile;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

const ComposeModal: React.FC<ComposeModalProps> = ({ userProfile, onClose, onSubmit }) => {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-white dark:bg-dark-bg flex flex-col animate-in slide-in-from-bottom-full duration-500 ease-out transition-colors duration-300">
      <header className="px-6 h-16 border-b border-slate-50 dark:border-white/5 flex items-center justify-between bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md sticky top-0">
        <button 
          onClick={onClose} 
          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition text-sm font-bold tracking-tight p-2 -ml-2 rounded-full hover:bg-slate-50 dark:hover:bg-white/5"
        >
          Discard
        </button>
        <button 
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="bg-slate-900 dark:bg-white text-white dark:text-dark-bg px-7 py-2 rounded-full font-extrabold text-sm disabled:opacity-20 transition active:scale-95 shadow-xl shadow-slate-100 dark:shadow-none hover:bg-indigo-600 dark:hover:bg-indigo-400"
        >
          Share
        </button>
      </header>
      
      <div className="p-8 flex flex-col items-center max-w-2xl mx-auto w-full">
        <div className="w-full flex gap-5">
          <img src={userProfile.avatar} className="w-12 h-12 rounded-2xl object-cover border border-slate-100 dark:border-white/10 shadow-sm" />
          <div className="flex-1 flex flex-col">
            <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-2">New Reflection</span>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your heart?"
              className="w-full text-xl text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 bg-transparent resize-none outline-none leading-relaxed min-h-[300px] font-medium"
            />
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-slate-50 dark:border-white/5 p-6 flex items-center justify-between bg-slate-50/50 dark:bg-white/2">
        <div className="flex gap-2">
          <ComposeToolButton icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />} />
          <ComposeToolButton icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />} />
          <ComposeToolButton icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />} />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
          <span className={`text-xs font-bold font-mono tracking-tighter ${content.length > 250 ? 'text-rose-500' : 'text-slate-400 dark:text-slate-600'}`}>
            {content.length} <span className="text-[10px] uppercase font-bold text-slate-300 dark:text-slate-700">/ 280</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const ComposeToolButton = ({ icon }: { icon: React.ReactNode }) => (
  <button className="p-2.5 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-100 dark:hover:border-indigo-500/30 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 rounded-xl transition shadow-sm active:scale-95">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icon}
    </svg>
  </button>
);

export default ComposeModal;
