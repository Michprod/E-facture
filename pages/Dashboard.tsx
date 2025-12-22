
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_BATCHES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CHART_DATA = [
  { name: 'Lun', value: 40 },
  { name: 'Mar', value: 65 },
  { name: 'Mer', value: 85 },
  { name: 'Jeu', value: 55 },
  { name: 'Ven', value: 75 },
  { name: 'Sam', value: 30 },
  { name: 'Dim', value: 20 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Vue d'ensemble</h2>
          <p className="text-slate-500 text-sm font-medium mt-0.5">Activité d'extraction et crédits en temps réel.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/invoices/new" className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-bold py-2.5 px-4 rounded-lg transition-all shadow-sm hover:bg-slate-50">
            <span className="material-symbols-outlined text-lg">add</span>
            <span>Facture manuelle</span>
          </Link>
          <Link to="/upload" className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2.5 px-4 rounded-lg transition-all shadow-md shadow-primary/20">
            <span className="material-symbols-outlined text-lg">cloud_upload</span>
            <span>Nouveau dépôt</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Crédits dispos', value: '12 450', change: '-35%', trend: 'down', icon: 'account_balance_wallet', color: 'blue' },
          { label: 'Factures extraites', value: '843', change: '+12%', trend: 'up', icon: 'receipt_long', color: 'emerald' },
          { label: 'Taux d\'erreur', value: '1.4%', change: '-0.2%', trend: 'down', icon: 'report_problem', color: 'rose' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 group hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
              <div className={`p-2 rounded-lg bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-500 group-hover:scale-105 transition-transform`}>
                <span className="material-symbols-outlined text-xl">{stat.icon}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {stat.change}
                </span>
                <span className="text-slate-400 text-[10px] font-medium">vs mois précédent</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">Volume quotidien</h3>
            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-xs font-bold px-3 py-1.5">
              <option>7 jours</option>
              <option>30 jours</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} dy={8} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold', fontSize: '12px' }} />
                <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col">
          <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight mb-5">Derniers lots</h3>
          <div className="flex flex-col gap-4 flex-1">
            {MOCK_BATCHES.slice(0, 3).map(batch => (
              <div key={batch.id} className="flex flex-col gap-3 p-4 rounded-xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-bold text-slate-800 dark:text-white truncate max-w-[140px] group-hover:text-primary transition-colors">{batch.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">Extraits</p>
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${batch.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 'bg-primary/10 text-primary'}`}>
                    {batch.status === 'COMPLETED' ? 'OK' : '...'}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${batch.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-primary'}`} style={{ width: batch.status === 'COMPLETED' ? '100%' : '65%' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/batches" className="mt-6 py-2 w-full text-center text-[11px] font-black text-primary hover:bg-primary/5 rounded-lg transition-all">
            Voir tout l'historique
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
