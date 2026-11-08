export type RoleType = 'SUPER_ADMIN' | 'DEVOPS_LEAD' | 'DBA_SPECIALIST' | 'SECURITY_AUDITOR' | 'OPERATOR';

export interface User {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  department: string;
  status: 'ACTIVO' | 'SUSPENDIDO' | 'EN_REVISION';
  lastLogin: string;
  avatarUrl?: string;
  permissions: string[];
}

export interface Permission {
  id: string;
  code: string;
  name: string;
  category: 'Usuarios' | 'Base de Datos' | 'Infraestructura' | 'Auditoría' | 'API';
  description: string;
}

export interface ClusterNode {
  instanceId: number;
  pid: number;
  name: string;
  status: 'online' | 'reloading' | 'stopping' | 'errored';
  cpu: number; // percentage
  memoryMb: number;
  uptimeSeconds: number;
  restarts: number;
  port: number;
}

export interface ConnectionPoolStatus {
  engine: 'SQL Server (T-SQL)' | 'MySQL 8.0 Enterprise';
  host: string;
  port: number;
  database: string;
  minConnections: number;
  maxConnections: number;
  activeConnections: number;
  idleConnections: number;
  queuedRequests: number;
  avgLatencyMs: number;
  poolHealth: 'Óptimo' | 'Carga Elevada' | 'Degradado';
}

export interface SqlQueryResult {
  query: string;
  executionTimeMs: number;
  rowCount: number;
  columns: string[];
  rows: Record<string, any>[];
  timestamp: string;
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  summary: string;
  description: string;
  requiresAuth: boolean;
  requiredRole?: RoleType[];
  requestSchema?: Record<string, any>;
  samplePayload?: Record<string, any>;
  sampleResponse: {
    status: number;
    body: Record<string, any>;
  };
}

export interface IsoControl {
  id: string;
  code: string;
  domain: string;
  title: string;
  description: string;
  status: 'CUMPLE' | 'EN_PROGRESO' | 'AUDITADO';
  auditEvidence: string;
  lastChecked: string;
}

export interface LiveTelemetry {
  requestsPerSecond: number;
  avgLatencyMs: number;
  p99LatencyMs: number;
  activeSessions: number;
  uptimePercent: number;
  memoryUsageMb: number;
  cpuTotalPercent: number;
  errorRatePercent: number;
}
