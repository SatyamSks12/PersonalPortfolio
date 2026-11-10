import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'journal',
    loadComponent: () => import('./pages/journal/journal-list.component').then((m) => m.JournalListComponent)
  },
  {
    path: 'journal/:slug',
    loadComponent: () => import('./pages/journal/journal-post.component').then((m) => m.JournalPostComponent)
  },
  {
    path: 'case-study/:id',
    loadComponent: () => import('./pages/case-study/case-study.component').then((m) => m.CaseStudyComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent)
  }
];
