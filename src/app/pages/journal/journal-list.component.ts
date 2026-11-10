import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PORTFOLIO_CONTENT, JournalPost } from '../../content/portfolio.content';
import { CursorService } from '../../core/cursor.service';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-journal-list',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  template: `
    <main class="journal-page" role="main">
      <div class="journal-header">
        <span class="label-badge">{{ content.journal.sectionLabel }}</span>
        <h1 class="journal-heading">{{ content.journal.heading }}</h1>
        <p class="journal-intro">{{ content.journal.intro }}</p>
      </div>

      <div class="journal-rows-list">
        @for (post of content.journal.posts; track post.slug) {
          <article
            class="journal-row"
            (click)="onOpenPost(post)"
            (mouseenter)="cursorService.setState('link')"
            (mouseleave)="cursorService.reset()"
          >
            <span class="post-date">{{ post.date }}</span>
            <h2 class="post-title">{{ post.title }}</h2>
            <span class="reading-time">{{ post.readingTime }}</span>
            <div class="arrow-box" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </article>
        }
      </div>
    </main>
    <app-footer />
  `,
  styleUrl: './journal-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JournalListComponent {
  content = PORTFOLIO_CONTENT;
  cursorService = inject(CursorService);
  private router = inject(Router);

  onOpenPost(post: JournalPost): void {
    this.cursorService.reset();
    this.router.navigate(['/journal', post.slug]);
  }
}

