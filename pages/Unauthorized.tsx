
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const location = useLocation();
  const from = (location.state as any)?.from as string | undefined;

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">lock</span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Accès non autorisé</h1>
            <p className="text-slate-500 text-sm mt-1">
              Vous n’avez pas la permission d’accéder à cette fonctionnalité.
            </p>
            {from ? (
              <p className="text-slate-400 text-xs mt-2 font-mono">Chemin : {from}</p>
            ) : null}

            <div className="flex flex-wrap gap-2 mt-6">
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-all"
              >
                Retour au tableau de bord
              </Link>
              <Link
                to="/configuration"
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-50 transition-all"
              >
                Aller à la configuration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
