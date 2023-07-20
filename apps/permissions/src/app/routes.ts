import { Route } from '@angular/router';
import { Role } from './user.model';
import { hasPermissionGuard } from './has-permission.guard';

interface TypedRoute extends Route {
  data?: {
    isAdmin?: boolean;
    roles?: Role[];
  };
}

export const APP_ROUTES: TypedRoute[] = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [hasPermissionGuard],
    data: {
      isAdmin: true,
    },
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent
      ),
  },
  {
    path: 'enter',
    canMatch: [hasPermissionGuard],
    data: {
      roles: ['MANAGER'],
    },
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent
      ),
  },
  {
    path: 'enter',
    canMatch: [hasPermissionGuard],
    data: {
      roles: ['READER', 'WRITER'],
    },
    loadComponent: () =>
      import('./dashboard/reader-writer.component').then(
        (m) => m.ReaderWriterDashboardComponent
      ),
  },
  {
    path: 'enter',
    canMatch: [hasPermissionGuard],
    data: {
      roles: ['CLIENT'],
    },
    loadComponent: () =>
      import('./dashboard/client.component').then(
        (m) => m.ClientDashboardComponent
      ),
  },
  {
    path: 'no-user',
    loadComponent: () =>
      import('./dashboard/no-user.component').then(
        (m) => m.NoUserDashboardComponent
      ),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/everyone.component').then(
        (m) => m.EveryoneDashboardComponent
      ),
  },
];
