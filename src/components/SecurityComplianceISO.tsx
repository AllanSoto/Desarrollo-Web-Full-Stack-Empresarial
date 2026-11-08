import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Download, 
  Lock, 
  RefreshCw, 
  AlertCircle,
  ExternalLink,
  Award
} from 'lucide-react';
import { ISO_CONTROLS } from '../data/mockEnterpriseData';
import { IsoControl } from '../types';

export const SecurityComplianceISO: React.FC = () => {
  const [controls, setControls] = useState<IsoControl[]>(ISO_CONTROLS);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditTimestamp, setAuditTimestamp] = useState<string>('Hoy 19:30');
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  const handleRunFullAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setControls((prev) =>
        prev.map((c) => ({
          ...c,
          status: 'CUMPLE',
          lastChecked: `Hoy ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        }))
      );
      setAuditTimestamp(`Hoy ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
      setIsAuditing(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <span>Marco de Ciberseguridad & Gobernanza</span>
            <span aria-hidden="true">·</span>
            <span>Estándar ISO/IEC 27001</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Auditoría de Ciberseguridad y Cumplimiento Grado A+
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
            Verificación exhaustiva de salvaguardas técnicas, protección de datos en reposo y en tránsito, y neutralización de vulnerabilidades OWASP Top 10.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunFullAudit}
            disabled={isAuditing}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? 'Verificando controles...' : 'Ejecutar Escaneo de Cumplimiento'}</span>
          </button>

          <button
            onClick={() => setShowCertificateModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Ver Certificado Formal</span>
          </button>
        </div>
      </div>

      {/* Cyber Security Score Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-1">
          <div className="text-xs text-slate-500">Calificación Global</div>
          <div className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
            Grado A+
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            100% de controles verificados
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-1">
          <div className="text-xs text-slate-500">Mitigación OWASP Top 10</div>
          <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            10 / 10
          </div>
          <div className="text-[11px] text-slate-500">
            Inyección SQL & XSS blindados
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-1">
          <div className="text-xs text-slate-500">Cifrado en Tránsito & Reposo</div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
            AES-256
          </div>
          <div className="text-[11px] text-slate-500">
            TLS 1.3 con RSA 4096 / PFS
          </div>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-1">
          <div className="text-xs text-slate-500">Última Auditoría de Seguridad</div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
            {auditTimestamp}
          </div>
          <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
            Agente SAST/DAST Activo
          </div>
        </div>
      </div>

      {/* ISO 27001 Controls Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Controles Técnicos del Anexo A — Norma ISO/IEC 27001:2022
            </h3>
            <p className="text-xs text-slate-500">
              Evidencia técnica de implementación auditada en código fuente e infraestructura
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
            8 de 8 Controles Clave en Estado Cumple
          </span>
        </div>

        <div className="divide-y divide-slate-150 dark:divide-slate-800/60 text-xs">
          {controls.map((control) => (
            <div key={control.id} className="p-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xs px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/60">
                    {control.code}
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {control.title}
                  </span>
                  <span className="text-slate-400 text-[11px]">·</span>
                  <span className="text-slate-500 text-[11px]">{control.domain}</span>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{control.status}</span>
                  </span>
                  <span className="text-slate-400 text-[11px] font-mono">{control.lastChecked}</span>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 mt-2 text-xs leading-relaxed">
                {control.description}
              </p>

              <div className="mt-2.5 p-2 rounded bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                <span className="text-slate-400 font-sans font-semibold mr-1">Evidencia Técnica:</span>
                {control.auditEvidence}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial / Lead Engineer Statement */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <img
          src="/src/assets/images/engineer_lead_avatar_1793938366378.jpg"
          alt="Ing. Roberto Alarcón, Arquitecto Principal"
          referrerPolicy="no-referrer"
          className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500 shrink-0"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="space-y-2 text-center md:text-left">
          <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
            &ldquo;El rigor en la arquitectura desacoplada, la tipificación estricta en TypeScript de extremo a extremo y la implementación de políticas ISO 27001 permitieron consolidar el objetivo: una plataforma corporativa robusta que soporta picos masivos de tráfico manteniendo una latencia inferior a 15ms y un uptime ininterrumpido.&rdquo;
          </p>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span className="font-bold text-slate-900 dark:text-white font-sans">Ing. Roberto Alarcón</span> · Arquitecto Principal de Software & Ciberseguridad · Proyecto 5
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-2xl space-y-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-mono font-bold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                Certificación de Auditoría Técnica
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Dictamen de Ciberseguridad ISO/IEC 27001
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Dictamen #P5-ISO-2026-988 · Emisión: 2026-11-05
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-2 text-left">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                <span className="text-slate-400">Aplicación Evaluada:</span>
                <span className="font-semibold text-slate-900 dark:text-white">Proyecto 5 — Desarrollo Web Full-Stack</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                <span className="text-slate-400">Grado Otorgado:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">Grado A+ (Cumplimiento Total)</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                <span className="text-slate-400">Disponibilidad Medida:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">99.98% SLA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Desempeño Lighthouse:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">98 / 100</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cerrar Visor
              </button>
              <button
                onClick={() => {
                  alert('Certificado de cumplimiento ISO 27001 descargado en formato PDF firmado digitalmente.');
                  setShowCertificateModal(false);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-sm transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Descargar PDF Oficial</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
