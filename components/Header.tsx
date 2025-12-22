
import React from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 dark:border-slate-800 dark:bg-slate-900 shrink-0 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden text-slate-500">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">Espace de travail</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
          <input 
            className="h-9 w-64 rounded-lg border-slate-200 bg-slate-50 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white" 
            placeholder="Rechercher..." 
            type="text"
          />
        </div>
        
        <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
        </button>
        
        <div className="h-8 w-8 rounded-full border border-slate-200 overflow-hidden cursor-pointer">
          <img src="https://picsum.photos/seed/user/100" alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};

export default Header;
