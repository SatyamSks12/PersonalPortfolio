import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  inject,
  NgZone,
  input
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';

@Directive({
  selector: '[appMagnetic]',
  standalone: true
})
export class MagneticDirective implements OnInit, OnDestroy {
  radius = input<number>(120);
  strength = input<number>(0.3); // Up to 30% offset

  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;
  private mouseLeaveListener: (() => void) | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const nativeEl = this.el.nativeElement as HTMLElement;

    this.ngZone.runOutsideAngular(() => {
      this.mouseMoveListener = (e: MouseEvent) => {
        const rect = nativeEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.hypot(distX, distY);

        if (distance < this.radius()) {
          const pullX = distX * this.strength();
          const pullY = distY * this.strength();

          gsap.to(nativeEl, {
            x: pullX,
            y: pullY,
            duration: 0.35,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        } else {
          gsap.to(nativeEl, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'elastic.out(1.2, 0.4)',
            overwrite: 'auto'
          });
        }
      };

      this.mouseLeaveListener = () => {
        gsap.to(nativeEl, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1.2, 0.4)',
          overwrite: 'auto'
        });
      };

      window.addEventListener('mousemove', this.mouseMoveListener, { passive: true });
      nativeEl.addEventListener('mouseleave', this.mouseLeaveListener);
    });
  }

  ngOnDestroy(): void {
    if (this.mouseMoveListener) {
      window.removeEventListener('mousemove', this.mouseMoveListener);
    }
    if (this.mouseLeaveListener) {
      this.el.nativeElement.removeEventListener('mouseleave', this.mouseLeaveListener);
    }
  }
}

