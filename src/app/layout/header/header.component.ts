import {
  Component,
  ChangeDetectionStrategy,
  output,
  signal,
  inject,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  NgZone
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollService } from '../../core/scroll.service';
import { CursorService } from '../../core/cursor.service';
import { PORTFOLIO_CONTENT } from '../../content/portfolio.content';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="site-header" role="banner">
      <div class="header-left">
        <a
          href="#top"
          class="signature-link"
          (click)="onNavigate($event, '#top')"
          (mouseenter)="cursorService.setState('link')"
          (mouseleave)="cursorService.reset()"
          [attr.aria-label]="content.identity.name + ' - Return to top'"
        >
          <!-- Elegant signature SVG -->
          <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M10 28 C 20 10, 30 8, 45 14 C 60 20, 35 34, 55 30 C 70 26, 85 10, 95 24 C 105 35, 120 18, 140 22"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <text x="145" y="24" fill="currentColor" font-family="Anton" font-size="16">SK</text>
          </svg>
        </a>
      </div>

      <nav class="header-center" role="navigation" aria-label="Main Navigation">
        @for (item of content.navigation.links; track item.label) {
          <div class="nav-link-item">
            @if (item.isRoute) {
              <a
                [routerLink]="item.href"
                class="nav-link"
                (mouseenter)="cursorService.setState('link')"
                (mouseleave)="cursorService.reset()"
              >
                <div class="roll-text">
                  <span>{{ item.label }}</span>
                  <span>{{ item.label }}</span>
                </div>
              </a>
            } @else {
              <a
                [href]="item.href"
                class="nav-link"
                (click)="onNavigate($event, item.href)"
                (mouseenter)="cursorService.setState('link')"
                (mouseleave)="cursorService.reset()"
              >
                <div class="roll-text">
                  <span>{{ item.label }}</span>
                  <span>{{ item.label }}</span>
                </div>
              </a>
            }
            <span
              class="active-dot"
              [class.visible]="activeSection() === item.href.replace('#', '')"
              aria-hidden="true"
            ></span>
          </div>
        }
      </nav>

      <div class="header-right">
        <button
          type="button"
          class="hamburger-btn"
          (click)="menuToggle.emit()"
          (mouseenter)="cursorService.setState('link')"
          (mouseleave)="cursorService.reset()"
          aria-label="Open navigation menu"
          aria-expanded="false"
        >
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
    </header>
  `,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  content = PORTFOLIO_CONTENT;
  menuToggle = output<void>();

  scrollService = inject(ScrollService);
  cursorService = inject(CursorService);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  activeSection = signal<string>('work');
  private scrollListener: (() => void) | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      const sections = ['work', 'about', 'expertise', 'contact'];
      this.scrollListener = () => {
        const scrollPosition = window.scrollY + 250;
        for (const sec of sections) {
          const el = document.getElementById(sec);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              this.activeSection.set(sec);
              break;
            }
          }
        }
      };

      window.addEventListener('scroll', this.scrollListener, { passive: true });
    });
  }

  onNavigate(e: Event, href: string): void {
    if (href.startsWith('#')) {
      e.preventDefault();
      this.cursorService.reset();
      this.scrollService.scrollTo(href, { offset: -60, duration: 1.2 });
    }
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
      this.scrollListener = null;
    }
  }
}

