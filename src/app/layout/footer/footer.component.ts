import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  inject,
  NgZone,
  signal
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PORTFOLIO_CONTENT } from '../../content/portfolio.content';
import { ScrollService } from '../../core/scroll.service';
import { CursorService } from '../../core/cursor.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="site-footer" role="contentinfo">
      <div class="footer-inner">
        <!-- 7.10 Giant name in Anton -->
        <div class="footer-giant-name" aria-hidden="true">
          {{ content.identity.name }}
        </div>

        <div class="footer-middle-row">
          <div class="footer-social-group">
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
            <a
              [href]="content.identity.instagramUrl"
              target="_blank"
              rel="noopener noreferrer"
              (mouseenter)="cursorService.setState('link')"
              (mouseleave)="cursorService.reset()"
            >
              Instagram
            </a>
            @if (content.identity.hasResume) {
              <a
                [href]="content.identity.resumePdfUrl"
                target="_blank"
                download="Satyam_Kumar_Resume.pdf"
                (mouseenter)="cursorService.setState('link')"
                (mouseleave)="cursorService.reset()"
              >
                Resume PDF
              </a>
            }
          </div>

          <!-- 7.10 Live local-time clock for owner's time zone (IST) -->
          <div class="footer-time-clock">
            <span class="clock-pulse" aria-hidden="true"></span>
            <span>INDIA / {{ currentTime() }}</span>
          </div>

          <!-- 7.10 Back-to-top button -->
          <button
            type="button"
            class="back-to-top-btn"
            (click)="scrollToTop()"
            (mouseenter)="cursorService.setState('link')"
            (mouseleave)="cursorService.reset()"
            aria-label="Back to top of page"
          >
            <span>BACK TO TOP</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
        </div>

        <div class="footer-bottom-row">
          <div>© 2026 {{ content.identity.name }}. All rights reserved.</div>
          <div>{{ content.identity.locationLine }}</div>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit, OnDestroy {
  content = PORTFOLIO_CONTENT;
  currentTime = signal<string>('00:00:00 IST');

  scrollService = inject(ScrollService);
  cursorService = inject(CursorService);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  private timerId: any = null;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.updateClock();

    this.ngZone.runOutsideAngular(() => {
      this.timerId = setInterval(() => {
        this.updateClock();
      }, 1000);
    });
  }

  private updateClock(): void {
    const now = new Date();
    // India Standard Time (UTC+5:30)
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
    this.currentTime.set(`${timeStr} IST`);
  }

  scrollToTop(): void {
    this.cursorService.reset();
    this.scrollService.scrollTo('#top', { offset: 0, duration: 1.2 });
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}

