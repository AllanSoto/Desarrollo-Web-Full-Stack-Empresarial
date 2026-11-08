import { User, Permission, ClusterNode, ConnectionPoolStatus, ApiEndpoint, IsoControl } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-901',
    name: 'Ing. Carlos Mendoza',
    email: 'carlos.mendoza@empresa.com',
    role: 'SUPER_ADMIN',
    department: 'Dirección de Tecnología',
    status: 'ACTIVO',
    lastLogin: 'Hace 3 min (IP 192.168.1.45)',
    permissions: ['*'],
  },
  {
    id: 'usr-902',
    name: 'Elena Rostova',
    email: 'elena.rostova@empresa.com',
    role: 'DEVOPS_LEAD',
    department: 'Infraestructura & Cloud',
    status: 'ACTIVO',
    lastLogin: 'Hace 18 min (IP 10.0.4.12)',
    permissions: ['cluster:manage', 'cluster:restart', 'nginx:reload', 'audit:read', 'api:read'],
  },
  {
    id: 'usr-903',
    name: 'Ing. Mateo Valenzuela',
    email: 'mateo.valenzuela@empresa.com',
    role: 'DBA_SPECIALIST',
    department: 'Bases de Datos & Big Data',
    status: 'ACTIVO',
    lastLogin: 'Hace 42 min (IP 10.0.2.88)',
    permissions: ['db:read', 'db:write', 'db:ddl', 'db:pool_optimize', 'audit:read'],
  },
  {
    id: 'usr-904',
    name: 'Valeria Cárdenas',
    email: 'valeria.cardenas@empresa.com',
    role: 'SECURITY_AUDITOR',
    department: 'Seguridad de la Información (ISO)',
    status: 'ACTIVO',
    lastLogin: 'Hace 1 hora (IP 172.16.0.21)',
    permissions: ['audit:read', 'audit:export', 'iso27001:validate', 'jwt:inspect', 'users:read'],
  },
  {
    id: 'usr-905',
    name: 'Rodrigo Santoro',
    email: 'rodrigo.santoro@empresa.com',
    role: 'OPERATOR',
    department: 'Centro de Operaciones (NOC)',
    status: 'ACTIVO',
    lastLogin: 'Hace 2 horas (IP 10.0.1.15)',
    permissions: ['dashboard:read', 'cluster:read', 'logs:view'],
  },
  {
    id: 'usr-906',
    name: 'Sofía Benítez',
    email: 'sofia.benitez@empresa.com',
    role: 'OPERATOR',
    department: 'Soporte Técnico Nivel 2',
    status: 'EN_REVISION',
    lastLogin: 'Hace 2 días',
    permissions: ['dashboard:read'],
  },
];

export const SYSTEM_PERMISSIONS: Permission[] = [
  { id: 'p1', code: 'users:manage', name: 'Gestión Completa de Usuarios', category: 'Usuarios', description: 'Creación, edición, revocación de credenciales y asignación de roles' },
  { id: 'p2', code: 'users:read', name: 'Lectura de Directorio', category: 'Usuarios', description: 'Visualización de lista de colaboradores y estados' },
  { id: 'p3', code: 'db:read', name: 'Consultas SELECT en SQL', category: 'Base de Datos', description: 'Ejecución de sentencias analíticas y de lectura' },
  { id: 'p4', code: 'db:write', name: 'Escritura DML (Insert/Update/Delete)', category: 'Base de Datos', description: 'Mutaciones controladas en tablas transaccionales' },
  { id: 'p5', code: 'db:ddl', name: 'Gestión de Esquemas DDL', category: 'Base de Datos', description: 'Migraciones de esquemas, índices y vistas' },
  { id: 'p6', code: 'cluster:manage', name: 'Control de Cluster PM2', category: 'Infraestructura', description: 'Reinicio escalonado zero-downtime, parada y ajuste de instancias' },
  { id: 'p7', code: 'nginx:reload', name: 'Configuración Nginx', category: 'Infraestructura', description: 'Modificación de proxy reverso, upstreams y cabeceras de seguridad' },
  { id: 'p8', code: 'audit:export', name: 'Exportación de Logs de Auditoría', category: 'Auditoría', description: 'Descarga de trazas de acceso firmadas digitalmente' },
  { id: 'p9', code: 'iso27001:validate', name: 'Aprobación de Controles ISO', category: 'Auditoría', description: 'Verificación de políticas de seguridad según norma ISO/IEC 27001' },
  { id: 'p10', code: 'api:invoke', name: 'Invocación de APIs REST', category: 'API', description: 'Ejecución de endpoints autenticados vía Bearer JWT' },
];

export const INITIAL_CLUSTER_NODES: ClusterNode[] = [
  { instanceId: 0, pid: 14820, name: 'core-worker-0', status: 'online', cpu: 14.2, memoryMb: 142.8, uptimeSeconds: 345620, restarts: 0, port: 8081 },
  { instanceId: 1, pid: 14821, name: 'core-worker-1', status: 'online', cpu: 12.8, memoryMb: 138.4, uptimeSeconds: 345620, restarts: 0, port: 8082 },
  { instanceId: 2, pid: 14822, name: 'core-worker-2', status: 'online', cpu: 15.6, memoryMb: 145.1, uptimeSeconds: 345620, restarts: 0, port: 8083 },
  { instanceId: 3, pid: 14823, name: 'core-worker-3', status: 'online', cpu: 11.4, memoryMb: 136.9, uptimeSeconds: 345620, restarts: 0, port: 8084 },
];

export const SQL_SERVER_POOL: ConnectionPoolStatus = {
  engine: 'SQL Server (T-SQL)',
  host: 'sqlsrv-prod-clus01.corp.internal',
  port: 1433,
  database: 'EnterpriseCoreDB_Prod',
  minConnections: 10,
  maxConnections: 50,
  activeConnections: 18,
  idleConnections: 32,
  queuedRequests: 0,
  avgLatencyMs: 3.2,
  poolHealth: 'Óptimo',
};

export const MYSQL_POOL: ConnectionPoolStatus = {
  engine: 'MySQL 8.0 Enterprise',
  host: 'mysql-cluster-ha.corp.internal',
  port: 3306,
  database: 'enterprise_auth_replica',
  minConnections: 8,
  maxConnections: 40,
  activeConnections: 12,
  idleConnections: 28,
  queuedRequests: 0,
  avgLatencyMs: 2.8,
  poolHealth: 'Óptimo',
};

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    method: 'POST',
    path: '/api/v1/auth/login',
    summary: 'Autenticación corporativa y expedición de JWT',
    description: 'Valida credenciales contra directorio SQL, aplica rate-limiting por IP (máx 5 intentos/min) y emite token JWT con algoritmo RS256.',
    requiresAuth: false,
    requestSchema: {
      type: 'object',
      required: ['email', 'password', 'deviceFingerprint'],
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 12 },
        deviceFingerprint: { type: 'string' },
      },
    },
    samplePayload: {
      email: 'carlos.mendoza@empresa.com',
      password: '••••••••••••••••',
      deviceFingerprint: 'fp_a87f91c3e44b',
    },
    sampleResponse: {
      status: 200,
      body: {
        success: true,
        tokenType: 'Bearer',
        accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3ItOTAxIiwibmFtZSI6IkNhcmxvcyBNZW5kb3phIiwicm9sZSI6IlNVUEVSX0FETUlOIiwiaWF0IjoxNzg0ODMyMDB9...',
        expiresInSeconds: 3600,
        mfaRequired: false,
      },
    },
  },
  {
    method: 'GET',
    path: '/api/v1/users',
    summary: 'Listado de usuarios con RBAC estricto',
    description: 'Retorna usuarios paginados con proyección de roles. Requiere cabecera Authorization con rol SUPER_ADMIN o SECURITY_AUDITOR.',
    requiresAuth: true,
    requiredRole: ['SUPER_ADMIN', 'SECURITY_AUDITOR'],
    sampleResponse: {
      status: 200,
      body: {
        total: 148,
        page: 1,
        pageSize: 20,
        data: [
          { id: 'usr-901', name: 'Carlos Mendoza', role: 'SUPER_ADMIN', status: 'ACTIVO' },
          { id: 'usr-902', name: 'Elena Rostova', role: 'DEVOPS_LEAD', status: 'ACTIVO' },
        ],
      },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/users',
    summary: 'Creación de nuevo usuario con validación estricta de payload',
    description: 'Comprueba unicidad de email, valida complejidad de contraseña conforme a ISO 27001 e inserta registro en transacción SQL atómica.',
    requiresAuth: true,
    requiredRole: ['SUPER_ADMIN'],
    samplePayload: {
      name: 'Mariana Duarte',
      email: 'mariana.duarte@empresa.com',
      role: 'DBA_SPECIALIST',
      department: 'Infraestructura',
      permissions: ['db:read', 'db:write'],
    },
    sampleResponse: {
      status: 201,
      body: {
        success: true,
        userId: 'usr-907',
        message: 'Usuario registrado exitosamente en clúster SQL Server y asignado a rol DBA_SPECIALIST.',
      },
    },
  },
  {
    method: 'GET',
    path: '/api/v1/database/pool-status',
    summary: 'Métricas de telemetría de pool de conexiones',
    description: 'Consulta el estado en vivo de conexiones activas, en espera y latencias para SQL Server y MySQL.',
    requiresAuth: true,
    requiredRole: ['SUPER_ADMIN', 'DEVOPS_LEAD', 'DBA_SPECIALIST'],
    sampleResponse: {
      status: 200,
      body: {
        timestamp: '2026-11-05T20:15:00.000Z',
        sqlServer: { active: 18, idle: 32, max: 50, avgLatencyMs: 3.2 },
        mySql: { active: 12, idle: 28, max: 40, avgLatencyMs: 2.8 },
      },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/cluster/restart-node',
    summary: 'Reinicio escalonado de nodo de aplicación en PM2',
    description: 'Ejecuta un rolling restart en el clúster sin pérdida de solicitudes (Zero-Downtime Deployment).',
    requiresAuth: true,
    requiredRole: ['SUPER_ADMIN', 'DEVOPS_LEAD'],
    samplePayload: {
      nodeId: 2,
      gracefulTimeoutMs: 4000,
      reason: 'Recarga de variables de entorno y actualización de pool',
    },
    sampleResponse: {
      status: 200,
      body: {
        success: true,
        message: 'Nodo core-worker-2 reiniciado con éxito. Conexiones drenadas a nodos 0, 1 y 3 sin interrupción.',
        reloadedPid: 14930,
      },
    },
  },
];

export const ISO_CONTROLS: IsoControl[] = [
  {
    id: 'iso-01',
    code: 'A.9.2.1',
    domain: 'Control de Acceso',
    title: 'Registro y desregistro de usuarios',
    description: 'Proceso formal de asignación y revocación inmediata de privilegios mediante RBAC centralizado.',
    status: 'CUMPLE',
    auditEvidence: 'Tokens JWT revocables por Redis blacklist, caducidad a 60 min y registro de auditoría en SQL.',
    lastChecked: 'Hoy 14:30',
  },
  {
    id: 'iso-02',
    code: 'A.9.4.2',
    domain: 'Control de Acceso',
    title: 'Inicio de sesión seguro para usuarios',
    description: 'Autenticación robusta con protección contra fuerza bruta y cifrado en tránsito TLS 1.3.',
    status: 'CUMPLE',
    auditEvidence: 'Rate limiting en Nginx (5 req/min por IP), hash Argon2id y certificación SSL Grado A+.',
    lastChecked: 'Hoy 15:10',
  },
  {
    id: 'iso-03',
    code: 'A.10.1.1',
    domain: 'Criptografía',
    title: 'Política de controles criptográficos',
    description: 'Uso de algoritmos criptográficos modernos para datos sensibles en reposo y en tránsito.',
    status: 'CUMPLE',
    auditEvidence: 'TDE en SQL Server (AES-256), TLS 1.3 forzado en Nginx con suites de cifrado ECDHE-RSA.',
    lastChecked: 'Hoy 11:20',
  },
  {
    id: 'iso-04',
    code: 'A.12.1.2',
    domain: 'Seguridad Operacional',
    title: 'Gestión de cambios de producción',
    description: 'Despliegues sin corte de servicio validados mediante pruebas de integración automáticas.',
    status: 'CUMPLE',
    auditEvidence: 'PM2 Cluster rolling restart, Nginx health-checks activos y verificación estricta de esquemas.',
    lastChecked: 'Hoy 16:00',
  },
  {
    id: 'iso-05',
    code: 'A.12.4.1',
    domain: 'Seguridad Operacional',
    title: 'Registro y monitoreo de eventos (Logging)',
    description: 'Trazas de auditoría inalterables de accesos a datos y modificaciones privilegiadas.',
    status: 'CUMPLE',
    auditEvidence: 'Tabla LogsAuditoria con hash encadenado SHA-256 e IP de origen inyectada por proxy.',
    lastChecked: 'Hoy 17:45',
  },
  {
    id: 'iso-06',
    code: 'A.14.1.2',
    domain: 'Adquisición y Desarrollo',
    title: 'Seguridad en servicios de aplicaciones',
    description: 'Validación estricta de entradas en todas las capas para neutralizar inyecciones SQL y XSS.',
    status: 'CUMPLE',
    auditEvidence: 'Consultas parametrizadas al 100%, validación estricta con esquemas Zod y cabeceras CSP.',
    lastChecked: 'Hoy 18:00',
  },
  {
    id: 'iso-07',
    code: 'A.14.2.8',
    domain: 'Adquisición y Desarrollo',
    title: 'Pruebas de seguridad del sistema',
    description: 'Auditorías de código estático y análisis de vulnerabilidades OWASP Top 10 periódicos.',
    status: 'CUMPLE',
    auditEvidence: 'Análisis SAST/DAST continuo sin vulnerabilidades de severidad Alta/Crítica registradas.',
    lastChecked: 'Hoy 19:15',
  },
  {
    id: 'iso-08',
    code: 'A.17.1.1',
    domain: 'Continuidad de Negocio',
    title: 'Planificación de la disponibilidad (99.9%)',
    description: 'Arquitectura redundante con balanceo Nginx, clúster PM2 y réplica síncrona en BD relacionales.',
    status: 'CUMPLE',
    auditEvidence: 'SLA contractual del 99.9% cumplido (345 días sin caídas no programadas en clúster primario).',
    lastChecked: 'Hoy 19:30',
  },
];

export const PRESET_SQL_QUERIES = [
  {
    id: 'q1',
    title: 'Métricas de Sesiones y Auditoría de Acceso',
    description: 'Muestra accesos recientes con roles, IP de conexión y latencia de verificación de credenciales.',
    sql: `SELECT 
    l.id_log,
    u.nombre AS usuario,
    r.nombre_rol AS rol_asignado,
    l.ip_origen,
    l.accion,
    l.latencia_ms,
    l.fecha_evento
FROM LogsAuditoria l
INNER JOIN Usuarios u ON l.id_usuario = u.id_usuario
INNER JOIN Roles r ON u.id_rol = r.id_rol
ORDER BY l.fecha_evento DESC;`,
    columns: ['id_log', 'usuario', 'rol_asignado', 'ip_origen', 'accion', 'latencia_ms', 'fecha_evento'],
    rows: [
      { id_log: 10452, usuario: 'Carlos Mendoza', rol_asignado: 'SUPER_ADMIN', ip_origen: '192.168.1.45', accion: 'AUTH_SUCCESS_MFA', latencia_ms: 18.4, fecha_evento: '2026-11-05 20:08:12' },
      { id_log: 10451, usuario: 'Elena Rostova', rol_asignado: 'DEVOPS_LEAD', ip_origen: '10.0.4.12', accion: 'CLUSTER_RELOAD_NODE', latencia_ms: 4.2, fecha_evento: '2026-11-05 19:55:04' },
      { id_log: 10450, usuario: 'Mateo Valenzuela', rol_asignado: 'DBA_SPECIALIST', ip_origen: '10.0.2.88', accion: 'SQL_POOL_OPTIMIZE', latencia_ms: 2.9, fecha_evento: '2026-11-05 19:30:21' },
      { id_log: 10449, usuario: 'Valeria Cárdenas', rol_asignado: 'SECURITY_AUDITOR', ip_origen: '172.16.0.21', accion: 'ISO27001_SCAN_COMPLETED', latencia_ms: 31.0, fecha_evento: '2026-11-05 19:15:40' },
      { id_log: 10448, usuario: 'Rodrigo Santoro', rol_asignado: 'OPERATOR', ip_origen: '10.0.1.15', accion: 'DASHBOARD_TELEMETRY_POLL', latencia_ms: 1.8, fecha_evento: '2026-11-05 19:00:15' },
    ],
  },
  {
    id: 'q2',
    title: 'Monitoreo de Rendimiento de Nodos y Conexiones',
    description: 'Agrupa uso de memoria, CPU y conexiones activas asignadas a cada worker de PM2.',
    sql: `SELECT 
    p.instancia_id,
    p.nombre_proceso,
    p.pid,
    p.conexiones_activas_bd,
    p.cpu_porcentaje,
    p.memoria_mb,
    p.estado_salud
FROM MonitorInstancias p
WHERE p.estado_salud = 'ACTIVO'
ORDER BY p.instancia_id ASC;`,
    columns: ['instancia_id', 'nombre_proceso', 'pid', 'conexiones_activas_bd', 'cpu_porcentaje', 'memoria_mb', 'estado_salud'],
    rows: [
      { instancia_id: 0, nombre_proceso: 'core-worker-0', pid: 14820, conexiones_activas_bd: 5, cpu_porcentaje: '14.2%', memoria_mb: 142.8, estado_salud: 'ACTIVO' },
      { instancia_id: 1, nombre_proceso: 'core-worker-1', pid: 14821, conexiones_activas_bd: 4, cpu_porcentaje: '12.8%', memoria_mb: 138.4, estado_salud: 'ACTIVO' },
      { instancia_id: 2, nombre_proceso: 'core-worker-2', pid: 14822, conexiones_activas_bd: 5, cpu_porcentaje: '15.6%', memoria_mb: 145.1, estado_salud: 'ACTIVO' },
      { instancia_id: 3, nombre_proceso: 'core-worker-3', pid: 14823, conexiones_activas_bd: 4, cpu_porcentaje: '11.4%', memoria_mb: 136.9, estado_salud: 'ACTIVO' },
    ],
  },
  {
    id: 'q3',
    title: 'Verificación de Integridad de Roles & Permisos (RBAC)',
    description: 'Cruza permisos asignados a cada rol empresarial para auditar principio de menor privilegio.',
    sql: `SELECT 
    r.nombre_rol,
    COUNT(rp.id_permiso) AS total_permisos,
    r.descripcion_rol,
    r.nivel_jerarquia
FROM Roles r
LEFT JOIN RolPermisos rp ON r.id_rol = rp.id_rol
GROUP BY r.id_rol, r.nombre_rol, r.descripcion_rol, r.nivel_jerarquia
ORDER BY r.nivel_jerarquia ASC;`,
    columns: ['nombre_rol', 'total_permisos', 'descripcion_rol', 'nivel_jerarquia'],
    rows: [
      { nombre_rol: 'SUPER_ADMIN', total_permisos: 10, descripcion_rol: 'Control global de infraestructura y seguridad', nivel_jerarquia: 1 },
      { nombre_rol: 'DEVOPS_LEAD', total_permisos: 5, descripcion_rol: 'Orquestación de clúster PM2, Nginx y despliegues', nivel_jerarquia: 2 },
      { nombre_rol: 'DBA_SPECIALIST', total_permisos: 5, descripcion_rol: 'Administración de pools SQL Server y MySQL', nivel_jerarquia: 2 },
      { nombre_rol: 'SECURITY_AUDITOR', total_permisos: 5, descripcion_rol: 'Inspección de tokens JWT y controles ISO 27001', nivel_jerarquia: 3 },
      { nombre_rol: 'OPERATOR', total_permisos: 3, descripcion_rol: 'Monitoreo en tiempo real de operaciones', nivel_jerarquia: 4 },
    ],
  },
];
