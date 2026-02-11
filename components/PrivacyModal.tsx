
import React from 'react';

interface PrivacyModalProps {
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-500">
      <div className="w-full max-w-sm bg-[#0a0c10] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300">
        <header className="p-6 border-b border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg tracking-tight">Security Protocol</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Privacy & Data Notice</p>
          </div>
        </header>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh] no-scrollbar">
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl shadow-inner">
            <h3 className="text-indigo-400 font-bold text-xs mb-3 uppercase tracking-wider">Local Storage Only</h3>
            <p className="text-slate-300 text-[13px] leading-relaxed font-medium">
              To ensure <span className="text-white font-bold">Absolute Privacy</span>, My World does not store any of your data on our servers. Your posts, profile, and images are saved <span className="text-indigo-300">exclusively</span> within your browser's internal memory.
            </p>
          </div>

          <ul className="space-y-4">
            <li className="flex gap-4 group">
              <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
              <p className="text-slate-200 text-[13px] font-semibold leading-snug">Clearing browser cache or site data will permanently erase all your content.</p>
            </li>
            <li className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-slate-700 mt-1.5 shrink-0"></div>
              <p className="text-slate-400 text-[13px] leading-snug">Data is not synchronized across devices. Your reflections live only on this specific device.</p>
            </li>
            <li className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-slate-700 mt-1.5 shrink-0"></div>
              <p className="text-slate-400 text-[13px] leading-snug">Since we do not have server access, we cannot recover your data if it is lost or deleted.</p>
            </li>
          </ul>
        </div>

        <footer className="p-6 border-t border-white/5 bg-white/2">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-white text-slate-950 hover:bg-slate-200 rounded-2xl font-extrabold text-sm transition-all duration-300 shadow-xl active:scale-[0.97]"
          >
            I Acknowledge & Understand
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyModal;
