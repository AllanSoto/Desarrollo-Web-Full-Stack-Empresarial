import React from 'react';
import { ShieldCheck, Server, Database, Code2 } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              Proyecto 5 — Desarrollo Web Full-Stack Empresarial
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Arquitectura modular en React, Next.js, TypeScript, Node.js Express, SQL Server / MySQL, PM2 Cluster & Nginx.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <button
              onClick={() => setActiveTab('resumen')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Resumen
            </button>
            <button
              onClick={() => setActiveTab('arquitectura')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Arquitectura
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Panel en Vivo
            </button>
            <button
              onClick={() => setActiveTab('rbac')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Control RBAC
            </button>
            <button
              onClick={() => setActiveTab('sql')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              SQL Studio
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              APIs REST
            </button>
            <button
              onClick={() => setActiveTab('infraestructura')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              PM2 & Nginx
            </button>
            <button
              onClick={() => setActiveTab('seguridad')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              ISO 27001
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-150 dark:border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            &copy; 2026 Plataforma Empresarial. Cumplimiento de estándares de ingeniería de software e ISO/IEC 27001.
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span>Uptime: 99.9%</span>
            <span>·</span>
            <span>Lighthouse: 98/100</span>
            <span>·</span>
            <span className="text-emerald-500 font-bold">Grado A+ Ciberseguridad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
