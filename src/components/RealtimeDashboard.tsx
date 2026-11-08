import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Server, 
  Database, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  Cpu, 
  Layers, 
  ArrowUpRight,
  Clock,
  Play,
  Pause
} from 'lucide-react';
import { INITIAL_CLUSTER_NODES, SQL_SERVER_POOL, MYSQL_POOL } from '../data/mockEnterpriseData';
import { LiveTelemetry } from '../types';

interface RealtimeDashboardProps {
  onOpenSQL: () => void;
  onOpenRBAC: () => void;
  onOpenInfra: () => void;
}

export const RealtimeDashboard: React.FC<RealtimeDashboardProps> = ({
  onOpenSQL,
  onOpenRBAC,
  onOpenInfra,
}) => {
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [telemetry, setTelemetry] = useState<LiveTelemetry>({
    requestsPerSecond: 184,
    avgLatencyMs: 14.2,
    p99LatencyMs: 28.5,
    activeSessions: 342,
    uptimePercent: 99.98,
    memoryUsageMb: 563.2,
    cpuTotalPercent: 24.8,
    errorRatePercent: 0.002,
  });

  const [recentLogs, setRecentLogs] = useState([
    { id: 1, time: '20:18:14', type: 'INFO', msg: 'GET /api/v1/database/pool-status [200 OK] 3.1ms', ip: '10.0.4.12' },
    { id: 2, time: '20:18:12', type: 'AUTH', msg: 'Token JWT validado RS256 sub:usr-901 rol:SUPER_ADMIN', ip: '192.168.1.45' },
    { id: 3, time: '20:18:09', type: 'SQL', msg: 'Transacción ACID completada en SQL Server (latencia: 2.8ms)', ip: 'sqlsrv-clus01' },
    { id: 4, time: '20:18:06', type: 'NGINX', msg: 'Proxy upstream round-robin hacia core-worker-2:8083', ip: '172.16.0.5' },
    { id: 5, time: '20:18:01', type: 'AUDIT', msg: 'Control ISO 27001 A.9.4.2 verificado satisfactoriamente', ip: 'audit-agent' },
  ]);

  // Simulate real-time subtle telemetry updates when streaming is enabled
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const deltaReq = Math.floor(Math.random() * 21) - 10;
        const deltaLatency = (Math.random() * 0.8 - 0.4);
        return {
          ...prev,
          requestsPerSecond: Math.max(120, Math.min(320, prev.requestsPerSecond + deltaReq)),
          avgLatencyMs: Number(Math.max(10, Math.min(22, prev.avgLatencyMs + deltaLatency)).toFixed(1)),
          p99LatencyMs: Number(Math.max(22, Math.min(38, prev.p99LatencyMs + deltaLatency * 1.2)).toFixed(1)),
          activeSessions: prev.activeSessions + (Math.random() > 0.5 ? 1 : -1),
          cpuTotalPercent: Number((22 + Math.random() * 6).toFixed(1)),
          memoryUsageMb: Number((560 + Math.random() * 12).toFixed(1)),
        };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const handleBurstTraffic = () => {
    setTelemetry((prev) => ({
      ...prev,
      requestsPerSecond: prev.requestsPerSecond + 150,
      avgLatencyMs: Number((prev.avgLatencyMs + 4.2).toFixed(1)),
      cpuTotalPercent: Number((prev.cpuTotalPercent + 12).toFixed(1)),
    }));

    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      type: 'SCALE',
      msg: 'Pico de concurrencia detectado (+150 req/s). PM2 y Nginx redistribuyendo carga sin encolamiento.',
      ip: 'auto-scaler',
    };
    setRecentLogs((prev) => [newLog, ...prev.slice(0, 5)]);
  };

  return (
    <div className="space-y-8">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <span>Operaciones de Producción</span>
            <span aria-hidden="true">·</span>
            <span>Telemetría L7 & Estado de Nodos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Panel de Control en Tiempo Real
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Métricas vivas de rendimiento, salud de clúster PM2, pool de bases de datos y cumplimiento de SLAs.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isStreaming ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-500" />
                <span>Pausar Flujo</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-500" />
                <span>Reanudar Flujo</span>
              </>
            )}
          </button>

          <button
            onClick={handleBurstTraffic}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Simular Carga (+150 req/s)</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Operational Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Rendimiento / Throughput */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Rendimiento HTTP</span>
            <Activity className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
            {telemetry.requestsPerSecond} <span className="text-xs font-normal text-slate-500 font-sans">req / seg</span>
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span>Capacidad clúster: 4,000 req/s</span>
          </div>
        </div>

        {/* Metric 2: Latencia Promedio */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Latencia Media (TTFB)</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
            {telemetry.avgLatencyMs} <span className="text-xs font-normal text-slate-500 font-sans">ms</span>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>p99: {telemetry.p99LatencyMs} ms</span>
            <span className="text-emerald-500 font-semibold font-mono">Nominal</span>
          </div>
        </div>

        {/* Metric 3: Sesiones Activas & JWTs */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Sesiones JWT Activas</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
            {telemetry.activeSessions}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>Cifrado RS256</span>
            <span className="text-slate-400 font-mono">0 revocadas</span>
          </div>
        </div>

        {/* Metric 4: Disponibilidad Contractual */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Disponibilidad Mensual</span>
            <Server className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
            99.98%
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>SLA: 99.90%</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">En Cumplimiento</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Cluster Health + Database Pools status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* PM2 Cluster Nodes (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Estado del Clúster PM2 (4 Workers Multiproceso)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Instancias de Express balanceadas localmente bajo supervisión automática
              </p>
            </div>
            <button
              onClick={onOpenInfra}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Configuración Nginx</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="py-2.5 font-medium">Instancia</th>
                  <th className="py-2.5 font-medium">PID</th>
                  <th className="py-2.5 font-medium">Puerto</th>
                  <th className="py-2.5 font-medium text-right">CPU</th>
                  <th className="py-2.5 font-medium text-right">Memoria</th>
                  <th className="py-2.5 font-medium text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                {INITIAL_CLUSTER_NODES.map((node) => (
                  <tr key={node.instanceId} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 font-sans font-medium text-slate-900 dark:text-slate-200">
                      {node.name}
                    </td>
                    <td className="py-2.5 text-slate-500 tabular-nums">{node.pid}</td>
                    <td className="py-2.5 text-slate-500 tabular-nums">:{node.port}</td>
                    <td className="py-2.5 text-right tabular-nums text-slate-800 dark:text-slate-200">
                      {(node.cpu + (Math.random() * 2 - 1)).toFixed(1)}%
                    </td>
                    <td className="py-2.5 text-right tabular-nums text-slate-800 dark:text-slate-200">
                      {node.memoryMb.toFixed(1)} MB
                    </td>
                    <td className="py-2.5 text-right">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-sans">
                        ONLINE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Database Connection Pools (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Pool de Conexiones SQL
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                SQL Server & MySQL réplica HA
              </p>
            </div>
            <button
              onClick={onOpenSQL}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Abrir SQL Studio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* SQL Server Pool */}
            <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 space-y-2">
              <div className="flex items-center justify-between font-medium">
                <span className="text-slate-900 dark:text-white font-sans font-semibold">SQL Server (T-SQL Prod)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold">Latencia: 3.2 ms</span>
              </div>
              <div className="flex justify-between text-slate-500 font-mono text-[11px]">
                <span>Activas: {SQL_SERVER_POOL.activeConnections} / {SQL_SERVER_POOL.maxConnections}</span>
                <span>En Reserva: {SQL_SERVER_POOL.idleConnections}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                <div style={{ width: '36%' }} className="bg-indigo-600" />
                <div style={{ width: '64%' }} className="bg-emerald-500/50" />
              </div>
            </div>

            {/* MySQL Pool */}
            <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 space-y-2">
              <div className="flex items-center justify-between font-medium">
                <span className="text-slate-900 dark:text-white font-sans font-semibold">MySQL 8.0 Enterprise (Replica)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold">Latencia: 2.8 ms</span>
              </div>
              <div className="flex justify-between text-slate-500 font-mono text-[11px]">
                <span>Activas: {MYSQL_POOL.activeConnections} / {MYSQL_POOL.maxConnections}</span>
                <span>En Reserva: {MYSQL_POOL.idleConnections}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
                <div style={{ width: '30%' }} className="bg-indigo-600" />
                <div style={{ width: '70%' }} className="bg-emerald-500/50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Live Audit & Incident Stream */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Trazas de Auditoría y Eventos de Red en Tiempo Real
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Formato de Registro ISO 27001 Estricto
          </span>
        </div>

        <div className="divide-y divide-slate-150 dark:divide-slate-800/70 font-mono text-xs">
          {recentLogs.map((log) => (
            <div key={log.id} className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-3">
                <span className="text-slate-400 tabular-nums text-[11px]">{log.time}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  log.type === 'AUTH' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300' :
                  log.type === 'SQL' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300' :
                  log.type === 'SCALE' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300' :
                  'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {log.type}
                </span>
                <span className="text-slate-800 dark:text-slate-200">{log.msg}</span>
              </div>
              <span className="text-slate-400 text-[11px] tabular-nums self-end sm:self-auto">
                {log.ip}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
