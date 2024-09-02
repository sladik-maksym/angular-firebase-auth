import { Routes } from '@angular/router';

import { canActivateAuthRoutes } from './core/guards/can-activate-auth-routes';
import { canActivateMainRoutes } from './core/guards/can-activate-main-routes';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SignInPageComponent } from './pages/auth/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/auth/sign-up-page/sign-up-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', title: 'SignIn', component: SignInPageComponent },
      { path: 'sign-up', title: 'SignUp', component: SignUpPageComponent },
    ],
    canActivate: [canActivateAuthRoutes],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        title: 'Dashboard',
        component: DashboardPageComponent,
      },
      {
        path: 'user/:id',
        title: 'User',
        component: UserPageComponent,
      },
    ],
    canActivate: [canActivateMainRoutes],
  },
  { path: '**', component: NotFoundPageComponent },
];
