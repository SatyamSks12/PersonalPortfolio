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
import { PORTFOLIO_CONTENT } from '../../content/portfolio.content';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vRot: number;
  size: number;
  el: HTMLElement;
}

@Component({
  selector: 'app-physics-logos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #canvasArea class="physics-logos-canvas" aria-hidden="true">
      @for (logo of activeLogos; track logo.name; let idx = $index) {
        <div class="tech-logo-node" [attr.data-idx]="idx">
          <span class="logo-symbol" [style.color]="logo.color">{{ logo.symbol }}</span>
          <span class="logo-name">{{ logo.name }}</span>
        </div>
      }
    </div>
  `,
  styleUrl: './physics-logos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhysicsLogosComponent implements OnInit, OnDestroy {
  canvasArea = viewChild<ElementRef<HTMLDivElement>>('canvasArea');

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  allLogos = PORTFOLIO_CONTENT.expertise.floatingLogos;
  activeLogos = this.allLogos;

  private particles: Particle[] = [];
  private rafId: number | null = null;
  private isVisible = true;
  private pointer = { x: -1000, y: -1000 };
  private mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (window.innerWidth < 768) {
      this.activeLogos = this.allLogos.slice(0, 4);
    }

    this.ngZone.runOutsideAngular(() => {
      // Pause when offscreen via IntersectionObserver
      this.observer = new IntersectionObserver((entries) => {
        this.isVisible = entries[0]?.isIntersecting ?? false;
      }, { threshold: 0.1 });

      const container = this.canvasArea()?.nativeElement;
      if (container) {
        this.observer.observe(container);

        this.mouseMoveHandler = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          this.pointer.x = e.clientX - rect.left;
          this.pointer.y = e.clientY - rect.top;
        };

        window.addEventListener('mousemove', this.mouseMoveHandler, { passive: true });

        // Initialize particles after initial layout
        setTimeout(() => this.initSimulation(), 200);
      }
    });
  }

  private initSimulation(): void {
    const container = this.canvasArea()?.nativeElement;
    if (!container) return;

    const width = container.offsetWidth || 800;
    const height = container.offsetHeight || 600;
    const nodes = container.querySelectorAll<HTMLElement>('.tech-logo-node');

    this.particles = Array.from(nodes).map((el, i) => {
      const x = 60 + Math.random() * (width - 140);
      const y = 60 + Math.random() * (height - 140);
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.4 + Math.random() * 0.5;

      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: (Math.random() - 0.5) * 20,
        vRot: (Math.random() - 0.5) * 0.3,
        size: 68,
        el
      };
    });

    const loop = () => {
      if (this.isVisible && this.particles.length > 0) {
        const curW = container.offsetWidth || 800;
        const curH = container.offsetHeight || 600;

        for (const p of this.particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vRot;

          // Boundary bouncing
          if (p.x < 10) { p.x = 10; p.vx *= -1; }
          if (p.x > curW - p.size - 10) { p.x = curW - p.size - 10; p.vx *= -1; }
          if (p.y < 10) { p.y = 10; p.vy *= -1; }
          if (p.y > curH - p.size - 10) { p.y = curH - p.size - 10; p.vy *= -1; }

          // Repulsion from pointer
          const centerX = p.x + p.size / 2;
          const centerY = p.y + p.size / 2;
          const dx = centerX - this.pointer.x;
          const dy = centerY - this.pointer.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 140 && dist > 0) {
            const force = (140 - dist) / 140;
            p.vx += (dx / dist) * force * 0.8;
            p.vy += (dy / dist) * force * 0.8;
          }

          // Speed damping
          p.vx *= 0.985;
          p.vy *= 0.985;

          // Keep minimum gentle drift
          if (Math.abs(p.vx) < 0.2) p.vx += (Math.random() - 0.5) * 0.1;
          if (Math.abs(p.vy) < 0.2) p.vy += (Math.random() - 0.5) * 0.1;

          p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot}deg)`;
        }
      }

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.observer?.disconnect();
    if (this.mouseMoveHandler) {
      window.removeEventListener('mousemove', this.mouseMoveHandler);
    }
  }
}

