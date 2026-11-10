import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ElementRef,
  PLATFORM_ID,
  inject,
  NgZone,
  output,
  viewChild
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import gsap from 'gsap';
import { PreloaderService } from '../../../core/preloader.service';
import { PORTFOLIO_CONTENT } from '../../../content/portfolio.content';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #welcomeRoot class="welcome-container" aria-hidden="true">
      <div class="welcome-content">
        <div #welcomeBadge class="welcome-badge">
          <span class="badge-dot"></span>
          {{ content.intro.welcomeBadge }}
          <span class="badge-dot"></span>
        </div>

        <h1 class="welcome-heading">
          <div class="welcome-line-mask">
            <span #line1 class="welcome-line">{{ content.intro.welcomeLine1 }}</span>
          </div>
          <div class="welcome-line-mask">
            <span #line2 class="welcome-line gold-glow">{{ content.intro.welcomeLine2 }}</span>
          </div>
        </h1>

        <div #welcomeSub class="welcome-subtitle">
          <span class="sub-bar"></span>
          <span class="sub-text">{{ content.intro.welcomeSubtitle }}</span>
          <span class="sub-bar"></span>
        </div>
      </div>
    </div>
  `,
  styleUrl: './hello.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelloComponent implements OnInit, OnDestroy {
  completed = output<void>();
  content = PORTFOLIO_CONTENT;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private preloaderService = inject(PreloaderService);
  private isBrowser = isPlatformBrowser(this.platformId);

  welcomeRoot = viewChild<ElementRef<HTMLDivElement>>('welcomeRoot');
  welcomeBadge = viewChild<ElementRef<HTMLDivElement>>('welcomeBadge');
  line1 = viewChild<ElementRef<HTMLSpanElement>>('line1');
  line2 = viewChild<ElementRef<HTMLSpanElement>>('line2');
  welcomeSub = viewChild<ElementRef<HTMLDivElement>>('welcomeSub');

  private tl: gsap.core.Timeline | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) {
      this.completed.emit();
      return;
    }

    if (this.preloaderService.isShortIntro() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.completed.emit();
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const rootEl = this.welcomeRoot()?.nativeElement;
      const badgeEl = this.welcomeBadge()?.nativeElement;
      const l1 = this.line1()?.nativeElement;
      const l2 = this.line2()?.nativeElement;
      const subEl = this.welcomeSub()?.nativeElement;

      if (!rootEl || !l1 || !l2 || !badgeEl || !subEl) {
        this.completed.emit();
        return;
      }

      this.tl = gsap.timeline({
        onComplete: () => {
          this.completed.emit();
        }
      });

      // Initial positions
      gsap.set(badgeEl, { opacity: 0, y: -16, scale: 0.9 });
      gsap.set([l1, l2], { yPercent: 115 });
      gsap.set(subEl, { opacity: 0, y: 16 });

      // Staggered cinematic reveal
      this.tl
        .to(badgeEl, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: 'power3.out'
        })
        .to(
          [l1, l2],
          {
            yPercent: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: 'power4.out'
          },
          '-=0.3'
        )
        .to(
          subEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out'
          },
          '-=0.4'
        )
        // Hold on screen
        .to({}, { duration: 1.3 })
        // Smooth outro scale and fade out into cream wipe
        .to(rootEl, {
          opacity: 0,
          scale: 1.04,
          duration: 0.45,
          ease: 'power2.inOut'
        });
    });
  }

  ngOnDestroy(): void {
    this.tl?.kill();
  }
}
