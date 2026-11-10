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
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { PreloaderService } from '../../../core/preloader.service';

@Component({
  selector: 'app-preloader',
  standalone: true,
  template: `
    <div #preloaderRoot class="preloader-container" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
      <div class="preloader-content">
        <div #counterEl class="counter-value">0</div>

        <div class="ring-wrapper">
          <svg viewBox="0 0 160 160" aria-hidden="true">
            <circle class="ring-bg" cx="80" cy="80" r="70" stroke-width="2" fill="none" />
            <circle
              #progressCircle
              class="ring-progress"
              cx="80"
              cy="80"
              r="70"
              stroke-width="2.5"
              fill="none"
              stroke-dasharray="439.82"
              stroke-dashoffset="439.82"
            />
          </svg>

          <!-- Orbiting gold stylus / pencil object -->
          <div #orbitEl class="orbiting-stylus">
            <svg class="stylus-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 2 L22 6 L6 22 L2 22 L2 18 Z" fill="var(--color-gold)" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round" />
              <polygon points="2,22 2,18 6,22" fill="#0A0A0A" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './preloader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreloaderComponent implements OnInit, OnDestroy {
  completed = output<void>();

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private preloaderService = inject(PreloaderService);
  private isBrowser = isPlatformBrowser(this.platformId);

  preloaderRoot = viewChild<ElementRef<HTMLDivElement>>('preloaderRoot');
  counterEl = viewChild<ElementRef<HTMLDivElement>>('counterEl');
  progressCircle = viewChild<ElementRef<SVGCircleElement>>('progressCircle');
  orbitEl = viewChild<ElementRef<HTMLDivElement>>('orbitEl');

  private tween: gsap.core.Tween | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) {
      this.completed.emit();
      return;
    }

    const isShort = this.preloaderService.isShortIntro();
    const duration = isShort ? 1.0 : 2.6;
    const circumference = 2 * Math.PI * 70; // ~439.82

    this.ngZone.runOutsideAngular(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setTimeout(() => {
          const rootEl = this.preloaderRoot()?.nativeElement;
          if (rootEl) {
            gsap.to(rootEl, {
              opacity: 0,
              duration: 0.8,
              onComplete: () => this.completed.emit()
            });
          } else {
            this.completed.emit();
          }
        }, 300);
        return;
      }

      const progressObj = { value: 0 };
      const counterNode = this.counterEl()?.nativeElement;
      const circleNode = this.progressCircle()?.nativeElement;
      const orbitNode = this.orbitEl()?.nativeElement;

      this.tween = gsap.to(progressObj, {
        value: 100,
        duration: duration,
        ease: 'power2.inOut',
        onUpdate: () => {
          const val = Math.floor(progressObj.value);
          if (counterNode) counterNode.textContent = `${val}`;
          if (circleNode) {
            const offset = circumference - (val / 100) * circumference;
            circleNode.style.strokeDashoffset = `${offset}`;
          }
          if (orbitNode) {
            const angle = (val / 100) * 360;
            orbitNode.style.transform = `rotate(${angle}deg)`;
          }
        },
        onComplete: () => {
          // 7.1 Hold 0.3s at 100, then fade and scale out over 0.5s
          const rootEl = this.preloaderRoot()?.nativeElement;
          if (rootEl) {
            gsap.to(rootEl, {
              opacity: 0,
              scale: 0.95,
              duration: 0.5,
              delay: 0.3,
              ease: 'power3.inOut',
              onComplete: () => {
                this.preloaderService.markCompleted();
                this.completed.emit();
              }
            });
          } else {
            this.preloaderService.markCompleted();
            this.completed.emit();
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.tween?.kill();
  }
}
