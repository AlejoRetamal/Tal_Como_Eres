import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { OrdenService } from '../services/orden.service';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const token = route.queryParams['token'];
  const expectedToken = 'xY9kL2mN4pQ6rS8tU0vW1xY3zA5bC7dE9fG1hJ3kL5mN7pQ9rS';

  if (!token || token !== expectedToken) {
    inject(Router).navigate(['/']);
    return false;
  }

  inject(OrdenService).setToken(token);
  return true;
};