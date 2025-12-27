import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_INVOICES } from '../constants';

const InvoiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const invoice = MOCK_INVOICES.find(inv => inv.id === id) || MOCK_INVOICES[0];
  const [showRunDialog, setShowRunDialog] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const [showEditFields, setShowEditFields] = useState(false);
  const [extracted, setExtracted] = useState(() => ({
    vendorName: invoice.vendorName,
    taxId: invoice.taxId,
    vendorAddress: invoice.vendorAddress,
    amount: invoice.amount,
    currency: invoice.currency,
  }));
  const [draft, setDraft] = useState(extracted);

  useEffect(() => {
    const next = {
      vendorName: invoice.vendorName,
      taxId: invoice.taxId,
      vendorAddress: invoice.vendorAddress,
      amount: invoice.amount,
      currency: invoice.currency,
    };
    setExtracted(next);
    setDraft(next);
  }, [invoice.id]);

  return (
    <div className="flex flex-col gap-6">
      {showEditFields && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-xl p-6 shadow-2xl border dark:border-slate-800">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-base font-bold">Modifier les champs</h3>
              <button
                onClick={() => {
                  setShowEditFields(false);
                  setDraft(extracted);
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setExtracted(draft);
                setShowEditFields(false);
              }}
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Nom du fournisseur</label>
                <input
                  className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-10 px-3"
                  type="text"
                  value={draft.vendorName}
                  onChange={(e) => setDraft(prev => ({ ...prev, vendorName: e.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">N° TVA / Identifiant fiscal</label>
                <input
                  className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-10 px-3"
                  type="text"
                  value={draft.taxId}
                  onChange={(e) => setDraft(prev => ({ ...prev, taxId: e.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Adresse du fournisseur</label>
                <input
                  className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-10 px-3"
                  type="text"
                  value={draft.vendorAddress}
                  onChange={(e) => setDraft(prev => ({ ...prev, vendorAddress: e.target.value }))}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Montant total</label>
                <input
                  className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-10 px-3 font-mono"
                  type="number"
                  step="0.01"
                  value={Number.isFinite(draft.amount) ? draft.amount : 0}
                  onChange={(e) => setDraft(prev => ({ ...prev, amount: Number(e.target.value) }))}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Devise</label>
                <input
                  className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-10 px-3 font-mono"
                  type="text"
                  value={draft.currency}
                  onChange={(e) => setDraft(prev => ({ ...prev, currency: e.target.value }))}
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditFields(false);
                    setDraft(extracted);
                  }}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg text-sm font-bold text-white bg-primary hover:bg-primary-hover transition-all"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showRunDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-xl p-6 shadow-2xl border dark:border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold">Confirmer l'opération</h3>
              <button onClick={() => !isRunning && setShowRunDialog(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-300">Cette action consommera <span className="font-bold text-primary">{invoice.creditCost} crédits</span>.</p>
              {isRunning ? (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Traitement en cours...
                </div>
              ) : null}
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button disabled={isRunning} onClick={() => setShowRunDialog(false)} className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-50'} border-slate-200 dark:border-slate-700`}>
                Annuler
              </button>
              <button
                disabled={isRunning}
                onClick={() => {
                  setIsRunning(true);
                  setTimeout(() => {
                    setIsRunning(false);
                    setShowRunDialog(false);
                  }, 1500);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold text-white ${isRunning ? 'bg-primary/70 cursor-wait' : 'bg-primary hover:bg-primary-hover'}`}
              >
                <span className="material-symbols-outlined text-[18px] align-[-2px] mr-1">play_arrow</span>
                Lancer
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/invoices" className="text-slate-500 hover:text-primary">Factures</Link>
        <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
        <span className="text-slate-900 dark:text-white font-medium">Facture #{invoice.id}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-slate-900 dark:text-white text-3xl font-black tracking-tight">Facture #{invoice.id}</h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/30 dark:text-green-400">
              <span className="size-1.5 rounded-full bg-green-600"></span>
              Traitée
            </span>
          </div>
          <p className="text-slate-500 text-sm">Traitée le 24 oct. 2023 à 10:42 • Source : Dépôt</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-[20px]">description</span>
            <span>Fichier original</span>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-semibold hover:bg-blue-600 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>Télécharger PDF e-UF</span>
          </button>
          <button onClick={() => setShowRunDialog(true)} className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">play_arrow</span>
            <span>Lancer</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stats */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Liens rapides</h3>
            <div className="flex flex-col gap-2">
              <Link to="#" className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary">
                <span className="material-symbols-outlined text-[18px]">description</span>
                Facture originale
              </Link>
              <Link to="/credits" className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary">
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                Crédit
              </Link>
              <Link to={`/rpa/${invoice.id}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary">
                <span className="material-symbols-outlined text-[18px]">keyboard_return</span>
                Traitement (RPA)
              </Link>
            </div>
          </div>
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
              <h3 className="font-bold text-slate-900 dark:text-white">Coût en crédits</h3>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{invoice.creditCost} crédits</p>
            <p className="text-slate-500 text-xs">Extraction standard + lignes</p>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">Chronologie</h3>
            <div className="relative pl-4 border-l-2 border-slate-100 dark:border-slate-800 space-y-8">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-green-500 ring-4 ring-white dark:ring-slate-900"></div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Traitement terminé</p>
                  <span className="text-xs text-slate-500">10:42 AM</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-green-500 ring-4 ring-white dark:ring-slate-900"></div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Données extraites</p>
                  <span className="text-xs text-slate-500">10:40 AM</span>
                </div>
              </div>
              <div className="relative opacity-50">
                <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-slate-300 ring-4 ring-white dark:ring-slate-900"></div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">Fichier reçu</p>
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
              <h2 className="text-slate-900 dark:text-white text-lg font-bold">Informations extraites</h2>
              <button onClick={() => setShowEditFields(true)} className="text-primary text-sm font-semibold hover:underline">Modifier</button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2 pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">Fournisseur</h4>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500">Nom du fournisseur</label>
                  <p className="text-slate-900 dark:text-white font-medium text-base">{extracted.vendorName}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500">N° TVA / Identifiant fiscal</label>
                  <p className="text-slate-900 dark:text-white font-medium text-base">{extracted.taxId}</p>
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-slate-500">Adresse du fournisseur</label>
                  <div className="flex items-center gap-2">
                    <p className="text-slate-900 dark:text-white font-medium text-base">{extracted.vendorAddress}</p>
                    <span className="material-symbols-outlined text-[16px] text-green-500">check_circle</span>
                  </div>
                </div>

                <div className="md:col-span-2 pb-2 border-b border-slate-100 dark:border-slate-800 mb-2 mt-4">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">Montants</h4>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500">Sous-total</label>
                  <p className="text-slate-900 dark:text-white font-medium text-base font-mono">${extracted.amount.toFixed(2)}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-slate-500">Total</label>
                  <p className="text-primary font-bold text-xl font-mono">${extracted.amount.toFixed(2)} {extracted.currency}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-4 bg-slate-50/50 dark:bg-slate-800/50">
              <h2 className="text-slate-900 dark:text-white text-lg font-bold">Lignes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Description</th>
                    <th className="px-6 py-3 font-semibold text-right">Qté</th>
                    <th className="px-6 py-3 font-semibold text-right">Prix unitaire</th>
                    <th className="px-6 py-3 font-semibold text-right">Montant</th>
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
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-400 italic">Aucune ligne extraite</td>
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
