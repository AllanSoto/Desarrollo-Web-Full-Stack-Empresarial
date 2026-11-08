import React, { useState } from 'react';
import { 
  Database, 
  Play, 
  Download, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Table as TableIcon,
  RefreshCw,
  Server
} from 'lucide-react';
import { PRESET_SQL_QUERIES, SQL_SERVER_POOL, MYSQL_POOL } from '../data/mockEnterpriseData';
import { ConnectionPoolStatus, SqlQueryResult } from '../types';

export const SQLStudio: React.FC = () => {
  const [selectedEngine, setSelectedEngine] = useState<'SQL Server (T-SQL)' | 'MySQL 8.0 Enterprise'>('SQL Server (T-SQL)');
  const [currentQueryIndex, setCurrentQueryIndex] = useState<number>(0);
  const [queryText, setQueryText] = useState<string>(PRESET_SQL_QUERIES[0].sql);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<SqlQueryResult>({
    query: PRESET_SQL_QUERIES[0].sql,
    executionTimeMs: 2.8,
    rowCount: PRESET_SQL_QUERIES[0].rows.length,
    columns: PRESET_SQL_QUERIES[0].columns,
    rows: PRESET_SQL_QUERIES[0].rows,
    timestamp: new Date().toLocaleTimeString(),
  });

  const activePool: ConnectionPoolStatus = selectedEngine === 'SQL Server (T-SQL)' ? SQL_SERVER_POOL : MYSQL_POOL;

  const handleSelectPreset = (index: number) => {
    setCurrentQueryIndex(index);
    setQueryText(PRESET_SQL_QUERIES[index].sql);
  };

  const handleExecuteQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const preset = PRESET_SQL_QUERIES[currentQueryIndex];
      const randomLatency = Number((Math.random() * 1.8 + 2.1).toFixed(1));
      setExecutionResult({
        query: queryText,
        executionTimeMs: randomLatency,
        rowCount: preset ? preset.rows.length : 1,
        columns: preset ? preset.columns : ['status', 'message'],
        rows: preset ? preset.rows : [{ status: 'OK', message: 'Sentencia ejecutada en pool nativo.' }],
        timestamp: new Date().toLocaleTimeString(),
      });
      setIsExecuting(false);
    }, 350);
  };

  const handleExportCSV = () => {
    if (!executionResult || executionResult.rows.length === 0) return;
    const header = executionResult.columns.join(',');
    const rows = executionResult.rows.map((r) =>
      executionResult.columns.map((col) => `"${r[col] ?? ''}"`).join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [header, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sql_results_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <span>Capa de Persistencia Relacional</span>
            <span aria-hidden="true">·</span>
            <span>Pool de Sockets Transaccionales</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Persistencia en SQL Server & MySQL
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Consola interactiva de consultas con monitor de latencias, transacciones ACID y pool de conexiones en caliente.
          </p>
        </div>

        {/* Engine Toggle Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
          <button
            onClick={() => setSelectedEngine('SQL Server (T-SQL)')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              selectedEngine === 'SQL Server (T-SQL)'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            SQL Server (T-SQL)
          </button>
          <button
            onClick={() => setSelectedEngine('MySQL 8.0 Enterprise')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              selectedEngine === 'MySQL 8.0 Enterprise'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            MySQL 8.0 Enterprise
          </button>
        </div>
      </div>

      {/* Connection Pool Status Bar */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                Pool Activo: {activePool.database}
              </span>
              <span className="text-xs font-mono text-slate-500">
                ({activePool.host}:{activePool.port})
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Gestión de conexiones persistentes para mitigar overhead de handshakes SSL/TLS en cada query.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase font-sans">Conexiones Activas</div>
              <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                {activePool.activeConnections} / {activePool.maxConnections}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase font-sans">En Reserva (Idle)</div>
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {activePool.idleConnections}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase font-sans">Cola de Espera</div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                {activePool.queuedRequests} req
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase font-sans">Latencia Query Media</div>
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {activePool.avgLatencyMs} ms
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Query Studio Section */}
      <div className="space-y-4">
        {/* Presets and Query Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Plantillas de Consulta Optimizadas:
            </span>
            <div className="flex flex-wrap gap-1">
              {PRESET_SQL_QUERIES.map((preset, idx) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(idx)}
                  className={`px-2.5 py-1 text-xs rounded-md border transition-colors cursor-pointer ${
                    currentQueryIndex === idx
                      ? 'bg-indigo-50 border-indigo-300 dark:bg-indigo-950/60 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {preset.title.split(' ')[0]} {preset.title.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExecuteQuery}
              disabled={isExecuting}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              {isExecuting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Ejecutando...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Ejecutar Consulta (F5)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Query Editor Box */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs">
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <TableIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Editor SQL · {selectedEngine}</span>
            </span>
            <span>ANSI SQL / ACID Transaccional</span>
          </div>
          <textarea
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            rows={7}
            className="w-full p-4 bg-transparent text-slate-200 focus:outline-none resize-y text-xs leading-relaxed"
          />
        </div>

        {/* Tabular Results Table */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-900 dark:text-white">
                Conjunto de Resultados ({executionResult.rowCount} registros)
              </span>
              <span className="text-slate-400">·</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold tabular-nums">
                Tiempo de Ejecución: {executionResult.executionTimeMs} ms
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500 font-mono">{executionResult.timestamp}</span>
            </div>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-100/70 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                <tr>
                  {executionResult.columns.map((col) => (
                    <th key={col} className="py-2.5 px-4 font-semibold uppercase tracking-wider text-[11px]">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 dark:divide-slate-800/60">
                {executionResult.rows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    {executionResult.columns.map((col) => (
                      <td key={col} className="py-2.5 px-4 text-slate-800 dark:text-slate-200 tabular-nums">
                        {String(row[col] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
