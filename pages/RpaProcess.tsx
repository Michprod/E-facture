import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { MOCK_INVOICES } from '../constants';
import { RPAStatus } from '../types';

const RpaProcess: React.FC = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const invoice = MOCK_INVOICES.find(inv => inv.id === invoiceId) || MOCK_INVOICES[0];

  const statusLabel = invoice.rpaStatus === RPAStatus.COMPLETED ? 'Injecté' : invoice.rpaStatus === RPAStatus.PENDING ? 'En attente' : 'En cours';

  const steps = [
    { key: 'RECEIVED', title: 'Facture reçue', done: true },
    { key: 'QUEUE', title: 'Mise en file', done: invoice.rpaStatus !== RPAStatus.PENDING },
    { key: 'RPA', title: 'Exécution du robot (RPA)', done: invoice.rpaStatus === RPAStatus.COMPLETED },
    { key: 'INJECT', title: 'Injection e-UF', done: invoice.rpaStatus === RPAStatus.COMPLETED }
  ];

  const progress = invoice.rpaStatus === RPAStatus.COMPLETED ? 100 : invoice.rpaStatus === RPAStatus.PENDING ? 20 : 60;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 text-sm">
        <Link to="/invoices" className="text-slate-500 hover:text-primary">Factures</Link>
        <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
        <Link to={`/invoices/${invoice.id}`} className="text-slate-500 hover:text-primary">{invoice.id}</Link>
        <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
        <span className="text-slate-900 dark:text-white font-medium">Traitement (RPA)</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">memory</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Process RPA</h1>
          </div>
          <p className="text-slate-500">Facture : <span className="font-semibold text-slate-700 dark:text-slate-200">{invoice.id}</span> • Client : <span className="font-semibold text-slate-700 dark:text-slate-200">{invoice.client}</span></p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${
            invoice.rpaStatus === RPAStatus.COMPLETED ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' :
            invoice.rpaStatus === RPAStatus.PENDING ? 'bg-slate-100 text-slate-600 ring-slate-500/10' :
            'bg-primary/10 text-primary ring-primary/20'
          }`}>
            <span className={`h-2 w-2 rounded-full ${invoice.rpaStatus === RPAStatus.COMPLETED ? 'bg-emerald-600' : invoice.rpaStatus === RPAStatus.PENDING ? 'bg-slate-500' : 'bg-primary animate-pulse'}`}></span>
            {statusLabel}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-end mb-2">
          <p className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Progression</p>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">{progress}%</span>
            <span className="text-sm text-slate-500 ml-1">Complété</span>
          </div>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
          <div className="bg-primary h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 font-bold">Étapes</div>
        <div className="p-6">
          <div className="relative pl-4 border-l-2 border-slate-100 dark:border-slate-800 space-y-8">
            {steps.map((s, idx) => (
              <div key={s.key} className={`relative ${!s.done ? 'opacity-60' : ''}`}>
                <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full ${s.done ? 'bg-emerald-500' : 'bg-slate-300'} ring-4 ring-white dark:ring-slate-900`}></div>
                <div className="flex items-center justify-between gap-4">
                  <p className={`text-sm ${s.done ? 'font-semibold text-slate-900 dark:text-white' : 'font-medium text-slate-600 dark:text-slate-300'}`}>{s.title}</p>
                  {idx === 2 && invoice.rpaStatus !== RPAStatus.COMPLETED && (
                    <span className="text-xs font-semibold text-primary">Robot en cours…</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Link to="/batches" className="text-sm font-bold text-primary hover:underline">Voir tous les traitements (batches)</Link>
      </div>
    </div>
  );
};

export default RpaProcess;
