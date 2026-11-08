import React, { useState } from 'react';
import { 
  Server, 
  ShieldCheck, 
  Cpu, 
  RefreshCw, 
  Activity, 
  CheckCircle2, 
  Lock, 
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { INITIAL_CLUSTER_NODES } from '../data/mockEnterpriseData';
import { ClusterNode } from '../types';

export const InfrastructurePM2Nginx: React.FC = () => {
  const [nodes, setNodes] = useState<ClusterNode[]>(INITIAL_CLUSTER_NODES);
  const [isReloadingCluster, setIsReloadingCluster] = useState<boolean>(false);
  const [activeNginxTab, setActiveNginxTab] = useState<'upstream' | 'security' | 'ssl'>('upstream');
  const [activeLogNode, setActiveLogNode] = useState<number>(0);

  const handleRollingReload = () => {
    setIsReloadingCluster(true);
    let currentNode = 0;

    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((n, i) => {
          if (i === currentNode) {
            return {
              ...n,
              status: 'reloading',
              pid: n.pid + 100,
              uptimeSeconds: 0,
              restarts: n.restarts + 1,
            };
          }
          return n;
        })
      );

      setTimeout(() => {
        setNodes((prev) =>
          prev.map((n, i) => (i === currentNode ? { ...n, status: 'online' } : n))
        );
      }, 500);

      currentNode++;
      if (currentNode >= 4) {
        clearInterval(interval);
        setTimeout(() => setIsReloadingCluster(false), 600);
      }
    }, 700);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <span>Infraestructura & Despliegue de Servidores</span>
            <span aria-hidden="true">·</span>
            <span>Alta Disponibilidad 99.9%</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            PM2 Cluster Mode, Nginx & Certificados SSL
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
            Orquestación de procesos multiproceso en Node.js, proxy inverso con terminación TLS 1.3 y tolerancia a fallos.
          </p>
        </div>

        <button
          onClick={handleRollingReload}
          disabled={isReloadingCluster}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isReloadingCluster ? 'animate-spin' : ''}`} />
          <span>{isReloadingCluster ? 'Ejecutando Rolling Reload...' : 'pm2 reload app (Zero Downtime)'}</span>
        </button>
      </div>

      {/* PM2 Cluster Nodes Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <Cpu className="w-4 h-4 text-indigo-500" />
            <span>Workers del Clúster PM2 (Modo Cluster IPC)</span>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            4 Nodos Activos en Puertos 8081-8084
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nodes.map((node) => (
            <div
              key={node.instanceId}
              className={`p-4 rounded-xl border bg-white dark:bg-slate-900/70 shadow-sm space-y-3 transition-all ${
                node.status === 'reloading'
                  ? 'border-amber-500 dark:border-amber-500 ring-2 ring-amber-500/20'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 dark:text-white text-xs">
                  {node.name}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    node.status === 'online'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 animate-pulse'
                  }`}
                >
                  {node.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <div className="text-[10px] text-slate-400">PID</div>
                  <div className="text-slate-800 dark:text-slate-200 tabular-nums">{node.pid}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Puerto</div>
                  <div className="text-slate-800 dark:text-slate-200 tabular-nums">:{node.port}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">CPU</div>
                  <div className="text-indigo-600 dark:text-indigo-400 font-bold tabular-nums">
                    {node.cpu.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Memoria</div>
                  <div className="text-slate-800 dark:text-slate-200 tabular-nums">
                    {node.memoryMb.toFixed(1)} MB
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-150 dark:border-slate-800 flex justify-between text-[11px] text-slate-500">
                <span>Reinicios: {node.restarts}</span>
                <button
                  onClick={() => setActiveLogNode(node.instanceId)}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Ver logs
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nginx & SSL Configuration Tabs */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-150 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Capa de Proxy Inverso Nginx & Seguridad SSL
            </h3>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <button
              onClick={() => setActiveNginxTab('upstream')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeNginxTab === 'upstream'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Upstream & Load Balancing
            </button>
            <button
              onClick={() => setActiveNginxTab('security')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeNginxTab === 'security'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Cabeceras ISO 27001
            </button>
            <button
              onClick={() => setActiveNginxTab('ssl')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeNginxTab === 'ssl'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Certificado SSL (Grado A+)
            </button>
          </div>
        </div>

        {/* Tab 1: Upstream Config */}
        {activeNginxTab === 'upstream' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Algoritmo Least-Connections y Keepalive
              </h4>
              <p>
                Nginx distribuye las peticiones entrantes hacia el worker de Node.js con menor número de conexiones activas en ese milisegundo (<code>least_conn</code>), evitando saturación de un hilo específico del Event Loop.
              </p>
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Pool keepalive de 64 sockets TCP persistentes entre Nginx y PM2.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Detección automática de fallos con <code>fail_timeout=10s</code>.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Compresión gzip y brotli para assets estáticos y JSON.</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs">
              <div className="px-3 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
                nginx.conf — upstream block
              </div>
              <pre className="p-3 text-[11px] leading-relaxed">
{`upstream backend_cluster {
    least_conn;
    server 127.0.0.1:8081 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:8082 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:8083 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:8084 max_fails=3 fail_timeout=10s;
    keepalive 64;
}`}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 2: Security Headers */}
        {activeNginxTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Cabeceras HTTP de Seguridad según ISO 27001
              </h4>
              <p>
                Inyección obligatoria de cabeceras en el proxy reverso para mitigar ataques de clickjacking, sniffing de MIME types y cross-site scripting (XSS).
              </p>
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs">
                <strong>Verificación en auditoría:</strong> 0 alertas detectadas en escaneo con OWASP ZAP.
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-300 font-mono text-xs">
              <div className="px-3 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
                nginx.conf — security headers
              </div>
              <pre className="p-3 text-[11px] leading-relaxed">
{`add_header Strict-Transport-Security 
    "max-age=63072000; includeSubDomains; preload" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy 
    "default-src 'self'; script-src 'self' 'unsafe-inline'; ...";`}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: SSL TLS 1.3 */}
        {activeNginxTab === 'ssl' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                <div className="text-[10px] text-slate-400 uppercase font-sans">Protocolos Criptográficos</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">TLSv1.3 & TLSv1.2</div>
                <div className="text-[10px] text-emerald-500 mt-1 font-sans">TLS 1.0 y 1.1 deshabilitados</div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                <div className="text-[10px] text-slate-400 uppercase font-sans">Cifrado de Clave Asimétrica</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">RSA 4096-bit / ECC P-384</div>
                <div className="text-[10px] text-slate-400 mt-1 font-sans">Perfect Forward Secrecy (PFS)</div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                <div className="text-[10px] text-slate-400 uppercase font-sans">Calificación SSL Labs</div>
                <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1">Grado A+ Certificado</div>
                <div className="text-[10px] text-emerald-500 mt-1 font-sans">HSTS Preload activo</div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
              <div>
                <strong>Validez del Certificado:</strong> Expira el 14 de Noviembre de 2027 (Renovación automática vía Certbot ACME v2 con DNS-01 challenge).
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">EN VIGOR</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
