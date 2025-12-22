
import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navItems = [
    { name: 'Tableau de bord', icon: 'dashboard', path: '/dashboard' },
    { name: 'Factures', icon: 'description', path: '/invoices' },
    { name: 'Lots de fichiers', icon: 'layers', path: '/batches' },
    { name: 'Déposer', icon: 'cloud_upload', path: '/upload' },
    { name: 'Crédits', icon: 'account_balance_wallet', path: '/credits' },
    { name: 'Configuration', icon: 'settings', path: '/configuration' },
  ];

  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen shrink-0 transition-all duration-300 z-50">
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary size-9 rounded-lg flex items-center justify-center text-white">
             <span className="material-symbols-outlined text-xl">account_tree</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-slate-900 dark:text-white text-base font-bold leading-none">InvoFlow</h1>
            <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">Solution CRM</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                isActive 
                  ? 'bg-primary/10 text-primary font-semibold' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`
            }
          >
            <span className={`material-symbols-outlined text-[20px]`}>
              {item.icon}
            </span>
            <p className="text-sm">{item.name}</p>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 mt-4 px-2">
          <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-slate-900 dark:text-white text-xs font-bold truncate">Alex Morgan</p>
            <p className="text-slate-500 text-[10px] truncate uppercase">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
