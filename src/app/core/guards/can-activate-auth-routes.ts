import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const canActivateAuthRoutes = () => {
  const isSignedIn = inject(AuthService).hasUser;

  if (isSignedIn) {
    const router = inject(Router);

    return router.navigate(['/dashboard']);
  }

  return true;
};
