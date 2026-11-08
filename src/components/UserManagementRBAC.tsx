import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Plus, 
  Search, 
  Lock, 
  Check, 
  AlertTriangle, 
  Key, 
  Filter,
  UserCheck,
  UserX,
  X
} from 'lucide-react';
import { INITIAL_USERS, SYSTEM_PERMISSIONS } from '../data/mockEnterpriseData';
import { User, RoleType } from '../types';

export const UserManagementRBAC: React.FC = () => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserForToken, setSelectedUserForToken] = useState<User>(INITIAL_USERS[0]);

  // New user form state
  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    role: RoleType;
    department: string;
    permissions: string[];
  }>({
    name: '',
    email: '',
    role: 'OPERATOR',
    department: 'Operaciones',
    permissions: ['dashboard:read'],
  });

  const [formError, setFormError] = useState<string | null>(null);

  // JWT Tamper test state
  const [tamperedRole, setTamperedRole] = useState<string>('SUPER_ADMIN');
  const [tamperTested, setTamperTested] = useState<boolean>(false);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRoleFilter === 'ALL' || u.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) {
      setFormError('Por favor complete todos los campos obligatorios.');
      return;
    }
    if (!newUser.email.includes('@empresa.com')) {
      setFormError('El correo corporativo debe pertenecer al dominio @empresa.com conforme a políticas ISO 27001.');
      return;
    }

    const created: User = {
      id: `usr-${Math.floor(Math.random() * 900) + 100}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      status: 'ACTIVO',
      lastLogin: 'Nunca (Registro reciente)',
      permissions: newUser.permissions,
    };

    setUsers([created, ...users]);
    setIsModalOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: 'OPERATOR',
      department: 'Operaciones',
      permissions: ['dashboard:read'],
    });
    setFormError(null);
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'ACTIVO' ? 'SUSPENDIDO' : 'ACTIVO';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <span>Control de Acceso Basado en Roles</span>
            <span aria-hidden="true">·</span>
            <span>Estándar RBAC ISO 27001</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
            Gestión de Usuarios, Roles y Permisos
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Administración centralizada de identidades con tokens criptográficos JWT y principio de menor privilegio.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Nuevo Usuario</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, correo o departamento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Role Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-x-auto">
          {['ALL', 'SUPER_ADMIN', 'DEVOPS_LEAD', 'DBA_SPECIALIST', 'SECURITY_AUDITOR', 'OPERATOR'].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRoleFilter(r)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedRoleFilter === r
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {r === 'ALL' ? 'Todos los Roles' : r.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="py-3 px-4 font-semibold">Colaborador / Usuario</th>
                <th className="py-3 px-4 font-semibold">Rol RBAC</th>
                <th className="py-3 px-4 font-semibold">Departamento</th>
                <th className="py-3 px-4 font-semibold">Último Acceso</th>
                <th className="py-3 px-4 font-semibold text-center">Estado</th>
                <th className="py-3 px-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 dark:divide-slate-800/60">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No se encontraron usuarios con los criterios seleccionados.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                      selectedUserForToken.id === user.id ? 'bg-indigo-50/30 dark:bg-indigo-950/20' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 dark:text-white">{user.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{user.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {user.department}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {user.lastLogin}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          user.status === 'ACTIVO'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedUserForToken(user);
                            setTamperTested(false);
                          }}
                          className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          Inspeccionar JWT
                        </button>
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`p-1 rounded transition-colors cursor-pointer ${
                            user.status === 'ACTIVO'
                              ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40'
                              : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                          }`}
                          title={user.status === 'ACTIVO' ? 'Suspender acceso' : 'Reactivar acceso'}
                        >
                          {user.status === 'ACTIVO' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive JWT Inspector & Tamper Simulator */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-150 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Inspector Criptográfico de Token JWT (Usuario Seleccionado: {selectedUserForToken.name})
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Algoritmo: RS256 con Clave Asimétrica RSA 4096-bit
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-mono text-xs">
          {/* Header */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 space-y-1">
            <div className="text-indigo-400 font-bold text-[11px]">1. CABECERA (HEADER)</div>
            <pre className="text-[11px] overflow-x-auto text-slate-300">
{`{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "corp-rsa-2026"
}`}
            </pre>
          </div>

          {/* Payload */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 space-y-1">
            <div className="text-emerald-400 font-bold text-[11px]">2. CARGA ÚTIL (PAYLOAD)</div>
            <pre className="text-[11px] overflow-x-auto text-slate-300">
{`{
  "sub": "${selectedUserForToken.id}",
  "name": "${selectedUserForToken.name}",
  "email": "${selectedUserForToken.email}",
  "role": "${selectedUserForToken.role}",
  "department": "${selectedUserForToken.department}",
  "iss": "enterprise.auth.internal",
  "exp": 1784835600
}`}
            </pre>
          </div>

          {/* Signature Verification & Tamper Test */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="text-amber-400 font-bold text-[11px]">3. VERIFICACIÓN DE FIRMA</div>
              <p className="text-[11px] text-slate-400 leading-tight">
                La firma digital garantiza que cualquier modificación no autorizada de privilegios sea rechazada por el backend.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setTamperTested(true)}
                className="w-full py-1.5 rounded bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-[11px] font-sans font-semibold cursor-pointer transition-colors"
              >
                Simular Ataque de Escalación de Privilegios
              </button>

              {tamperTested && (
                <div className="p-2 rounded bg-red-950/60 border border-red-500/40 text-[11px] text-red-300 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <span>¡FIRMA INVÁLIDA DETECTADA!</span>
                  </div>
                  <p className="text-[10px] text-slate-300">
                    El payload alterado no coincide con la firma criptográfica RSA. Solicitud rechazada con código HTTP 401 Unauthorized e incidente registrado en auditoría ISO.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Matriz de Permisos del Sistema (Principio de Menor Privilegio)
          </h3>
          <span className="text-xs text-slate-500">10 Permisos Centralizados</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SYSTEM_PERMISSIONS.map((perm) => (
            <div
              key={perm.id}
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 space-y-1"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900 dark:text-white">{perm.name}</span>
                <span className="text-[10px] font-mono text-slate-500">{perm.category}</span>
              </div>
              <div className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">{perm.code}</div>
              <p className="text-[11px] text-slate-500 leading-tight">{perm.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Create User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-150 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Alta de Nuevo Usuario Empresarial
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ing. Alejandra Morales"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Correo Electrónico Corporativo *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alejandra.morales@empresa.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Rol Asignado
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as RoleType })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="OPERATOR">OPERATOR</option>
                    <option value="SECURITY_AUDITOR">SECURITY_AUDITOR</option>
                    <option value="DBA_SPECIALIST">DBA_SPECIALIST</option>
                    <option value="DEVOPS_LEAD">DEVOPS_LEAD</option>
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Departamento
                  </label>
                  <input
                    type="text"
                    value={newUser.department}
                    onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-150 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  Registrar en Directorio SQL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
