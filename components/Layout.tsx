
import React from 'react';
import { View, UserProfile } from '../types';

interface LayoutProps {
  currentView: View;
  setView: (view: View) => void;
  onCompose: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  userProfile: UserProfile;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setView, onCompose, theme, onToggleTheme, userProfile, children }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-dark-bg transition-colors duration-300">
      {/* Header */}
      <header className="px-6 h-20 glass-effect flex items-center justify-between sticky top-0 z-30 border-b border-slate-100/50 dark:border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-[14px] bg-gradient-to-tr from-slate-900 to-indigo-800 flex items-center justify-center text-white font-black text-lg shadow-[0_8px_16px_rgba(0,0,0,0.15)] transform hover:rotate-6 transition-transform">
            W
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tighter text-slate-950 dark:text-white leading-none">MY WORLD</h1>
            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em] mt-1">my own world</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button 
            onClick={onToggleTheme}
            className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition active:scale-90"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
          
          <button 
            onClick={() => setView(View.PROFILE)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ring-1 ring-slate-100 dark:ring-transparent transition hover:scale-105 active:scale-95"
          >
            <img src={userProfile.avatar} alt="profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative bg-white dark:bg-dark-bg">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="h-24 border-t border-slate-100 dark:border-white/5 flex items-center justify-around bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl px-8 pb-6 pt-2">
        <NavButton 
          active={currentView === View.HOME} 
          onClick={() => setView(View.HOME)}
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
        />
        <NavButton 
          active={currentView === View.SEARCH} 
          onClick={() => setView(View.SEARCH)}
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />}
        />
        <NavButton 
          active={currentView === View.NOTIFICATIONS} 
          onClick={() => setView(View.NOTIFICATIONS)}
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />}
        />
        <NavButton 
          active={currentView === View.PROFILE} 
          onClick={() => setView(View.PROFILE)}
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon }) => (
  <button 
    onClick={onClick}
    className={`p-4 rounded-[22px] transition-all duration-500 relative ${active ? 'text-indigo-600 bg-indigo-50/80 dark:bg-indigo-500/10 shadow-inner' : 'text-slate-300 dark:text-slate-600 hover:text-slate-900 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'}`}
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icon}
    </svg>
    {active && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-600 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.5)]"></div>}
  </button>
);

export default Layout;
