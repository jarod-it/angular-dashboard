import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './components/admin/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { SigninComponent } from './components/admin/signin/signin.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { ProgressifsComponent } from './components/progressifs/progressifs.component';
import { UnifocauxComponent } from './components/unifocaux/unifocaux.component';
import { Paire2Component } from './components/paire2/paire2.component';
import { UnifocauxSubComponent } from './components/paire2/sub-components/unifocaux/unifocaux.component';
import { ProgressifsSubComponent } from './components/paire2/sub-components/progressifs/progressifs.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Accueil'
  },
  {
    path: 'unifocaux',
    component: UnifocauxComponent,
    title: 'Unifocaux'
  },
  {
    path: 'progressifs',
    component: ProgressifsComponent,
    title: 'Progressifs'
  },
  {
    path: 'paire2/unifocaux',
    component: UnifocauxSubComponent,
    title: '2nd Paire - Unifocaux'
  },
  {
    path: 'paire2/progressifs',
    component: ProgressifsSubComponent,
    title: '2nd Paire - Progressifs'
  },
  {
    path: 'paire2',
    component: Paire2Component,
    title: '2nd Paire'
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    component: LoginComponent,
    title: 'Admin'
  },
  {
    path: 'admin/signin',
    canActivate: [authGuard],
    component: SigninComponent,
    title: 'Admin - Inscription'
  },
  {
    path: 'admin/dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
    title: 'Admin - Dashboard'
  },
  {
    path: 'admin/profile',
    canActivate: [authGuard],
    component: ProfileComponent,
    title: 'Admin - Profil'
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: '404'
  },
];
