import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const canActivateMainRoutes = () => {
  const isSignedIn = inject(AuthService).hasUser;

  if (isSignedIn) {
    return true;
  }

  const router = inject(Router);

  return router.navigate(['/auth/sign-in']);
};
