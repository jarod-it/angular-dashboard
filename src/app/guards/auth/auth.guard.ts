import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = auth.getAuthentication();

  /* console.log(`Url: ${state.url}, Auth: ${isAuthenticated}`); */

  if((state.url === '/admin/dashboard' || state.url === '/admin/profile') && !isAuthenticated) {
    router.navigate(['/admin']);
    return false;
  }

  if((state.url === '/admin' || state.url === '/admin/signin') && isAuthenticated) {
    router.navigate(['/admin/dashboard']);
    return false;
  }

  return true;
};
