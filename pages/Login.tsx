
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex w-full h-screen bg-slate-50 dark:bg-slate-950 items-center justify-center p-6">
      <div className="w-full max-w-[400px] bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="bg-primary size-12 rounded-xl flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-2xl">account_tree</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">InvoFlow CRM</h1>
          <p className="text-slate-500 text-sm text-center">Identifiez-vous pour accéder à votre espace de gestion.</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Email</label>
            <input 
              className="w-full rounded-lg border-slate-200 bg-slate-50 text-sm h-11 px-4 focus:ring-1 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              type="email"
              placeholder="votre@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Mot de passe</label>
              <a href="#" className="text-[11px] text-primary hover:underline">Oublié ?</a>
            </div>
            <input 
              className="w-full rounded-lg border-slate-200 bg-slate-50 text-sm h-11 px-4 focus:ring-1 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full h-11 bg-primary hover:bg-primary-hover text-white font-bold text-sm rounded-lg shadow-md transition-all active:scale-95 mt-2"
          >
            Se connecter
          </button>
        </form>
        
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-500">
            &copy; 2024 InvoFlow CRM. Sécurisé par AES-256.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
