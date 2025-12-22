
import React, { useState } from 'react';

const Upload: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files) {
      // Fix: Explicitly type selectedFiles as File[] to resolve 'unknown' type error when accessing .name
      const selectedFiles: File[] = Array.from(e.target.files);
      const invalidFiles = selectedFiles.filter(f => !f.name.endsWith('.pdf') && !f.name.endsWith('.xlsx') && !f.name.endsWith('.xls'));
      
      if (invalidFiles.length > 0) {
        setError("Format non supporté. Veuillez utiliser uniquement des fichiers PDF ou Excel.");
        return;
      }

      setFiles(selectedFiles);
      setIsUploading(true);
      setTimeout(() => setIsUploading(false), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto py-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl font-bold">upload_file</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">Dépôt de Factures</h1>
        </div>
        <p className="text-slate-500 text-lg font-medium max-w-2xl mt-2">
          Gérez votre consommation de crédits en déposant vos documents. Seuls les formats PDF et Excel sont acceptés.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 text-rose-700 rounded-xl border border-rose-100 flex items-center gap-3">
          <span className="material-symbols-outlined">error</span>
          <span className="text-sm font-semibold">{error}</span>
        </div>
      )}

      {/* Zone de Drag & Drop */}
      <div className="group relative flex w-full flex-col items-center justify-center rounded-[2.5rem] border-4 border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-20 text-center hover:border-primary hover:bg-primary/5 transition-all duration-500 cursor-pointer overflow-hidden">
        <input 
          type="file" 
          multiple 
          accept=".pdf,.xls,.xlsx" 
          className="absolute inset-0 opacity-0 cursor-pointer z-20" 
          onChange={handleFileChange}
        />
        
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 group-hover:bg-primary/30 transition-all duration-500"></div>
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary text-white shadow-2xl group-hover:scale-110 transition-all duration-500">
            <span className="material-symbols-outlined text-[48px] filled">cloud_upload</span>
          </div>
        </div>

        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Glissez vos PDF ou fichiers Excel ici</h3>
        <p className="text-slate-500 font-medium mb-10 max-w-md mx-auto leading-relaxed">Format autorisé : PDF, XLS, XLSX.</p>
        
        <button className="rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-4 text-sm font-black shadow-2xl transition-all">
          Parcourir les fichiers
        </button>
      </div>

      {files.length > 0 && !error && (
        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <h3 className="text-sm font-bold mb-4">Fichiers en attente ({files.length})</h3>
          <ul className="space-y-2">
            {files.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <span className="material-symbols-outlined text-sm text-primary">description</span>
                {f.name} ({(f.size / 1024).toFixed(0)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Upload;
