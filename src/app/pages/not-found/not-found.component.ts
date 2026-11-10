import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CursorService } from '../../core/cursor.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="not-found-page" role="main">
      <div class="not-found-code">404</div>
      <h1 class="witty-line">Even our autonomous agents couldn't find this page.</h1>
      <p class="sub-line">
        The route you are looking for has been moved, garbage-collected, or never existed in the state graph.
      </p>
      <a
        routerLink="/"
        class="home-btn"
        (mouseenter)="cursorService.setState('link')"
        (mouseleave)="cursorService.reset()"
      >
        <span>Return to Home Base</span>
        <span>→</span>
      </a>
    </main>
  `,
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
  cursorService = inject(CursorService);
}

