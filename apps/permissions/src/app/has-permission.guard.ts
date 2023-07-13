import { CanMatchFn, Router } from '@angular/router';
import { Role } from './user.model';
import { inject } from '@angular/core';
import { UserStore } from './user.store';
import { mergeMap, of } from 'rxjs';

export const hasPermissionGuard: CanMatchFn = (route) => {
  const accessRoles: Role[] = route.data?.['roles'] ?? [];
  const isAdmin = route.data?.['isAdmin'] ?? false;

  return hasPermission(isAdmin, accessRoles);
};

function hasPermission(isAdmin: boolean, roles: Role[]) {
  const userStore = inject(UserStore);
  const router = inject(Router);

  return userStore.isUserLoggedIn$.pipe(
    mergeMap((hasUser) => {
      if (hasUser) {
        if (isAdmin) {
          return userStore.isAdmin$;
        } else if (roles.length > 0) {
          return userStore.hasAnyRole(roles);
        } else {
          return of(false);
        }
      } else {
        return of(router.parseUrl('no-user'));
      }
    })
  );
}
