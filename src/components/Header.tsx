import React from 'react';
import { ShieldCheck, Moon, Sun, Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
  onRunAudit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  toggleTheme,
  onRunAudit,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-indigo-500/20">
            P5
          </div>
          <button
            onClick={() => setActiveTab('resumen')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap block">
              Proyecto 5 · Enterprise Core
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Single Line, 4-5 Links) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
          <button
            onClick={() => setActiveTab('resumen')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-slate-900 dark:hover:text-white cursor-pointer ${
              activeTab === 'resumen'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                : ''
            }`}
          >
            Resumen Ejecutivo
          </button>
          <button
            onClick={() => setActiveTab('arquitectura')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-slate-900 dark:hover:text-white cursor-pointer ${
              activeTab === 'arquitectura'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                : ''
            }`}
          >
            Flujo de Arquitectura
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-slate-900 dark:hover:text-white cursor-pointer ${
              activeTab === 'dashboard'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                : ''
            }`}
          >
            Panel en Tiempo Real
          </button>
          <button
            onClick={() => setActiveTab('rbac')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-slate-900 dark:hover:text-white cursor-pointer ${
              activeTab === 'rbac'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                : ''
            }`}
          >
            Gestión RBAC
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-slate-900 dark:hover:text-white cursor-pointer ${
              activeTab === 'sql'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                : ''
            }`}
          >
            Persistencia SQL
          </button>
          <button
            onClick={() => setActiveTab('infraestructura')}
            className={`whitespace-nowrap transition-colors py-1 hover:text-slate-900 dark:hover:text-white cursor-pointer ${
              activeTab === 'infraestructura'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                : ''
            }`}
          >
            PM2 & Nginx
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onRunAudit}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Auditoría ISO 27001</span>
          </button>
        </div>
      </div>
    </header>
  );
};
