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
import { StringLineComponent } from '../../shared/string-line/string-line.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, StringLineComponent],
  template: `
    <section #aboutSection class="about-section" id="about">
      <div class="about-header-block">
        <span class="label-badge">{{ content.about.sectionLabel }}</span>
        <h2 class="about-heading">{{ content.about.heading }}</h2>
        <app-string-line />
      </div>

      <div #pinnedWrapper class="about-pinned-wrapper">
        <!-- 7.5 Left column: Portrait card with face-crop zoom out -->
        <div class="portrait-card">
          <div class="portrait-media-wrap">
            <img
              #portraitImg
              [src]="content.identity.portraitImgUrl"
              [alt]="content.identity.name"
              class="portrait-img"
              loading="lazy"
              (error)="hasImageError = true"
              [style.display]="hasImageError ? 'none' : 'block'"
            />
            @if (hasImageError) {
              <!-- Fallback initial card showing SK on gold gradient (Section 3.3b) -->
              <div class="portrait-fallback">
                <span class="fallback-initials">SK</span>
                <span class="label-badge">{{ content.identity.name }}</span>
              </div>
            }
          </div>

          <div class="portrait-overlay-name">{{ content.identity.name }}</div>

          <div class="portrait-icon-rail" aria-hidden="true">
            <span class="rail-dot"></span>
            <span class="rail-dot"></span>
            <span class="rail-dot"></span>
          </div>
        </div>

        <!-- 7.5 Right column: Headline, paragraphs & stats -->
        <div class="about-narrative">
          <h3 class="about-headline">
            {{ content.about.headlinePart1 }}
            <span class="gold-highlight">{{ content.about.headlineHighlight1 }}</span>
            {{ content.about.headlinePart2 }}
            <span class="gold-highlight">{{ content.about.headlineHighlight2 }}</span>
            {{ content.about.headlinePart3 }}
          </h3>

          <p class="about-paragraph">{{ content.about.paragraph1 }}</p>
          <p class="about-paragraph">{{ content.about.paragraph2 }}</p>

          <div class="stats-grid">
            @for (stat of content.about.stats; track stat.label) {
              <div class="stat-card">
                <span class="stat-label">{{ stat.label }}</span>
                <span class="stat-value">{{ stat.value }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, OnDestroy {
  content = PORTFOLIO_CONTENT;
  hasImageError = false;

  aboutSection = viewChild<ElementRef<HTMLElement>>('aboutSection');
  pinnedWrapper = viewChild<ElementRef<HTMLDivElement>>('pinnedWrapper');
  portraitImg = viewChild<ElementRef<HTMLImageElement>>('portraitImg');

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  private mm: gsap.MatchMedia | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      this.mm = gsap.matchMedia();

      // 7.5 Desktop: Section pins for about 150% of viewport height of scroll
      this.mm.add('(min-width: 1024px)', () => {
        const sectionEl = this.aboutSection()?.nativeElement;
        const wrapperEl = this.pinnedWrapper()?.nativeElement;
        const imgEl = this.portraitImg()?.nativeElement;

        if (!sectionEl || !wrapperEl) return;

        // Photo zooms out from tight face crop (scale 2.2) to full portrait (scale 1)
        if (imgEl) {
          gsap.fromTo(
            imgEl,
            { scale: 2.2 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionEl,
                start: 'top top',
                end: '+=150%',
                pin: true,
                scrub: 1,
                anticipatePin: 1
              }
            }
          );
        }
      });

      // Mobile: works unpinned on screens narrower than 1024px
      this.mm.add('(max-width: 1023px)', () => {
        const imgEl = this.portraitImg()?.nativeElement;
        if (imgEl) {
          gsap.set(imgEl, { scale: 1 });
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }
}

