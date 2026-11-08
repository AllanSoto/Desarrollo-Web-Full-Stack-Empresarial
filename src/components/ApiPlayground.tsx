import React, { useState } from 'react';
import { 
  Code2, 
  Send, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { API_ENDPOINTS } from '../data/mockEnterpriseData';
import { ApiEndpoint } from '../types';

export const ApiPlayground: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(API_ENDPOINTS[0]);
  const [requestPayload, setRequestPayload] = useState<string>(
    selectedEndpoint.samplePayload ? JSON.stringify(selectedEndpoint.samplePayload, null, 2) : ''
  );
  const [includeAuthHeader, setIncludeAuthHeader] = useState<boolean>(true);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [responseOutput, setResponseOutput] = useState<{
    status: number;
    latencyMs: number;
    headers: Record<string, string>;
    data: any;
    timestamp: string;
  } | null>(null);

  const [copied, setCopied] = useState<boolean>(false);

  const handleSelectEndpoint = (ep: ApiEndpoint) => {
    setSelectedEndpoint(ep);
    setRequestPayload(ep.samplePayload ? JSON.stringify(ep.samplePayload, null, 2) : '');
    setResponseOutput(null);
  };

  const handleSendRequest = () => {
    setIsExecuting(true);
    setTimeout(() => {
      // Simulate real auth check
      if (selectedEndpoint.requiresAuth && !includeAuthHeader) {
        setResponseOutput({
          status: 401,
          latencyMs: 4.8,
          headers: {
            'content-type': 'application/json; charset=utf-8',
            'www-authenticate': 'Bearer realm="EnterpriseCore"',
            'x-request-id': `req-${Date.now()}`,
          },
          data: {
            success: false,
            error: 'Unauthorized',
            message: 'Cabecera Authorization con token Bearer JWT requerida para este recurso.',
            code: 'AUTH_TOKEN_MISSING',
          },
          timestamp: new Date().toLocaleTimeString(),
        });
        setIsExecuting(false);
        return;
      }

      // Check payload validity for POST
      if (selectedEndpoint.method === 'POST' && requestPayload) {
        try {
          JSON.parse(requestPayload);
        } catch (e: any) {
          setResponseOutput({
            status: 400,
            latencyMs: 2.1,
            headers: {
              'content-type': 'application/json',
              'x-request-id': `req-${Date.now()}`,
            },
            data: {
              success: false,
              error: 'Bad Request',
              message: 'Cuerpo de solicitud JSON malformado: ' + e.message,
            },
            timestamp: new Date().toLocaleTimeString(),
          });
          setIsExecuting(false);
          return;
        }
      }

      const latency = Number((Math.random() * 8 + 6).toFixed(1));
      setResponseOutput({
        status: selectedEndpoint.sampleResponse.status,
        latencyMs: latency,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'strict-transport-security': 'max-age=63072000; includeSubDomains; preload',
          'x-content-type-options': 'nosniff',
          'x-frame-options': 'DENY',
          'x-powered-by': 'Express / Node.js PM2 Cluster',
          'x-request-id': `req-${Date.now()}`,
        },
        data: selectedEndpoint.sampleResponse.body,
        timestamp: new Date().toLocaleTimeString(),
      });
      setIsExecuting(false);
    }, 280);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          <span>Documentación Interactiva OpenAPI / Swagger</span>
          <span aria-hidden="true">·</span>
          <span>Arquitectura RESTful Modular</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
          Consola y Playground de APIs REST
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          Endpoints corporativos con validación estricta de payloads, autorización mediante tokens JWT RS256 y cabeceras de ciberseguridad Grado A+.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Endpoint Navigation List (4 cols) */}
        <div className="lg:col-span-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">
            Catálogo de Servicios REST v1
          </div>
          <div className="space-y-1">
            {API_ENDPOINTS.map((ep) => {
              const isSelected = selectedEndpoint.path === ep.path && selectedEndpoint.method === ep.method;
              return (
                <button
                  key={`${ep.method}-${ep.path}`}
                  onClick={() => handleSelectEndpoint(ep)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between text-xs ${
                    isSelected
                      ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40'
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                        ep.method === 'GET'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="font-mono text-[11px] truncate text-slate-800 dark:text-slate-200">
                      {ep.path}
                    </span>
                  </div>
                  {ep.requiresAuth && (
                    <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Request & Response Tester (8 cols) */}
        <div className="lg:col-span-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 shadow-sm space-y-6">
          {/* Endpoint Info Header */}
          <div className="space-y-2 border-b border-slate-150 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                  selectedEndpoint.method === 'GET'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                }`}
              >
                {selectedEndpoint.method}
              </span>
              <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                {selectedEndpoint.path}
              </span>
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              {selectedEndpoint.summary}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedEndpoint.description}
            </p>

            {selectedEndpoint.requiresAuth && (
              <div className="flex items-center gap-2 pt-1 text-xs text-amber-600 dark:text-amber-400 font-medium">
                <Lock className="w-3.5 h-3.5" />
                <span>Requiere Token Bearer JWT. Roles permitidos: {selectedEndpoint.requiredRole?.join(', ') || 'Autenticado'}</span>
              </div>
            )}
          </div>

          {/* Request Config Area */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Parámetros y Cabeceras HTTP
              </span>
              {selectedEndpoint.requiresAuth && (
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeAuthHeader}
                    onChange={(e) => setIncludeAuthHeader(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Enviar cabecera Authorization (Bearer JWT)</span>
                </label>
              )}
            </div>

            {selectedEndpoint.method === 'POST' && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>Cuerpo JSON (Payload)</span>
                  <span>Content-Type: application/json</span>
                </div>
                <textarea
                  value={requestPayload}
                  onChange={(e) => setRequestPayload(e.target.value)}
                  rows={6}
                  className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            <button
              onClick={handleSendRequest}
              disabled={isExecuting}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isExecuting ? 'Enviando petición...' : 'Ejecutar Petición HTTP'}</span>
            </button>
          </div>

          {/* Response Console */}
          {responseOutput && (
            <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs space-y-3 p-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold ${
                      responseOutput.status >= 200 && responseOutput.status < 300
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    HTTP {responseOutput.status}
                  </span>
                  <span className="text-slate-400 tabular-nums">
                    Latencia: {responseOutput.latencyMs} ms
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {responseOutput.timestamp}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(JSON.stringify(responseOutput.data, null, 2))}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado' : 'Copiar JSON'}</span>
                </button>
              </div>

              {/* Response Headers Preview */}
              <div className="text-[10px] text-slate-400 space-y-0.5 bg-slate-900/60 p-2.5 rounded border border-slate-800">
                <div className="text-indigo-400 font-bold mb-1">// Cabeceras HTTP de Respuesta (ISO 27001)</div>
                {Object.entries(responseOutput.headers).map(([k, v]) => (
                  <div key={k}>
                    <span className="text-slate-500">{k}:</span> <span className="text-slate-300">{v}</span>
                  </div>
                ))}
              </div>

              {/* Formatted JSON Body */}
              <div className="space-y-1">
                <div className="text-[11px] text-emerald-400 font-bold">// Cuerpo de Respuesta JSON</div>
                <pre className="text-[11px] text-slate-200 overflow-x-auto max-h-64 leading-relaxed">
                  {JSON.stringify(responseOutput.data, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
