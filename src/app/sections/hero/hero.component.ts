import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ElementRef,
  PLATFORM_ID,
  inject,
  NgZone,
  viewChild
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_CONTENT } from '../../content/portfolio.content';
import { ScrollService } from '../../core/scroll.service';
import { CursorService } from '../../core/cursor.service';
import { RotatingBadgeComponent } from '../../shared/rotating-badge/rotating-badge.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RotatingBadgeComponent],
  template: `
    <section #heroSection class="hero-section" id="hero">
      <!-- SVG Liquid Warp Filter for Hover Effect (Section 7.4) -->
      <svg width="0" height="0" style="position: absolute; pointer-events: none;" aria-hidden="true">
        <filter id="heroLiquidFilter">
          <feTurbulence
            #turbulenceEl
            type="fractalNoise"
            baseFrequency="0.015 0.015"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            #displacementEl
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div class="hero-main-content">
        <div
          #giantWordBox
          class="giant-word-container has-liquid-filter"
          (mouseenter)="onHeroEnter()"
          (mouseleave)="onHeroLeave()"
        >
          <!-- SEO & Accessible Real Text -->
          <h1 class="giant-word-text" [attr.aria-label]="content.hero.giantWord">
            @for (char of characters; track $index) {
              <span class="char-mask" aria-hidden="true">
                <span class="char-inner">{{ char }}</span>
              </span>
            }
          </h1>
        </div>

        <div #secondaryBlock class="secondary-block">
          <div class="secondary-word">{{ content.hero.secondaryWord }}</div>
          <div class="mini-labels">
            @for (label of content.hero.miniLabels; track label; let last = $last) {
              <span>{{ label }}</span>
              @if (!last) {
                <span class="dot-separator"></span>
              }
            }
          </div>
        </div>

        <div class="hero-badge-anchor">
          <app-rotating-badge
            [text]="content.hero.badgeText"
            (badgeClick)="scrollToContact()"
          />
        </div>
      </div>

      <div class="hero-bottom-bar">
        <div class="bottom-left">{{ content.hero.copyrightText }}</div>

        <div class="scroll-hint-wrapper" (click)="scrollToExplore()">
          <div class="mouse-icon" aria-hidden="true">
            <div class="mouse-wheel-dot"></div>
          </div>
          <span class="scroll-hint-text">{{ content.hero.scrollHint }}</span>
        </div>

        <div class="bottom-right">{{ content.hero.locationText }}</div>
      </div>
    </section>
  `,
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit, OnDestroy {
  content = PORTFOLIO_CONTENT;

  heroSection = viewChild<ElementRef<HTMLElement>>('heroSection');
  giantWordBox = viewChild<ElementRef<HTMLDivElement>>('giantWordBox');
  secondaryBlock = viewChild<ElementRef<HTMLDivElement>>('secondaryBlock');
  turbulenceEl = viewChild<ElementRef<SVGFETurbulenceElement>>('turbulenceEl');
  displacementEl = viewChild<ElementRef<SVGFEDisplacementMapElement>>('displacementEl');

  scrollService = inject(ScrollService);
  cursorService = inject(CursorService);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  characters = PORTFOLIO_CONTENT.hero.giantWord.split('');

  private masterTl: gsap.core.Timeline | null = null;
  private scrollTriggerInstance: ScrollTrigger | null = null;
  private mouseMoveHandler: ((e: MouseEvent) => void) | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      // 7.4 Scroll out: hero moves up at 80% scroll speed with parallax
      const heroEl = this.heroSection()?.nativeElement;
      if (heroEl) {
        this.scrollTriggerInstance = ScrollTrigger.create({
          trigger: heroEl,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(heroEl, { y: self.progress * heroEl.offsetHeight * -0.2 });
          }
        });
      }

      this.setupLiquidWarp();
    });
  }

  // 7.4 Load reveal animation (called after intro wipe ends or on mount)
  playRevealAnimation(): void {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      const charInners = this.heroSection()?.nativeElement.querySelectorAll('.char-inner');
      const secBlock = this.secondaryBlock()?.nativeElement;

      if (!charInners || charInners.length === 0 || !secBlock) return;

      this.masterTl = gsap.timeline();

      // Characters rise from 110% in clipping mask, stagger 0.04s from center outward, 1.1s
      this.masterTl.to(charInners, {
        y: '0%',
        duration: 1.1,
        ease: 'power3.out',
        stagger: {
          from: 'center',
          amount: 0.44
        }
      })
      // Secondary word & labels follow 0.3s later
      .to(secBlock, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5');
    });
  }

  private setupLiquidWarp(): void {
    const boxEl = this.giantWordBox()?.nativeElement;
    const dispEl = this.displacementEl()?.nativeElement;
    const turbEl = this.turbulenceEl()?.nativeElement;
    if (!boxEl || !dispEl || !turbEl) return;

    let warpIntensity = { scale: 0, freq: 0.015 };

    this.mouseMoveHandler = (e: MouseEvent) => {
      const rect = boxEl.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      // Ripple intensity based on proximity
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const dist = Math.hypot(relX - centerX, relY - centerY);
      const targetScale = Math.max(0, 32 - (dist / rect.width) * 32);

      gsap.to(warpIntensity, {
        scale: targetScale,
        freq: 0.025,
        duration: 0.25,
        ease: 'power2.out',
        onUpdate: () => {
          dispEl.setAttribute('scale', `${warpIntensity.scale}`);
          turbEl.setAttribute('baseFrequency', `${warpIntensity.freq} ${warpIntensity.freq}`);
        }
      });
    };

    boxEl.addEventListener('mousemove', this.mouseMoveHandler);
  }

  onHeroEnter(): void {
    this.cursorService.setState('hero');
  }

  onHeroLeave(): void {
    this.cursorService.reset();
    const dispEl = this.displacementEl()?.nativeElement;
    if (dispEl) {
      gsap.to(dispEl, {
        attr: { scale: 0 },
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  }

  scrollToContact(): void {
    this.scrollService.scrollTo('#contact', { offset: -40, duration: 1.2 });
  }

  scrollToExplore(): void {
    this.scrollService.scrollTo('#about', { offset: -40, duration: 1.2 });
  }

  ngOnDestroy(): void {
    this.masterTl?.kill();
    this.scrollTriggerInstance?.kill();
    const boxEl = this.giantWordBox()?.nativeElement;
    if (boxEl && this.mouseMoveHandler) {
      boxEl.removeEventListener('mousemove', this.mouseMoveHandler);
    }
  }
}
