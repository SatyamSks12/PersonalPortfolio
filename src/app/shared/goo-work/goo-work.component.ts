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

interface Droplet {
  x: number;
  y: number;
  baseY: number;
  speed: number;
  size: number;
  maxDrop: number;
  el: HTMLElement;
}

@Component({
  selector: 'app-goo-work',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="goo-container">
      <!-- SVG Gooey Filter applied to liquid droplets only -->
      <svg width="0" height="0" style="position: absolute; pointer-events: none;" aria-hidden="true">
        <filter id="gooFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
        </filter>
      </svg>

      <div class="work-word-display">
        <h2 #workTitle class="giant-work-word" aria-label="WORK">WORK</h2>
        <div #dropletsLayer class="droplets-canvas" aria-hidden="true"></div>
      </div>
    </div>
  `,
  styleUrl: './goo-work.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GooWorkComponent implements OnInit, OnDestroy {
  workTitle = viewChild<ElementRef<HTMLHeadingElement>>('workTitle');
  dropletsLayer = viewChild<ElementRef<HTMLDivElement>>('dropletsLayer');

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  private droplets: Droplet[] = [];
  private rafId: number | null = null;
  private isVisible = true;
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const count = window.innerWidth < 768 ? 8 : 24;

    this.ngZone.runOutsideAngular(() => {
      const container = this.dropletsLayer()?.nativeElement;
      if (!container) return;

      this.observer = new IntersectionObserver((entries) => {
        this.isVisible = entries[0]?.isIntersecting ?? false;
      }, { threshold: 0.1 });

      this.observer.observe(container);

      // Create droplet DOM elements
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'droplet';
        container.appendChild(el);

        const size = 16 + Math.random() * 24;
        const x = 10 + Math.random() * 80; // % width
        const baseY = 55 + Math.random() * 15; // % height under letters

        this.droplets.push({
          x,
          y: baseY,
          baseY,
          speed: 0.25 + Math.random() * 0.45,
          size,
          maxDrop: 25 + Math.random() * 40,
          el
        });
      }

      const animate = () => {
        if (this.isVisible) {
          for (const d of this.droplets) {
            d.y += d.speed;
            const progress = (d.y - d.baseY) / d.maxDrop;
            const currentSize = Math.max(0, d.size * (1 - progress * 0.7));

            if (d.y >= d.baseY + d.maxDrop || currentSize <= 2) {
              d.y = d.baseY;
              d.x = 10 + Math.random() * 80;
            }

            d.el.style.left = `${d.x}%`;
            d.el.style.top = `${d.y}%`;
            d.el.style.width = `${currentSize}px`;
            d.el.style.height = `${currentSize}px`;
          }
        }

        this.rafId = requestAnimationFrame(animate);
      };

      this.rafId = requestAnimationFrame(animate);
    });
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.observer?.disconnect();
  }
}

