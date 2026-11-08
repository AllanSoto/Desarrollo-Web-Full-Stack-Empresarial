import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroExecutiveSummary } from './components/HeroExecutiveSummary';
import { ArchitectureSteps } from './components/ArchitectureSteps';
import { RealtimeDashboard } from './components/RealtimeDashboard';
import { UserManagementRBAC } from './components/UserManagementRBAC';
import { SQLStudio } from './components/SQLStudio';
import { ApiPlayground } from './components/ApiPlayground';
import { InfrastructurePM2Nginx } from './components/InfrastructurePM2Nginx';
import { SecurityComplianceISO } from './components/SecurityComplianceISO';
import { Footer } from './components/Footer';
import { 
  FileText, 
  Layers, 
  Activity, 
  Users, 
  Database, 
  Code2, 
  Server, 
  ShieldCheck 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('resumen');
  const [isDark, setIsDark] = useState<boolean>(true);

  // Synchronize document.documentElement theme class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onRunAudit={() => setActiveTab('seguridad')}
      />

      {/* Sub-navigation Module Selector Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 backdrop-blur-xs sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 sm:gap-2 py-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('resumen')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'resumen'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resumen Ejecutivo</span>
            </button>

            <button
              onClick={() => setActiveTab('arquitectura')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'arquitectura'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>4 Pasos de Arquitectura</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Panel en Tiempo Real</span>
            </button>

            <button
              onClick={() => setActiveTab('rbac')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'rbac'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Gestión RBAC</span>
            </button>

            <button
              onClick={() => setActiveTab('sql')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'sql'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Persistencia SQL</span>
            </button>

            <button
              onClick={() => setActiveTab('api')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'api'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>API REST & Docs</span>
            </button>

            <button
              onClick={() => setActiveTab('infraestructura')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'infraestructura'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>PM2 & Nginx</span>
            </button>

            <button
              onClick={() => setActiveTab('seguridad')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'seguridad'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Auditoría ISO 27001</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'resumen' && (
          <HeroExecutiveSummary
            onExploreArchitecture={() => setActiveTab('arquitectura')}
            onOpenDashboard={() => setActiveTab('dashboard')}
            onOpenRBAC={() => setActiveTab('rbac')}
            onOpenSQL={() => setActiveTab('sql')}
          />
        )}

        {activeTab === 'arquitectura' && (
          <ArchitectureSteps
            onOpenStepSubsystem={(subsystem) => setActiveTab(subsystem)}
          />
        )}

        {activeTab === 'dashboard' && (
          <RealtimeDashboard
            onOpenSQL={() => setActiveTab('sql')}
            onOpenRBAC={() => setActiveTab('rbac')}
            onOpenInfra={() => setActiveTab('infraestructura')}
          />
        )}

        {activeTab === 'rbac' && <UserManagementRBAC />}

        {activeTab === 'sql' && <SQLStudio />}

        {activeTab === 'api' && <ApiPlayground />}

        {activeTab === 'infraestructura' && <InfrastructurePM2Nginx />}

        {activeTab === 'seguridad' && <SecurityComplianceISO />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
