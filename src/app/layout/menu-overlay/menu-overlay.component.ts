import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  ElementRef,
  HostListener,
  inject,
  viewChild,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollService } from '../../core/scroll.service';
import { CursorService } from '../../core/cursor.service';
import { PORTFOLIO_CONTENT } from '../../content/portfolio.content';

@Component({
  selector: 'app-menu-overlay',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div
      #menuContainer
      class="menu-overlay-backdrop"
      [class.is-open]="isOpen()"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      <div class="menu-top-bar">
        <span class="menu-brand">{{ content.identity.name }}</span>
        <button
          #closeBtn
          type="button"
          class="close-btn"
          (click)="closeMenu()"
          (mouseenter)="cursorService.setState('link')"
          (mouseleave)="cursorService.reset()"
          aria-label="Close menu"
        >
          <span>CLOSE</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <nav class="menu-nav-links" role="navigation">
        @for (item of content.navigation.links; track item.label; let idx = $index) {
          <div class="menu-nav-item">
            @if (item.isRoute) {
              <a
                [routerLink]="item.href"
                class="menu-link"
                (click)="closeMenu()"
                (mouseenter)="cursorService.setState('link')"
                (mouseleave)="cursorService.reset()"
              >
                <span class="menu-link-index">0{{ idx + 1 }}</span>
                <span>{{ item.label }}</span>
              </a>
            } @else {
              <a
                [href]="item.href"
                class="menu-link"
                (click)="onNavigate($event, item.href)"
                (mouseenter)="cursorService.setState('link')"
                (mouseleave)="cursorService.reset()"
              >
                <span class="menu-link-index">0{{ idx + 1 }}</span>
                <span>{{ item.label }}</span>
              </a>
            }
          </div>
        }
      </nav>

      <div class="menu-footer-bar">
        <span>{{ content.identity.locationLine }}</span>
        <div class="menu-social-links">
          <a
            [href]="content.identity.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            (mouseenter)="cursorService.setState('link')"
            (mouseleave)="cursorService.reset()"
          >
            GitHub
          </a>
          <a
            [href]="content.identity.linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            (mouseenter)="cursorService.setState('link')"
            (mouseleave)="cursorService.reset()"
          >
            LinkedIn
          </a>
          @if (content.identity.hasResume) {
            <a
              [href]="content.identity.resumePdfUrl"
              target="_blank"
              download="Satyam_Kumar_Resume.pdf"
              (mouseenter)="cursorService.setState('link')"
              (mouseleave)="cursorService.reset()"
            >
              Resume
            </a>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './menu-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuOverlayComponent {
  isOpen = input<boolean>(false);
  close = output<void>();

  content = PORTFOLIO_CONTENT;
  scrollService = inject(ScrollService);
  cursorService = inject(CursorService);

  menuContainer = viewChild<ElementRef<HTMLDivElement>>('menuContainer');
  closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.scrollService.stop();
        setTimeout(() => this.closeBtn()?.nativeElement.focus(), 100);
      } else {
        this.scrollService.start();
      }
    });
  }

  closeMenu(): void {
    this.close.emit();
    this.cursorService.reset();
  }

  onNavigate(e: Event, href: string): void {
    if (href.startsWith('#')) {
      e.preventDefault();
      this.closeMenu();
      setTimeout(() => {
        this.scrollService.scrollTo(href, { offset: -60, duration: 1.2 });
      }, 300);
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (!this.isOpen()) return;

    if (e.key === 'Escape') {
      this.closeMenu();
      return;
    }

    // 6.5 Focus trap inside menu overlay while open
    if (e.key === 'Tab') {
      const el = this.menuContainer()?.nativeElement;
      if (!el) return;

      const focusable = el.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }
}

