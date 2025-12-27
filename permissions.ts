
export type Role = 'ADMIN' | 'EDITEUR' | 'LECTEUR';

export type Permission =
  | 'DASHBOARD'
  | 'FACTURES_LECTURE'
  | 'FACTURES_CREATION'
  | 'DEPOT'
  | 'TRAITEMENT'
  | 'CREDITS'
  | 'CONFIGURATION';

const ROLE_DEFAULT_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: ['DASHBOARD', 'FACTURES_LECTURE', 'FACTURES_CREATION', 'DEPOT', 'TRAITEMENT', 'CREDITS', 'CONFIGURATION'],
  EDITEUR: ['DASHBOARD', 'FACTURES_LECTURE', 'FACTURES_CREATION', 'DEPOT', 'TRAITEMENT', 'CREDITS'],
  LECTEUR: ['DASHBOARD', 'FACTURES_LECTURE', 'CREDITS'],
};

export const getCurrentRole = (): Role => {
  const stored = localStorage.getItem('userRole');
  if (stored === 'ADMIN' || stored === 'EDITEUR' || stored === 'LECTEUR') return stored;
  return 'ADMIN';
};

export const setCurrentRole = (role: Role) => {
  localStorage.setItem('userRole', role);
};

export const getUserPermissionOverrides = (): Permission[] => {
  const raw = localStorage.getItem('userPermissionOverrides');
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((p): p is Permission => typeof p === 'string') as Permission[];
  } catch {
    return [];
  }
};

export const setUserPermissionOverrides = (permissions: Permission[]) => {
  localStorage.setItem('userPermissionOverrides', JSON.stringify(permissions));
};

export const getEffectivePermissions = (): Permission[] => {
  const role = getCurrentRole();
  const overrides = getUserPermissionOverrides();
  const base = ROLE_DEFAULT_PERMISSIONS[role] || [];
  return Array.from(new Set([...base, ...overrides]));
};

export const hasPermission = (permission: Permission): boolean => {
  return getEffectivePermissions().includes(permission);
};

export const ALL_PERMISSIONS: Permission[] = [
  'DASHBOARD',
  'FACTURES_LECTURE',
  'FACTURES_CREATION',
  'DEPOT',
  'TRAITEMENT',
  'CREDITS',
  'CONFIGURATION',
];
