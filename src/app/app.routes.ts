import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.component').then((m) => m.HomeComponent),
    title: 'Dojo LDKPOM · Karate Shotokan — Disciplina, fuerza y tradición',
  },
  { path: '**', redirectTo: '' },
];
