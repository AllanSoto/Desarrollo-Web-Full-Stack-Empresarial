import React, { useState } from 'react';
import { 
  Layout, 
  ShieldAlert, 
  Database, 
  Server, 
  Check, 
  ArrowRight, 
  Code2, 
  CheckCircle2, 
  Lock, 
  Layers, 
  Cpu, 
  Activity,
  Terminal,
  RefreshCw
} from 'lucide-react';

interface ArchitectureStepsProps {
  onOpenStepSubsystem: (subsystem: string) => void;
}

export const ArchitectureSteps: React.FC<ArchitectureStepsProps> = ({
  onOpenStepSubsystem,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [interactivePayload, setInteractivePayload] = useState<string>(
    JSON.stringify(
      {
        nombre: 'Valeria Cárdenas',
        email: 'valeria.cardenas@empresa.com',
        rol: 'SECURITY_AUDITOR',
        permisos: ['audit:read', 'audit:export'],
      },
      null,
      2
    )
  );
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    errors: string[];
    validatedAt?: string;
  } | null>(null);

  const [poolSimulation, setPoolSimulation] = useState({
    active: 18,
    idle: 32,
    max: 50,
    status: 'Conexión Estable (3.2 ms)',
  });

  const [rollingReloading, setRollingReloading] = useState<boolean>(false);
  const [reloadLog, setReloadLog] = useState<string[]>([]);

  const handleValidatePayload = () => {
    try {
      const parsed = JSON.parse(interactivePayload);
      const errors: string[] = [];
      if (!parsed.nombre || typeof parsed.nombre !== 'string') {
        errors.push("El campo 'nombre' es obligatorio y debe ser texto.");
      }
      if (!parsed.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parsed.email)) {
        errors.push("El campo 'email' debe ser un correo electrónico válido.");
      }
      if (!parsed.rol || !['SUPER_ADMIN', 'DEVOPS_LEAD', 'DBA_SPECIALIST', 'SECURITY_AUDITOR', 'OPERATOR'].includes(parsed.rol)) {
        errors.push("El campo 'rol' contiene un valor no autorizado según catálogo RBAC.");
      }
      if (!Array.isArray(parsed.permisos)) {
        errors.push("El campo 'permisos' debe ser una lista de cadenas permitidas.");
      }

      if (errors.length === 0) {
        setValidationResult({
          valid: true,
          errors: [],
          validatedAt: new Date().toLocaleTimeString(),
        });
      } else {
        setValidationResult({
          valid: false,
          errors,
          validatedAt: new Date().toLocaleTimeString(),
        });
      }
    } catch (e: any) {
      setValidationResult({
        valid: false,
        errors: ['JSON Malformado: ' + e.message],
        validatedAt: new Date().toLocaleTimeString(),
      });
    }
  };

  const handleSimulateClusterReload = () => {
    setRollingReloading(true);
    setReloadLog(['Iniciando PM2 graceful reload: pm2 reload ecosystem.config.js...']);

    setTimeout(() => {
      setReloadLog((prev) => [...prev, '[Worker 0] Tráfico drenado. Proceso 14820 reiniciado -> PID 15101 (0 downtime)']);
    }, 600);

    setTimeout(() => {
      setReloadLog((prev) => [...prev, '[Worker 1] Tráfico drenado. Proceso 14821 reiniciado -> PID 15102 (0 downtime)']);
    }, 1200);

    setTimeout(() => {
      setReloadLog((prev) => [...prev, '[Worker 2] Tráfico drenado. Proceso 14822 reiniciado -> PID 15103 (0 downtime)']);
    }, 1800);

    setTimeout(() => {
      setReloadLog((prev) => [
        ...prev,
        '[Worker 3] Tráfico drenado. Proceso 14823 reiniciado -> PID 15104 (0 downtime)',
        '✓ Recarga completada exitosamente. 0 solicitudes descartadas. Nginx upstream nominal.',
      ]);
      setRollingReloading(false);
    }, 2400);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Metodología de Ingeniería
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
          Pasos de la Arquitectura & Flujo de Trabajo
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Recorrido estructurado por las 4 fases arquitectónicas que garantizan el 99.9% de disponibilidad, el puntaje 98/100 en Lighthouse y el Grado A+ de ciberseguridad.
        </p>
      </div>

      {/* 4 Interactive Step Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Step 1 */}
        <button
          onClick={() => setActiveStep(1)}
          className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
            activeStep === 1
              ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-sm'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
              PASO 01
            </span>
            <Layout className="w-4 h-4 text-slate-400" />
          </div>
          <div className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
            Interfaz Responsiva React & Tailwind
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
            Tipografía optimizada, componentes modulares y 98/100 en Core Web Vitals.
          </p>
        </button>

        {/* Step 2 */}
        <button
          onClick={() => setActiveStep(2)}
          className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
            activeStep === 2
              ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-sm'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
              PASO 02
            </span>
            <Lock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
            API RESTful & Control de Roles (RBAC)
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
            Validación de payload en tiempo de compilación y tokens JWT RS256 seguros.
          </p>
        </button>

        {/* Step 3 */}
        <button
          onClick={() => setActiveStep(3)}
          className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
            activeStep === 3
              ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-sm'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
              PASO 03
            </span>
            <Database className="w-4 h-4 text-slate-400" />
          </div>
          <div className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
            Persistencia SQL & Connection Pool
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
            Conexión nativa a SQL Server / MySQL con pool de conexiones optimizado.
          </p>
        </button>

        {/* Step 4 */}
        <button
          onClick={() => setActiveStep(4)}
          className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
            activeStep === 4
              ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-sm'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
              PASO 04
            </span>
            <Server className="w-4 h-4 text-slate-400" />
          </div>
          <div className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
            PM2 Cluster, Nginx & SSL TLS 1.3
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
            Modo clúster multihilo, proxy inverso de alta velocidad y certificados SSL.
          </p>
        </button>
      </div>

      {/* Active Step Detailed Content */}
      <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm space-y-8">
        {/* Step 1 Details */}
        {activeStep === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-5">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                  Fase de Presentación
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  1. Diseño de Interfaz Responsiva en React con TypeScript y Tailwind CSS
                </h3>
              </div>
              <button
                onClick={() => onOpenStepSubsystem('dashboard')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer self-start md:self-auto"
              >
                <span>Ver Componentes en Vivo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Objetivos de Arquitectura UX / UI
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Sin latencia visual ni CLS (0.00):</strong> Layout shift prevenido mediante dimensiones explícitas y skeleton loaders en carga diferida.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Accesibilidad WCAG AA:</strong> Ratios de contraste superiores a 4.5:1 en textos corporativos y foco visible interactivo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Cero jitter numérico:</strong> Integración estricta de <code>tabular-nums</code> y fuentes monoespaciadas para métricas de latencia y finanzas.</span>
                  </li>
                </ul>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    Resultados de Auditoría Google Lighthouse
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">98</div>
                      <div className="text-[10px] text-slate-500">Performance</div>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">100</div>
                      <div className="text-[10px] text-slate-500">Accessibility</div>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">100</div>
                      <div className="text-[10px] text-slate-500">Best Practices</div>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">100</div>
                      <div className="text-[10px] text-slate-500">SEO</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs">
                <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>src/components/DataTable.tsx</span>
                  <span>TypeScript + Tailwind v4</span>
                </div>
                <pre className="p-4 overflow-x-auto text-[11px] leading-relaxed">
{`// Componente de tabla empresarial con alineación tabular
export const MetricGrid: React.FC<Props> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {metrics.map((m) => (
        <div key={m.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900">
          <div className="text-xs text-slate-400">{m.label}</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-white">
            {m.formattedValue}
          </div>
          <span className="text-[11px] text-emerald-400">
            {m.trend}
          </span>
        </div>
      ))}
    </div>
  );
};`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 Details */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-5">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                  Fase de Lógica y Seguridad
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  2. Construcción de API RESTful con Validación Estricta de Payloads y RBAC
                </h3>
              </div>
              <button
                onClick={() => onOpenStepSubsystem('rbac')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer self-start md:self-auto"
              >
                <span>Abrir Gestor RBAC</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Interactive Payload Validator */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Probador de Validación de Payload (Esquema Tipado)
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">POST /api/v1/users</span>
                </div>
                <textarea
                  value={interactivePayload}
                  onChange={(e) => setInteractivePayload(e.target.value)}
                  rows={8}
                  className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleValidatePayload}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Validar Payload Contra Esquema
                  </button>
                  <button
                    onClick={() => {
                      setInteractivePayload(
                        JSON.stringify(
                          {
                            nombre: 12345, // invalid
                            email: 'correo-invalido',
                            rol: 'ROL_INVENTADO',
                            permisos: 'no_es_arreglo',
                          },
                          null,
                          2
                        )
                      );
                    }}
                    className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline cursor-pointer"
                  >
                    Probar Payload Erróneo
                  </button>
                </div>

                {validationResult && (
                  <div
                    className={`p-3 rounded-lg border text-xs font-mono ${
                      validationResult.valid
                        ? 'border-emerald-500/40 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                        : 'border-red-500/40 bg-red-50/60 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-2">
                      {validationResult.valid ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span>PAYLOAD VÁLIDO (200 OK) · {validationResult.validatedAt}</span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="w-4 h-4 text-red-500" />
                          <span>ERROR 422 UNPROCESSABLE ENTITY</span>
                        </>
                      )}
                    </div>
                    {validationResult.errors.length > 0 && (
                      <ul className="mt-2 list-disc list-inside space-y-1 text-[11px]">
                        {validationResult.errors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* JWT Claims breakdown */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Estructura del Token de Seguridad JWT (RS256)
                </h4>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs space-y-2">
                  <div className="text-indigo-400 font-bold">// Cabecera (Header)</div>
                  <div className="text-slate-400">{'{"alg": "RS256", "typ": "JWT", "kid": "corp-key-2026-v1"}'}</div>
                  <div className="text-emerald-400 font-bold pt-2">// Payload Declarativo (Claims)</div>
                  <div className="text-slate-200">
{`{
  "sub": "usr-901",
  "name": "Carlos Mendoza",
  "role": "SUPER_ADMIN",
  "permissions": ["*"],
  "iss": "enterprise.auth.internal",
  "exp": 1784835600,
  "iat": 1784832000
}`}
                  </div>
                  <div className="text-amber-400 font-bold pt-2">// Firma Asimétrica</div>
                  <div className="text-[10px] text-slate-500 truncate">
                    RSASHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), RSA_PRIVATE_KEY)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 Details */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-5">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                  Fase de Persistencia
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  3. Integración de Capa de Persistencia en SQL Server / MySQL con Pool de Conexiones
                </h3>
              </div>
              <button
                onClick={() => onOpenStepSubsystem('sql')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer self-start md:self-auto"
              >
                <span>Abrir SQL Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Mecánica del Pool de Conexiones Empresarial
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Evita el costo de negociación del handshake TCP y TLS en cada petición HTTP, reutilizando conexiones seguras en caliente para SQL Server y réplicas de lectura en MySQL.
                </p>

                {/* Live Pool Visualizer */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span>Estado del Pool en SQL Server:</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">{poolSimulation.status}</span>
                  </div>

                  {/* Visual Connection Slots */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Conexiones Activas ({poolSimulation.active} / {poolSimulation.max})</span>
                      <span>Disponibles en Reserva ({poolSimulation.idle})</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                      <div
                        style={{ width: `${(poolSimulation.active / poolSimulation.max) * 100}%` }}
                        className="bg-indigo-600 transition-all duration-300"
                      />
                      <div
                        style={{ width: `${(poolSimulation.idle / poolSimulation.max) * 100}%` }}
                        className="bg-emerald-500/60 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-400 text-[10px]">Min Pool</div>
                      <div className="font-mono font-bold text-slate-800 dark:text-slate-200">10</div>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-400 text-[10px]">Max Pool</div>
                      <div className="font-mono font-bold text-slate-800 dark:text-slate-200">50</div>
                    </div>
                    <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-slate-400 text-[10px]">Queue Wait</div>
                      <div className="font-mono font-bold text-emerald-500">0 req</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const nextActive = Math.floor(Math.random() * 15) + 12;
                      setPoolSimulation({
                        active: nextActive,
                        idle: 50 - nextActive,
                        max: 50,
                        status: `Latencia promedio: ${(Math.random() * 2 + 2.5).toFixed(1)} ms`,
                      });
                    }}
                    className="w-full py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Simular Petición Concurrente al Pool
                  </button>
                </div>
              </div>

              {/* Code Snippet for Pool Configuration */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs">
                <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>src/db/connectionPool.ts</span>
                  <span>mssql / mysql2 pool config</span>
                </div>
                <pre className="p-4 overflow-x-auto text-[11px] leading-relaxed">
{`import sql from 'mssql';

export const sqlServerConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: 'sqlsrv-prod-clus01.corp.internal',
  database: 'EnterpriseCoreDB_Prod',
  options: {
    encrypt: true, // Forzar TLS para ISO 27001
    trustServerCertificate: false,
    enableArithAbort: true,
  },
  pool: {
    min: 10,
    max: 50,
    idleTimeoutMillis: 30000,
    acquireTimeoutMillis: 15000,
  },
};`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 Details */}
        {activeStep === 4 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-5">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                  Fase de Despliegue e Infraestructura
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  4. Configuración de Servidor con PM2 Cluster Mode, Nginx Reverse Proxy y SSL
                </h3>
              </div>
              <button
                onClick={() => onOpenStepSubsystem('infraestructura')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer self-start md:self-auto"
              >
                <span>Inspeccionar Clúster PM2</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Despliegue Sin Interrupción (Zero-Downtime Rolling Reload)
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  PM2 gestiona 4 procesos Node.js en paralelo compartiendo el mismo puerto mediante IPC del kernel. Cuando se aplica un cambio, reinicia un worker a la vez esperando que esté listo antes de apagar el anterior.
                </p>

                {/* Interactive Zero-Downtime Reload Simulator */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Simulación de Recarga en Caliente
                    </span>
                    <button
                      onClick={handleSimulateClusterReload}
                      disabled={rollingReloading}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${rollingReloading ? 'animate-spin' : ''}`} />
                      <span>{rollingReloading ? 'Recargando...' : 'Ejecutar pm2 reload app'}</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 text-slate-300 font-mono text-[11px] min-h-[100px] max-h-[140px] overflow-y-auto space-y-1">
                    {reloadLog.length === 0 ? (
                      <span className="text-slate-500">Presione el botón para simular una recarga escalonada con 0 downtime...</span>
                    ) : (
                      reloadLog.map((log, idx) => (
                        <div key={idx} className={log.includes('✓') ? 'text-emerald-400 font-bold' : ''}>
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Nginx Configuration Viewer */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs">
                <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>/etc/nginx/conf.d/enterprise.conf</span>
                  <span>Nginx Reverse Proxy + SSL</span>
                </div>
                <pre className="p-4 overflow-x-auto text-[11px] leading-relaxed">
{`upstream backend_cluster {
    least_conn; # Balanceo inteligente por menor número de conexiones
    server 127.0.0.1:8081 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:8082 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:8083 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:8084 max_fails=3 fail_timeout=10s;
    keepalive 64;
}

server {
    listen 443 ssl http2;
    server_name core.empresa.com;

    # SSL Ciphersuite TLS 1.3 - Grado A+
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;

    location / {
        proxy_pass http://backend_cluster;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
