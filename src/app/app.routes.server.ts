import { RenderMode, ServerRoute } from '@angular/ssr';
import { PORTFOLIO_CONTENT } from './content/portfolio.content';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'journal/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return PORTFOLIO_CONTENT.journal.posts.map((post) => ({ slug: post.slug }));
    }
  },
  {
    path: 'case-study/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return PORTFOLIO_CONTENT.projects.items.map((proj) => ({ id: proj.id }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
