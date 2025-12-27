
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { Permission } from '../permissions';
import { hasPermission } from '../permissions';

interface RequirePermissionProps {
  permission: Permission;
  children: React.ReactNode;
}

const RequirePermission: React.FC<RequirePermissionProps> = ({ permission, children }) => {
  const location = useLocation();

  if (!hasPermission(permission)) {
    return <Navigate to="/non-autorise" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default RequirePermission;
