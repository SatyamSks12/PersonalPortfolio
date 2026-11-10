import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { marked } from 'marked';
import { PORTFOLIO_CONTENT, JournalPost } from '../../content/portfolio.content';
import { CursorService } from '../../core/cursor.service';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-journal-post',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent],
  template: `
    <main class="journal-post-page" role="main">
      <div class="post-container">
        <a
          routerLink="/journal"
          class="back-link"
          (mouseenter)="cursorService.setState('link')"
          (mouseleave)="cursorService.reset()"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Journal</span>
        </a>

        @if (post(); as p) {
          <article>
            <header class="post-header">
              <div class="post-meta">
                <span>{{ p.date }}</span>
                <span>•</span>
                <span>{{ p.readingTime }}</span>
              </div>
              <h1 class="post-headline">{{ p.title }}</h1>
            </header>

            <!-- Markdown-rendered body (Section 5) -->
            <div class="post-body" [innerHTML]="renderedHtml()"></div>

            @if (nextPost(); as np) {
              <footer class="next-post-bar">
                <span class="next-label">Next Article</span>
                <a
                  [routerLink]="['/journal', np.slug]"
                  class="next-link"
                  (mouseenter)="cursorService.setState('link')"
                  (mouseleave)="cursorService.reset()"
                >
                  {{ np.title }} →
                </a>
              </footer>
            }
          </article>
        }
      </div>
    </main>
    <app-footer />
  `,
  styleUrl: './journal-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JournalPostComponent implements OnInit {
  cursorService = inject(CursorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  post = signal<JournalPost | null>(null);
  nextPost = signal<JournalPost | null>(null);
  renderedHtml = signal<string>('');

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      const slug = params.get('slug');
      const posts = PORTFOLIO_CONTENT.journal.posts;
      const index = posts.findIndex((p) => p.slug === slug);

      if (index === -1) {
        this.router.navigate(['/journal']);
        return;
      }

      const current = posts[index];
      this.post.set(current);
      this.nextPost.set(posts[(index + 1) % posts.length]);

      const html = await marked.parse(current.contentMarkdown);
      this.renderedHtml.set(html);
    });
  }
}

