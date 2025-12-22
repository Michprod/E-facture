
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_BATCHES, MOCK_INVOICES } from '../constants';

const BatchDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const batch = MOCK_BATCHES.find(b => b.id === id) || MOCK_BATCHES[0];

  return (
    <div className="flex flex-col gap-8">
       {/* Breadcrumbs */}
      <nav className="flex items-center text-sm font-medium text-slate-500">
        <Link to="/batches" className="hover:text-primary transition-colors">Batches</Link>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-900 dark:text-white font-bold">Batch #{batch.id}</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">{batch.name}</h1>
          <p className="text-slate-500">Created on {batch.dateCreated} • <span className="font-medium text-slate-700 dark:text-slate-300">Total Value: ${batch.totalValue.toLocaleString()}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-white font-medium hover:bg-slate-50 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Processing Status</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">85%</span>
            <span className="text-sm text-slate-500 ml-1">Complete</span>
          </div>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
          <div className="bg-primary h-3 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Invoices', value: batch.totalInvoices, icon: 'receipt_long', color: 'slate' },
          { label: 'Success', value: batch.successCount, icon: 'check_circle', color: 'green' },
          { label: 'Errors', value: batch.errorCount, icon: 'error', color: 'red' },
          { label: 'Needs Review', value: 7, icon: 'warning', color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-1 ${stat.color === 'red' && 'ring-1 ring-red-500/20'}`}>
            <span className="text-sm font-medium text-slate-500">{stat.label}</span>
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-bold text-slate-900 dark:text-white`}>{stat.value}</span>
              <div className={`size-8 rounded-full flex items-center justify-center text-${stat.color}-600 bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 font-bold">Invoices in Batch</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="p-4 font-semibold text-slate-500 uppercase">Ref ID</th>
                <th className="p-4 font-semibold text-slate-500 uppercase">Vendor</th>
                <th className="p-4 font-semibold text-slate-500 uppercase text-right">Amount</th>
                <th className="p-4 font-semibold text-slate-500 uppercase">Status</th>
                <th className="p-4 font-semibold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-4 font-medium text-primary underline">{inv.id}</td>
                  <td className="p-4 text-slate-900 dark:text-white font-medium">{inv.client}</td>
                  <td className="p-4 text-right font-mono">${inv.amount.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Success</span>
                  </td>
                  <td className="p-4 text-right">
                    <Link to={`/invoices/${inv.id}`} className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-[18px]">visibility</span></Link>
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

export default BatchDetail;
