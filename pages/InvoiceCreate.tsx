
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_CLIENTS, MOCK_ARTICLES } from '../constants';

const InvoiceCreate: React.FC = () => {
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState('');
  const [items, setItems] = useState([{ description: '', qty: 1, price: 0 }]);
  const [showNewClientForm, setShowNewClientForm] = useState(false);

  const addItem = () => {
    setItems([...items, { description: '', qty: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="size-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-500 shadow-sm hover:bg-slate-50 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Création de Facture</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 flex flex-col gap-8">
          {/* Section Client */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border dark:border-slate-800 shadow-sm space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">badge</span>
                </div>
                <h3 className="font-bold text-xl">Informations Client</h3>
              </div>
              <button 
                onClick={() => setShowNewClientForm(!showNewClientForm)}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">{showNewClientForm ? 'group' : 'person_add'}</span>
                {showNewClientForm ? "Choisir existant" : "+ Créer nouveau client"}
              </button>
            </div>

            {showNewClientForm ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input placeholder="Raison sociale" className="md:col-span-2 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-12 px-4" />
                <input placeholder="Email facturation" className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-12 px-4" />
                <input placeholder="Contact téléphone" className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-12 px-4" />
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Sélectionner un client</label>
                <select 
                  className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-12 px-4"
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                >
                  <option value="">-- Parcourir vos clients --</option>
                  {MOCK_CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* Section Lignes */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border dark:border-slate-800 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">receipt_long</span>
              </div>
              <h3 className="font-bold text-xl">Détail des prestations</h3>
            </div>
            
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 items-end p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border dark:border-slate-800 border-slate-100">
                  <div className="flex-1 w-full flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Description</label>
                    <input 
                      placeholder="Désignation de l'article" 
                      className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-11 px-3.5 w-full"
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].description = e.target.value;
                        setItems(newItems);
                      }}
                    />
                  </div>
                  <div className="w-full md:w-20 flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase text-slate-400 text-center">Qté</label>
                    <input 
                      type="number" 
                      className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-11 px-3 w-full text-center"
                      value={item.qty}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].qty = parseInt(e.target.value) || 0;
                        setItems(newItems);
                      }}
                    />
                  </div>
                  <div className="w-full md:w-32 flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Prix Unit. HT</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm h-11 px-3 w-full pr-8"
                        value={item.price}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[index].price = parseFloat(e.target.value) || 0;
                          setItems(newItems);
                        }}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">€</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(index)}
                    className="size-11 rounded-lg bg-white dark:bg-slate-900 text-slate-300 hover:text-rose-500 transition-all flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              ))}
              <button 
                onClick={addItem}
                className="flex items-center gap-2 text-primary px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary/5 transition-all"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span> Ajouter un article
              </button>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] space-y-8 sticky top-28 shadow-xl">
            <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400">Récapitulatif de la facture</h3>
            <div className="space-y-5">
              <div className="flex justify-between text-base">
                <span className="text-slate-400">Montant HT</span>
                <span className="font-bold">{calculateTotal().toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-slate-400">TVA (20%)</span>
                <span>{(calculateTotal() * 0.2).toFixed(2)}€</span>
              </div>
              <div className="border-t border-white/10 pt-6 flex justify-between items-end">
                <span className="text-slate-400 text-sm mb-2">Total TTC</span>
                <span className="text-4xl font-black text-primary">{(calculateTotal() * 1.2).toFixed(2)}<span className="text-lg ml-0.5">€</span></span>
              </div>
            </div>
            <div className="pt-4 flex flex-col gap-3">
              <button 
                className="w-full py-4 bg-primary text-white rounded-xl font-bold text-sm shadow-lg hover:scale-[1.02] transition-all active:scale-95"
                onClick={() => navigate('/invoices')}
              >
                Valider & Générer
              </button>
              <p className="text-center text-slate-500 text-[10px] px-2 italic">En validant, la facture sera enregistrée dans votre historique.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCreate;
