import { Component, ChangeDetectionStrategy, ElementRef, OnInit, OnDestroy, PLATFORM_ID, inject, NgZone, viewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  template: `<div #progressLine class="scroll-progress-line" aria-hidden="true"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollProgressComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);
  private scrollListener: (() => void) | null = null;

  progressLine = viewChild<ElementRef<HTMLDivElement>>('progressLine');

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      this.scrollListener = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        const el = this.progressLine()?.nativeElement;
        if (el) {
          el.style.transform = `scaleX(${progress})`;
        }
      };

      window.addEventListener('scroll', this.scrollListener, { passive: true });
    });
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
      this.scrollListener = null;
    }
  }
}

