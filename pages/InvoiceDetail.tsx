
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_INVOICES } from '../constants';

const InvoiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const invoice = MOCK_INVOICES.find(inv => inv.id === id) || MOCK_INVOICES[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/invoices" className="text-slate-500 hover:text-primary">Invoices</Link>
        <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
        <span className="text-slate-900 dark:text-white font-medium">Invoice #{invoice.id}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Invoice #{invoice.id}</h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/30 dark:text-green-400">
              <span className="size-1.5 rounded-full bg-green-600"></span>
              Processed
            </span>
          </div>
          <p className="text-slate-500 text-sm">Processed on Oct 24, 2023 at 10:42 AM • Source: Upload</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-[20px]">description</span>
            <span>Original File</span>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-semibold hover:bg-blue-600 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>Download e-UF PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stats */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">Validation</h3>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-slate-500 text-sm">All checks passed</p>
              <span className="text-green-600 font-bold text-sm">100%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-green-500 h-1.5 rounded-full w-full"></div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2 text-primary">
              <span className="material-symbols-outlined">account_balance_wallet</span>
              <h3 className="font-bold text-slate-900 dark:text-white">Credit Cost</h3>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{invoice.creditCost} Credits</p>
            <p className="text-slate-500 text-xs">Standard extraction + Line items</p>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">Processing Timeline</h3>
            <div className="relative pl-4 border-l-2 border-slate-100 dark:border-slate-800 space-y-8">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-green-500 ring-4 ring-white dark:ring-slate-900"></div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Processing Complete</p>
                  <span className="text-xs text-slate-500">10:42 AM</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-green-500 ring-4 ring-white dark:ring-slate-900"></div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Data Extracted</p>
                  <span className="text-xs text-slate-500">10:40 AM</span>
                </div>
              </div>
              <div className="relative opacity-50">
                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-slate-300 ring-4 ring-white dark:ring-slate-900"></div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">File Received</p>
                  <span className="text-xs text-slate-500">10:39 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Extracted Data */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h2 className="text-slate-900 dark:text-white text-lg font-bold">Extracted Information</h2>
              <button className="text-primary text-sm font-semibold hover:underline">Edit Fields</button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2 pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">Vendor Details</h4>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500">Vendor Name</label>
                  <p className="text-slate-900 dark:text-white font-medium text-base">{invoice.vendorName}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500">Tax ID / VAT</label>
                  <p className="text-slate-900 dark:text-white font-medium text-base">{invoice.taxId}</p>
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-slate-500">Vendor Address</label>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-900 dark:text-white font-medium text-base">{invoice.vendorAddress}</p>
                    <span className="material-symbols-outlined text-[16px] text-green-500">check_circle</span>
                  </div>
                </div>

                <div className="md:col-span-2 pb-2 border-b border-slate-100 dark:border-slate-800 mb-2 mt-4">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">Financials</h4>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500">Subtotal</label>
                  <p className="text-slate-900 dark:text-white font-medium text-base font-mono">${invoice.amount.toFixed(2)}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500">Total Amount</label>
                  <p className="text-primary font-bold text-xl font-mono">${invoice.amount.toFixed(2)} {invoice.currency}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-4 bg-slate-50/50 dark:bg-slate-800/50">
              <h2 className="text-slate-900 dark:text-white text-lg font-bold">Line Items</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Description</th>
                    <th className="px-6 py-3 font-semibold text-right">Qty</th>
                    <th className="px-6 py-3 font-semibold text-right">Unit Price</th>
                    <th className="px-6 py-3 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {invoice.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{item.description}</td>
                      <td className="px-6 py-4 text-right font-mono">{item.qty}</td>
                      <td className="px-6 py-4 text-right font-mono">${item.unitPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right font-mono font-bold">${item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                  {invoice.items.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-400 italic">No line items extracted</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
