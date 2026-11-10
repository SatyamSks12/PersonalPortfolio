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
import { GooWorkComponent } from '../../shared/goo-work/goo-work.component';

@Component({
  selector: 'app-work-intro',
  standalone: true,
  imports: [CommonModule, GooWorkComponent],
  template: `
    <section #sectionRoot class="work-intro-section">
      <!-- 7.7 Top sliding technology strip -->
      <div class="tech-strip-wrapper">
        <div #stripTrack class="tech-strip-track">
          @for (tech of repeatedTechs; track $index) {
            <span
              class="strip-tech-item"
              [class.highlight-center]="$index % content.workIntro.techStrip.length === 3"
            >
              {{ tech }}
            </span>
          }
        </div>
      </div>

      <div class="heading-wrapper">
        <span class="scroll-explore-line">{{ content.workIntro.headingPrefix }}</span>
        <div class="vertical-indicator-line" aria-hidden="true"></div>
      </div>

      <!-- 7.7 Giant heavy WORK with goo effect -->
      <app-goo-work />

      <!-- 7.7 Bottom marquee responsive to scroll velocity -->
      <div class="bottom-marquee-wrapper" aria-hidden="true">
        <div #marqueeTrack class="marquee-track">
          @for (item of repeatedMarquee; track $index) {
            <span class="marquee-item">
              <span>{{ item }}</span>
              <span class="marquee-plus">+</span>
            </span>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './work-intro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkIntroComponent implements OnInit, OnDestroy {
  content = PORTFOLIO_CONTENT;

  sectionRoot = viewChild<ElementRef<HTMLElement>>('sectionRoot');
  stripTrack = viewChild<ElementRef<HTMLDivElement>>('stripTrack');
  marqueeTrack = viewChild<ElementRef<HTMLDivElement>>('marqueeTrack');

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  repeatedTechs = [
    ...this.content.workIntro.techStrip,
    ...this.content.workIntro.techStrip,
    ...this.content.workIntro.techStrip
  ];

  repeatedMarquee = [
    ...this.content.workIntro.marqueeItems,
    ...this.content.workIntro.marqueeItems,
    ...this.content.workIntro.marqueeItems,
    ...this.content.workIntro.marqueeItems
  ];

  private scrollTriggerInstance: ScrollTrigger | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      const section = this.sectionRoot()?.nativeElement;
      const track = this.stripTrack()?.nativeElement;
      if (!section || !track) return;

      // 7.7 Top strip slides sideways with scroll
      this.scrollTriggerInstance = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(track, { x: -self.progress * 300 });
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.scrollTriggerInstance?.kill();
  }
}
