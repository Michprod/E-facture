
import React, { useState } from 'react';

interface SettingsProps {
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'GENERAL' | 'BILLING' | 'USERS' | 'EUF'>('GENERAL');

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight mb-2">Paramètres de l'entreprise</h1>
        <p className="text-slate-500 text-base max-w-2xl">Gérez les informations de l'entreprise, les contacts et la sécurité.</p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex border-b border-slate-200 dark:border-slate-800 min-w-max">
          <button 
            onClick={() => setActiveTab('GENERAL')}
            className={`flex items-center gap-2 border-b-[3px] px-1 pb-3 pt-2 font-bold text-sm transition-all mr-8 ${activeTab === 'GENERAL' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <span className="material-symbols-outlined text-[20px]">business</span>
            Informations générales
          </button>
          <button 
            onClick={() => setActiveTab('USERS')}
            className={`flex items-center gap-2 border-b-[3px] px-1 pb-3 pt-2 font-bold text-sm transition-all mr-8 ${activeTab === 'USERS' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <span className="material-symbols-outlined text-[20px]">group</span>
            Gestion des utilisateurs
          </button>
          <button 
            onClick={() => setActiveTab('EUF')}
            className={`flex items-center gap-2 border-b-[3px] px-1 pb-3 pt-2 font-bold text-sm transition-all mr-8 ${activeTab === 'EUF' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            <span className="material-symbols-outlined text-[20px]">key</span>
            Identifiants e-UF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          {activeTab === 'GENERAL' && (
            <section className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6">
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                <div className="size-24 rounded-xl border border-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/company/200')" }}></div>
                <div className="flex flex-col gap-1">
                  <p className="text-slate-900 dark:text-white text-lg font-bold">Logo de l'entreprise</p>
                  <button className="mt-2 text-primary text-sm font-bold hover:underline self-start">Mettre à jour le logo</button>
                </div>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Raison sociale</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm" type="text" defaultValue="Acme Industries Ltd." />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">N° TVA / Identifiant fiscal</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm" type="text" defaultValue="US-99283812" />
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-sm font-medium">Adresse</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm" type="text" defaultValue="1200 Innovation Way, San Francisco" />
                </div>
                <div className="flex justify-end md:col-span-2 mt-4">
                  <button type="button" className="bg-primary text-white px-6 py-2 rounded-lg font-bold">Enregistrer</button>
                </div>
              </form>
            </section>
          )}

          {activeTab === 'USERS' && (
            <section className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                 <h3 className="font-bold text-slate-900 dark:text-white">Membres de l'équipe</h3>
                 <button className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                   <span className="material-symbols-outlined text-sm">add</span> Ajouter
                 </button>
               </div>
               <table className="w-full text-left text-sm">
                 <thead className="bg-slate-50 dark:bg-slate-800/50">
                   <tr>
                     <th className="px-6 py-4 font-semibold">Utilisateur</th>
                     <th className="px-6 py-4 font-semibold">Rôle</th>
                     <th className="px-6 py-4 font-semibold text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                   <tr>
                     <td className="px-6 py-4 flex items-center gap-3">
                        <div className="size-8 rounded-full bg-slate-200"></div>
                        <div>
                          <p className="font-bold">Alex Morgan</p>
                          <p className="text-xs text-slate-500">alex@acme.com</p>
                        </div>
                     </td>
                     <td className="px-6 py-4">Administrateur</td>
                     <td className="px-6 py-4 text-right">
                       <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                     </td>
                   </tr>
                 </tbody>
               </table>
            </section>
          )}

          {activeTab === 'EUF' && (
            <section className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">key</span>
                Configuration de l'API
              </h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 mb-6">
                 <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">Connexion sécurisée</p>
                 <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Les identifiants sont stockés avec un chiffrement AES-256. Pour des raisons de sécurité, le secret est masqué.</p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">ID client</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-900 font-mono text-sm" type="text" readOnly value="euf_live_882910_abx" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Secret client</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-900 font-mono text-sm" type="password" value="••••••••••••••••" />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                   <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold">Vérifier</button>
                   <button className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm">Mettre à jour</button>
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <h3 className="text-sm font-bold mb-4">Actions du compte</h3>
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
