
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_BATCHES } from '../constants';

const Batches: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold tracking-tight">Batch Management</h1>
          <p className="text-slate-500 text-base">Monitor the status and results of uploaded invoice files.</p>
        </div>
        <Link to="/upload" className="flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-blue-600 text-white h-11 px-6 text-sm font-semibold transition-all shadow-sm active:scale-95">
          <span className="material-symbols-outlined text-[20px]">upload_file</span>
          <span>Upload New Batch</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Batch Name</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Date Uploaded</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Origin</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 w-1/4">Results</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_BATCHES.map((batch) => (
                <tr key={batch.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                        <span className="material-symbols-outlined">description</span>
                      </div>
                      <div className="flex flex-col">
                        <Link to={`/batches/${batch.id}`} className="text-sm font-semibold text-slate-900 dark:text-white hover:text-primary transition-colors">{batch.name}</Link>
                        <span className="text-xs text-slate-500 font-mono">ID: {batch.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-slate-700 dark:text-slate-300">{batch.dateCreated}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-700 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 ring-1 ring-inset ring-slate-500/10">
                      {batch.origin}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                      batch.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' : 
                      batch.status === 'PROCESSING' ? 'bg-blue-50 text-blue-700 ring-blue-700/10' :
                      'bg-rose-50 text-rose-700 ring-rose-600/10'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${batch.status === 'PROCESSING' ? 'bg-blue-600 animate-pulse' : batch.status === 'COMPLETED' ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                      {batch.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-emerald-600">{batch.successCount} Success</span>
                        <span className="text-slate-400">{batch.totalInvoices} Total</span>
                      </div>
                      <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                        <div className="h-full bg-emerald-500" style={{ width: `${(batch.successCount / batch.totalInvoices) * 100}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link to={`/batches/${batch.id}`} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1">
                      <span className="material-symbols-outlined">visibility</span>
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

export default Batches;
