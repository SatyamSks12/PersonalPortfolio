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
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-string-line',
  standalone: true,
  template: `
    <div #container class="string-line-container" aria-hidden="true">
      <svg viewBox="0 0 1000 40" preserveAspectRatio="none">
        <path #linePath d="M 0,20 Q 500,20 1000,20" />
      </svg>
    </div>
  `,
  styleUrl: './string-line.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringLineComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  container = viewChild<ElementRef<HTMLDivElement>>('container');
  linePath = viewChild<ElementRef<SVGPathElement>>('linePath');

  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;
  private mouseLeaveListener: (() => void) | null = null;
  private touchStartListener: (() => void) | null = null;
  private currentTween: gsap.core.Tween | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      const containerEl = this.container()?.nativeElement;
      const pathEl = this.linePath()?.nativeElement;
      if (!containerEl || !pathEl) return;

      const curve = { y: 20 };

      this.mouseMoveListener = (e: MouseEvent) => {
        const rect = containerEl.getBoundingClientRect();
        const relY = e.clientY - rect.top;
        const clampedY = Math.max(-10, Math.min(50, relY));

        this.currentTween?.kill();
        this.currentTween = gsap.to(curve, {
          y: clampedY,
          duration: 0.25,
          ease: 'power2.out',
          onUpdate: () => {
            pathEl.setAttribute('d', `M 0,20 Q 500,${curve.y} 1000,20`);
          }
        });
      };

      // 7.5 On leave: springs back with elastic motion (~1.2s)
      this.mouseLeaveListener = () => {
        this.currentTween?.kill();
        this.currentTween = gsap.to(curve, {
          y: 20,
          duration: 1.2,
          ease: 'elastic.out(1.5, 0.2)',
          onUpdate: () => {
            pathEl.setAttribute('d', `M 0,20 Q 500,${curve.y} 1000,20`);
          }
        });
      };

      // 7.5 On touch: single wobble on entry
      this.touchStartListener = () => {
        curve.y = 35;
        pathEl.setAttribute('d', `M 0,20 Q 500,35 1000,20`);
        gsap.to(curve, {
          y: 20,
          duration: 1.2,
          ease: 'elastic.out(1.5, 0.2)',
          onUpdate: () => {
            pathEl.setAttribute('d', `M 0,20 Q 500,${curve.y} 1000,20`);
          }
        });
      };

      containerEl.addEventListener('mousemove', this.mouseMoveListener);
      containerEl.addEventListener('mouseleave', this.mouseLeaveListener);
      containerEl.addEventListener('touchstart', this.touchStartListener, { passive: true });
    });
  }

  ngOnDestroy(): void {
    this.currentTween?.kill();
    const containerEl = this.container()?.nativeElement;
    if (containerEl) {
      if (this.mouseMoveListener) containerEl.removeEventListener('mousemove', this.mouseMoveListener);
      if (this.mouseLeaveListener) containerEl.removeEventListener('mouseleave', this.mouseLeaveListener);
      if (this.touchStartListener) containerEl.removeEventListener('touchstart', this.touchStartListener);
    }
  }
}

