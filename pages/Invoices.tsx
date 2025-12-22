
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_INVOICES } from '../constants';
import { ExtractionStatus, RPAStatus } from '../types';

const Invoices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Liste des factures</h1>
          <p className="text-slate-500 text-sm font-medium">Historique des extractions et création manuelle.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/invoices/new" className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Créer une facture</span>
          </Link>
          <Link to="/upload" className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
            <span>Déposer des fichiers</span>
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
            <input 
              type="text"
              placeholder="Rechercher par ID..."
              className="h-9 rounded-lg border-slate-200 bg-white text-xs w-56 focus:ring-1 focus:ring-primary pl-9 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200">
               <span className="material-symbols-outlined text-sm">download</span>
               Excel
            </button>
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Total : <span className="text-slate-900 dark:text-white">1 240 résultats</span>
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Extraction</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">RPA</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {MOCK_INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{inv.id}</td>
                  <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                  <td className="px-6 py-4 font-medium">{inv.client}</td>
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{inv.amount.toFixed(2)} {inv.currency}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${inv.extractionStatus === ExtractionStatus.OK ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                      {inv.extractionStatus === ExtractionStatus.OK ? 'OK' : 'Erreur'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      inv.rpaStatus === RPAStatus.COMPLETED ? 'bg-slate-100 text-slate-600' : 'bg-primary/5 text-primary'
                    }`}>
                      {inv.rpaStatus === RPAStatus.COMPLETED ? 'Injecté' : 'En cours'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/invoices/${inv.id}`} className="text-slate-400 hover:text-primary p-1">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
