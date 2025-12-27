import React, { useEffect, useState } from 'react';
import { MOCK_USERS, MOCK_CLIENTS, MOCK_ARTICLES, MOCK_NIDS } from '../constants';
import { ALL_PERMISSIONS, getCurrentRole, getUserPermissionOverrides, setCurrentRole, setUserPermissionOverrides } from '../permissions';

interface ConfigurationProps {
  onLogout: () => void;
}

const Configuration: React.FC<ConfigurationProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'COMPTE' | 'UTILISATEURS' | 'CLIENTS' | 'ARTICLES' | 'NID' | 'PROFIL' | 'EUF'>('COMPTE');
  const [showModal, setShowModal] = useState<string | null>(null);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchType, setBatchType] = useState<'CLIENT' | 'ARTICLE' | 'NID'>('CLIENT');
  const [batchFile, setBatchFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [roleDraft, setRoleDraft] = useState(getCurrentRole());
  const [permissionOverridesDraft, setPermissionOverridesDraft] = useState<string[]>(getUserPermissionOverrides());

  useEffect(() => {
    setRoleDraft(getCurrentRole());
    setPermissionOverridesDraft(getUserPermissionOverrides());
  }, []);

  const renderAccount = () => (
    <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 p-6 space-y-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="size-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
           <span className="material-symbols-outlined text-3xl">person</span>
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Profil Personnel</h3>
          <p className="text-slate-500 text-xs">Gérez vos identifiants et informations de sécurité.</p>
        </div>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Nom Complet</label>
          <input className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-10 px-3" type="text" defaultValue="Alex Morgan" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Email professionnel</label>
          <input className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-10 px-3" type="email" defaultValue="alex@company.com" />
        </div>
        <div className="flex flex-col gap-1.5 md:col-span-2">
           <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Mot de passe</label>
           <input className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-10 px-3" type="password" placeholder="Changer mon mot de passe" />
        </div>
        <button className="md:col-span-2 bg-primary hover:bg-primary-hover text-white font-bold py-2.5 rounded-lg mt-2 transition-all text-sm">
          Mettre à jour le profil
        </button>
      </form>
    </div>
  );

  const renderBatchModal = () => {
    if (!showBatchModal) return null;

    const batchTitle = batchType === 'ARTICLE' ? 'Import de produits & services' : batchType === 'NID' ? 'Import N.I.D par lot' : 'Création de clients par lot';

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-xl p-6 shadow-2xl border dark:border-slate-800">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-base font-bold">{batchTitle}</h3>
            <button
              onClick={() => {
                setShowBatchModal(false);
                setBatchFile(null);
                setIsDragging(false);
              }}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          <div
            className={`group relative flex w-full flex-col items-center justify-center rounded-[2.5rem] border-4 border-dashed bg-white dark:bg-slate-900 p-12 text-center transition-all duration-500 cursor-pointer overflow-hidden ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-slate-200 dark:border-slate-800 hover:border-primary hover:bg-primary/5'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files?.[0] || null;
              if (file) setBatchFile(file);
            }}
          >
            <input
              type="file"
              accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setBatchFile(file);
              }}
            />

            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 group-hover:bg-primary/30 transition-all duration-500"></div>
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-white shadow-2xl group-hover:scale-110 transition-all duration-500">
                <span className="material-symbols-outlined text-[42px] filled">cloud_upload</span>
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Glissez votre fichier CSV / Excel ici</h3>
            <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto leading-relaxed text-sm">Format autorisé : CSV, XLS, XLSX.</p>

            <button className="rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 text-xs font-black shadow-2xl transition-all">
              Parcourir les fichiers
            </button>
          </div>

          {batchFile && (
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-slate-500">description</span>
                <span className="text-sm text-slate-700 dark:text-slate-300 truncate">{batchFile.name}</span>
              </div>
              <button onClick={() => setBatchFile(null)} className="text-slate-400 hover:text-rose-500 transition-colors">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-5">
            <button
              onClick={() => {
                setShowBatchModal(false);
                setBatchFile(null);
                setIsDragging(false);
              }}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
            >
              Annuler
            </button>
            <button
              disabled={!batchFile}
              onClick={() => {
                setShowBatchModal(false);
                setBatchFile(null);
                setIsDragging(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold text-white transition-all ${
                batchFile ? 'bg-primary hover:bg-primary-hover' : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              Importer
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!showModal) return null;
    const titles: any = { 'USER': 'Ajouter un utilisateur', 'CLIENT': 'Ajouter un client', 'ARTICLE': 'Nouveau Produit / Service', 'NID': 'Nouveau N.I.D' };
    
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-xl p-6 shadow-2xl border dark:border-slate-800">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-base font-bold">{titles[showModal]}</h3>
            <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(null); }}>
            {showModal === 'USER' && (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Nom complet</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 h-10 px-3 text-sm" placeholder="Ex: Jean Dupont" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Email</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 h-10 px-3 text-sm" type="email" placeholder="email@exemple.com" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Rôle</label>
                  <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 h-10 px-3 text-sm">
                    <option>ADMIN</option>
                    <option>UTILISATEUR</option>
                    <option>LECTEUR</option>
                  </select>
                </div>
              </>
            )}
            {showModal === 'CLIENT' && (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Raison sociale</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 h-10 px-3 text-sm" placeholder="Nom de l'entreprise" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Email de facturation</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 h-10 px-3 text-sm" type="email" placeholder="billing@client.com" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Ville / Adresse</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 h-10 px-3 text-sm" placeholder="Paris, France" />
                </div>
              </>
            )}
            {showModal === 'ARTICLE' && (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Désignation du produit</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 h-10 px-3 text-sm" placeholder="Ex: Consulting Heure" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Code Produit / Réf</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 h-10 px-3 text-sm" placeholder="Ex: SERV-01" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Tarif Unitaire HT</label>
                  <div className="relative">
                    <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 h-10 px-3 pr-8 text-sm" type="number" step="0.01" placeholder="0.00" required />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">€</span>
                  </div>
                </div>
              </>
            )}
            {showModal === 'NID' && (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Libellé</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 h-10 px-3 text-sm" placeholder="Ex: Siège social" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Adresse</label>
                  <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 h-10 px-3 text-sm" placeholder="Ex: 123 Rue..., 75000" required />
                </div>
              </>
            )}
            <button type="submit" className="w-full py-2.5 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-primary-hover transition-all mt-4 text-sm">
              Confirmer l'ajout
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderNidList = () => (
    <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">N.I.D</h3>
          <p className="text-[10px] text-slate-400">{MOCK_NIDS.length} enregistrement(s)</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setBatchType('NID');
              setShowBatchModal(true);
            }}
            className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[11px] font-bold rounded-lg flex items-center gap-1 hover:bg-slate-50 transition-all"
          >
            <span className="material-symbols-outlined text-sm">upload_file</span>
            Import
          </button>
          <button
            onClick={() => setShowModal('NID')}
            className="px-3 py-1.5 bg-primary text-white text-[11px] font-bold rounded-lg flex items-center gap-1 hover:bg-primary-hover transition-all"
          >
            <span className="material-symbols-outlined text-sm">add</span> Ajouter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800 text-slate-500 uppercase tracking-widest font-bold">
            <tr>
              <th className="px-5 py-3 text-[10px]">Libellé</th>
              <th className="px-5 py-3 text-[10px]">Adresse</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-800">
            {MOCK_NIDS.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">{item.label}</td>
                <td className="px-5 py-3.5 text-slate-500">{item.address}</td>
                <td className="px-5 py-3.5 text-right space-x-2">
                  <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                  <button className="text-slate-400 hover:text-rose-500 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProfilPermissions = () => (
    <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 p-6 space-y-6 shadow-sm">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Profil & permissions</h3>
        <p className="text-slate-500 text-xs">Gérez votre rôle et vos droits d'accès.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Rôle</label>
          <select
            className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-10 px-3"
            value={roleDraft}
            onChange={(e) => setRoleDraft(e.target.value as any)}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="EDITEUR">EDITEUR</option>
            <option value="LECTEUR">LECTEUR</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Permissions additionnelles</label>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 p-3 space-y-2">
            {ALL_PERMISSIONS.map((p) => (
              <label key={p} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200 font-semibold">
                <input
                  type="checkbox"
                  checked={permissionOverridesDraft.includes(p)}
                  onChange={(e) => {
                    setPermissionOverridesDraft((prev) => {
                      if (e.target.checked) return Array.from(new Set([...prev, p]));
                      return prev.filter(x => x !== p);
                    });
                  }}
                />
                {p}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setCurrentRole(roleDraft as any);
            setUserPermissionOverrides(permissionOverridesDraft as any);
          }}
          className="bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-4 rounded-lg transition-all text-sm"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );

  const renderList = (title: string, data: any[], type: 'USER' | 'CLIENT' | 'ARTICLE') => (
    <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">{title}</h3>
          <p className="text-[10px] text-slate-400">{data.length} enregistrement(s)</p>
        </div>
        <div className="flex items-center gap-2">
          {type === 'CLIENT' && (
            <button
              onClick={() => {
                setBatchType('CLIENT');
                setShowBatchModal(true);
              }}
              className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[11px] font-bold rounded-lg flex items-center gap-1 hover:bg-slate-50 transition-all"
            >
              <span className="material-symbols-outlined text-sm">upload_file</span>
              Création par lot
            </button>
          )}
          {type === 'ARTICLE' && (
            <button
              onClick={() => {
                setBatchType('ARTICLE');
                setShowBatchModal(true);
              }}
              className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[11px] font-bold rounded-lg flex items-center gap-1 hover:bg-slate-50 transition-all"
            >
              <span className="material-symbols-outlined text-sm">upload_file</span>
              Import
            </button>
          )}
          <button 
            onClick={() => setShowModal(type)}
            className="px-3 py-1.5 bg-primary text-white text-[11px] font-bold rounded-lg flex items-center gap-1 hover:bg-primary-hover transition-all"
          >
            <span className="material-symbols-outlined text-sm">add</span> Ajouter
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800 text-slate-500 uppercase tracking-widest font-bold">
            <tr>
              <th className="px-5 py-3 text-[10px]">Désignation / Nom</th>
              <th className="px-5 py-3 text-[10px]">{type === 'ARTICLE' ? 'Code Réf.' : 'Identifiant'}</th>
              <th className="px-5 py-3 text-[10px]">{type === 'ARTICLE' ? 'Prix HT' : 'Statut / Rôle'}</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-800">
            {data.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">{item.name}</td>
                <td className="px-5 py-3.5 text-slate-500 font-mono text-[11px]">{item.code || item.email}</td>
                <td className="px-5 py-3.5">
                  {item.price ? (
                    <span className="font-bold text-slate-900 dark:text-white">{item.price.toFixed(2)}€</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[9px] font-bold uppercase tracking-tight">{item.role || 'Contact'}</span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-right space-x-2">
                  <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                  <button className="text-slate-400 hover:text-rose-500 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      {renderBatchModal()}
      {renderModal()}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black tracking-tight mb-0.5 text-slate-900 dark:text-white">Paramètres Généraux</h1>
          <p className="text-slate-500 text-sm">Gérez les données de votre entreprise et de vos collaborateurs.</p>
        </div>
        <button onClick={onLogout} className="px-3 py-1.5 bg-rose-50 text-rose-600 font-bold text-xs rounded-lg flex items-center gap-1.5 hover:bg-rose-100 transition-all">
          <span className="material-symbols-outlined text-sm">logout</span> Déconnexion
        </button>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'COMPTE', label: 'Mon Compte', icon: 'person' },
          { id: 'UTILISATEURS', label: 'Utilisateurs', icon: 'group' },
          { id: 'CLIENTS', label: 'Clients', icon: 'badge' },
          { id: 'ARTICLES', label: 'Produits & Services', icon: 'inventory_2' },
          { id: 'NID', label: 'N.I.D', icon: 'id_card' },
          { id: 'PROFIL', label: 'Profil & permissions', icon: 'admin_panel_settings' },
          { id: 'EUF', label: 'Connexion e-UF', icon: 'key' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 ${activeTab === tab.id ? 'bg-primary text-white shadow-sm' : 'bg-white dark:bg-slate-900 text-slate-500 border border-slate-100 dark:border-slate-800 hover:bg-slate-50'}`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="w-full">
        {activeTab === 'COMPTE' && renderAccount()}
        {activeTab === 'UTILISATEURS' && renderList('Gestion des Utilisateurs', MOCK_USERS, 'USER')}
        {activeTab === 'CLIENTS' && renderList('Fichier Clients', MOCK_CLIENTS, 'CLIENT')}
        {activeTab === 'ARTICLES' && renderList('Catalogue Produits & Services', MOCK_ARTICLES, 'ARTICLE')}
        {activeTab === 'NID' && renderNidList()}
        {activeTab === 'PROFIL' && renderProfilPermissions()}
        {activeTab === 'EUF' && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 p-6 space-y-6 shadow-sm">
            <h3 className="font-bold text-base">Configuration API e-UF</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
               <p className="text-blue-800 dark:text-blue-200 font-bold text-xs mb-1 uppercase tracking-wide">Injection Automatique</p>
               <p className="text-blue-600 dark:text-blue-400 text-[11px] leading-relaxed">Connectez votre instance InvoFlow au portail officiel e-UF pour automatiser le dépôt de vos documents extraits.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 max-w-lg">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Client ID (API Key)</label>
                <input className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 h-10 px-3 font-mono text-[11px]" type="text" readOnly value="euf_live_882910_abx" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Client Secret</label>
                <input className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 h-10 px-3 font-mono text-[11px]" type="password" value="••••••••••••••••" />
              </div>
              <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-2.5 rounded-lg shadow-sm transition-all hover:opacity-90 text-sm">
                Valider les identifiants
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Configuration;
