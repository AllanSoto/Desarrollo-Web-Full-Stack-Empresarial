import React from 'react';
import { ShieldCheck, Activity, Zap, Server, Database, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

interface HeroExecutiveSummaryProps {
  onExploreArchitecture: () => void;
  onOpenDashboard: () => void;
  onOpenRBAC: () => void;
  onOpenSQL: () => void;
}

export const HeroExecutiveSummary: React.FC<HeroExecutiveSummaryProps> = ({
  onExploreArchitecture,
  onOpenDashboard,
  onOpenRBAC,
  onOpenSQL,
}) => {
  return (
    <div className="space-y-12">
      {/* Hero Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        {/* Left Column: Case Study Title & Executive Context */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
              <span>Portafolio de Ingeniería de Software</span>
              <span aria-hidden="true">·</span>
              <span>Caso de Estudio #05</span>
              <span aria-hidden="true">·</span>
              <span>Arquitectura Empresarial</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: 'balance' }}>
              Proyecto 5 — Desarrollo Web Full-Stack Empresarial
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Plataforma empresarial de misión crítica con arquitectura desacoplada, alta disponibilidad, control de acceso basado en roles (RBAC) y persistencia relacional optimizada con pool de conexiones.
            </p>
          </div>

          {/* Business Challenge & Technical Solution Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Activity className="w-4 h-4 text-amber-500" />
                <span>El Desafío de Negocio</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Necesidad de una aplicación web empresarial moderna, segura y de alto rendimiento que integrara panel de control en tiempo real, gestión de usuarios, roles y comunicación fluida con bases de datos relacionales SQL.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>La Solución Técnica Implementada</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Desarrollo Full-Stack utilizando React, Next.js, TypeScript y Node.js Express. Arquitectura modular con APIs REST documentadas, autenticación JWT, conexión nativa a SQL Server/MySQL, despliegue en servidor con PM2 y Nginx, e implementación de políticas de seguridad web ISO 27001.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenDashboard}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <span>Abrir Panel en Tiempo Real</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreArchitecture}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <span>Ver los 4 Pasos de Arquitectura</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visual Showcase Infrastructure Card */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-lg h-full min-h-[320px] flex flex-col">
            <img
              src="/src/assets/images/infrastructure_servers_1793938367007.jpg"
              alt="Infraestructura de servidores en clúster empresarial"
              referrerPolicy="no-referrer"
              className="w-full h-56 object-cover object-center"
              onError={(e) => {
                // Fallback graceful container if image loading fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-gradient-to-b from-slate-900/90 to-slate-950 text-white">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>CLÚSTER PM2 / NGINX HA</span>
                  <span className="text-emerald-400 font-semibold">ESTADO: NOMINAL</span>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Infraestructura de Producción Distribuida
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Topología de alta disponibilidad tolerante a fallos: balanceo de carga L7, aislamiento de workers en PM2, pool de sockets persistentes y cifrado TLS 1.3 con HSTS estricto.
                </p>
              </div>

              {/* Quick Jump Buttons to Components */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
                <button
                  onClick={onOpenRBAC}
                  className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Control RBAC</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
                <button
                  onClick={onOpenSQL}
                  className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pool SQL</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent 3 Core Metrics Strip (Prompt Requirements) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: 99.9% Disponibilidad (Uptime) */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Disponibilidad (Uptime)
            </span>
            <Server className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight font-mono tabular-nums text-slate-900 dark:text-white">
              99.9%
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            SLA empresarial verificado con clúster PM2 en 4 nodos activos y tolerancia a fallos sin caídas no planificadas.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-150 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Downtime anual máx.</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">&lt; 8.76 h / año</span>
          </div>
        </div>

        {/* Metric 2: 98 / 100 Desempeño Lighthouse */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Desempeño Lighthouse
            </span>
            <Zap className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight font-mono tabular-nums text-slate-900 dark:text-white">
              98 / 100
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Optimización integral de Core Web Vitals: Largest Contentful Paint (LCP) de 0.8s y First Input Delay (FID) &lt; 12ms.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-150 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Core Web Vitals</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Puntaje Verde 100%</span>
          </div>
        </div>

        {/* Metric 3: Grado A+ Grado de Ciberseguridad */}
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Grado de Ciberseguridad
            </span>
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight font-mono text-indigo-600 dark:text-indigo-400">
              Grado A+
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Certificación estricta según norma ISO/IEC 27001, mitigación de OWASP Top 10, cabeceras HSTS y tokens JWT firmados.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-150 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Auditoría de Seguridad</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">ISO 27001 Validada</span>
          </div>
        </div>
      </div>

      {/* Tech Stack Matrix Overview */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Ecosistema Tecnológico de la Solución
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Desacoplamiento arquitectónico entre capas de presentación, lógica de dominio y persistencia relacional
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>TypeScript 5.x</span>
            <span>·</span>
            <span>React 19</span>
            <span>·</span>
            <span>Node.js Express</span>
            <span>·</span>
            <span>SQL Server / MySQL</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="font-semibold text-slate-900 dark:text-white mb-1">Frontend / UX</div>
            <div className="text-slate-500 dark:text-slate-400">React + Next.js, Tailwind CSS, Motion, TypeScript</div>
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="font-semibold text-slate-900 dark:text-white mb-1">Backend REST API</div>
            <div className="text-slate-500 dark:text-slate-400">Node.js Express, Esquemas de validación, JWT RS256</div>
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="font-semibold text-slate-900 dark:text-white mb-1">Persistencia SQL</div>
            <div className="text-slate-500 dark:text-slate-400">SQL Server (T-SQL) & MySQL 8, Pool de sockets, ACID</div>
          </div>
          <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="font-semibold text-slate-900 dark:text-white mb-1">Infra & Seguridad</div>
            <div className="text-slate-500 dark:text-slate-400">PM2 Cluster (4 workers), Nginx Reverse Proxy, TLS 1.3</div>
          </div>
        </div>
      </div>
    </div>
  );
};
