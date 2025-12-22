
import React, { useState } from 'react';

const Credits: React.FC = () => {
  const [showPlans, setShowPlans] = useState(false);

  if (showPlans) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setShowPlans(false)} className="size-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all shadow-sm">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Nos Plans d'Abonnement</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Starter', price: '19€', credits: '1 000', features: ['1 utilisateur', 'Support Email', 'Export Excel'] },
            { name: 'Business', price: '49€', credits: '5 000', features: ['5 utilisateurs', 'Support 24/7', 'RPA Prioritaire', 'API e-UF Standard'] },
            { name: 'Enterprise', price: '199€', credits: '20 000', features: ['Illimité', 'Account Manager', 'Audit conformité', 'API e-UF Turbo'] }
          ].map((plan, i) => (
            <div key={i} className={`p-8 rounded-3xl border flex flex-col gap-6 transition-all relative overflow-hidden ${plan.name === 'Business' ? 'border-primary shadow-xl shadow-primary/10 bg-primary/5' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm'}`}>
              {plan.name === 'Business' && (
                <div className="absolute top-4 right-[-30px] bg-primary text-white text-[9px] font-bold px-10 py-1 rotate-45 shadow-md uppercase tracking-widest">Recommandé</div>
              )}
              <div>
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-4xl font-black">{plan.price}<span className="text-sm font-normal text-slate-500"> / mois</span></p>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inclus</p>
                <p className="text-base font-bold text-slate-900 dark:text-white">{plan.credits} crédits d'extraction</p>
              </div>
              <ul className="flex-1 space-y-3">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-emerald-500 text-lg font-bold">check_circle</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${plan.name === 'Business' ? 'bg-primary text-white shadow-lg hover:scale-[1.02]' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'}`}>
                Choisir {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-1">Crédits & Consommation</h1>
        <p className="text-slate-500 text-base">Suivez l'utilisation de vos ressources InvoFlow.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Section */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border dark:border-slate-800 shadow-sm p-10 flex flex-col gap-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold mb-1">Extraction de factures</h2>
                <p className="text-slate-500 text-sm">Cycle du 01 Oct. au 31 Oct. 2023</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800">
                Compte Actif
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">Consommation</span>
                  <span className="text-5xl font-black text-slate-900 dark:text-white">1 500 <span className="text-xl text-slate-300 font-medium">/ 5 000</span></span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-black text-primary">30%</span>
                </div>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 shadow-inner">
                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                 <div className="size-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm">
                    <span className="material-symbols-outlined text-xl">auto_stories</span>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Usage Quotidien</p>
                    <p className="text-base font-bold">48.2 pts</p>
                 </div>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                 <div className="size-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-rose-500 shadow-sm">
                    <span className="material-symbols-outlined text-xl">warning</span>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Alertes de seuil</p>
                    <p className="text-base font-bold">Inactives</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Column */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-slate-900 dark:bg-slate-800 text-white rounded-[2rem] p-8 flex flex-col gap-8 shadow-xl sticky top-28">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold">Plan Preview</h3>
              <p className="text-slate-400 text-xs">Vous profitez de l'offre Business</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-xs">
                 <span className="material-symbols-outlined text-emerald-400 text-lg">check_circle</span>
                 <span>Extractions illimitées</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                 <span className="material-symbols-outlined text-emerald-400 text-lg">check_circle</span>
                 <span>RPA temps réel (API e-UF)</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                 <span className="material-symbols-outlined text-emerald-400 text-lg">check_circle</span>
                 <span>5 Comptes Utilisateurs</span>
              </div>
              <div className="flex items-center gap-3 text-xs opacity-40">
                 <span className="material-symbols-outlined text-lg">lock</span>
                 <span>Audit Enterprise</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Renouvellement :</span>
                <span className="font-bold">01 Nov 2023</span>
              </div>
              <button 
                onClick={() => setShowPlans(true)}
                className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95"
              >
                Gérer mon plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;
