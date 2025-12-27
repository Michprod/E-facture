
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import InvoiceDetail from './pages/InvoiceDetail';
import InvoiceCreate from './pages/InvoiceCreate';
import Upload from './pages/Upload';
import Batches from './pages/Batches';
import BatchDetail from './pages/BatchDetail';
import Credits from './pages/Credits';
import Configuration from './pages/Configuration';
import RpaProcess from './pages/RpaProcess';
import Unauthorized from './pages/Unauthorized';
import RequirePermission from './components/RequirePermission';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuth');
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/non-autorise" element={isAuthenticated ? <ProtectedLayout><Unauthorized /></ProtectedLayout> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated ? <ProtectedLayout><RequirePermission permission="DASHBOARD"><Dashboard /></RequirePermission></ProtectedLayout> : <Navigate to="/login" />} />
        <Route path="/invoices" element={isAuthenticated ? <ProtectedLayout><RequirePermission permission="FACTURES_LECTURE"><Invoices /></RequirePermission></ProtectedLayout> : <Navigate to="/login" />} />
        <Route path="/invoices/new" element={isAuthenticated ? <ProtectedLayout><RequirePermission permission="FACTURES_CREATION"><InvoiceCreate /></RequirePermission></ProtectedLayout> : <Navigate to="/login" />} />
        <Route path="/invoices/:id" element={isAuthenticated ? <ProtectedLayout><RequirePermission permission="FACTURES_LECTURE"><InvoiceDetail /></RequirePermission></ProtectedLayout> : <Navigate to="/login" />} />
        <Route path="/rpa/:invoiceId" element={isAuthenticated ? <ProtectedLayout><RequirePermission permission="TRAITEMENT"><RpaProcess /></RequirePermission></ProtectedLayout> : <Navigate to="/login" />} />
        <Route path="/upload" element={isAuthenticated ? <ProtectedLayout><RequirePermission permission="DEPOT"><Upload /></RequirePermission></ProtectedLayout> : <Navigate to="/login" />} />
        <Route path="/batches" element={isAuthenticated ? <ProtectedLayout><RequirePermission permission="TRAITEMENT"><Batches /></RequirePermission></ProtectedLayout> : <Navigate to="/login" />} />
        <Route path="/batches/:id" element={isAuthenticated ? <ProtectedLayout><RequirePermission permission="TRAITEMENT"><BatchDetail /></RequirePermission></ProtectedLayout> : <Navigate to="/login" />} />
        <Route path="/credits" element={isAuthenticated ? <ProtectedLayout><RequirePermission permission="CREDITS"><Credits /></RequirePermission></ProtectedLayout> : <Navigate to="/login" />} />
        <Route path="/configuration" element={isAuthenticated ? <ProtectedLayout><RequirePermission permission="CONFIGURATION"><Configuration onLogout={handleLogout} /></RequirePermission></ProtectedLayout> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
