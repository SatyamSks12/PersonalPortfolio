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

@Component({
  selector: 'app-cream-wipe',
  standalone: true,
  template: `
    <div #gridRoot class="cream-wipe-grid" aria-hidden="true">
      @for (item of cells; track $index) {
        <div class="wipe-cell"></div>
      }
    </div>
  `,
  styleUrl: './cream-wipe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreamWipeComponent implements OnInit, OnDestroy {
  completed = output<void>();

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  gridRoot = viewChild<ElementRef<HTMLDivElement>>('gridRoot');

  // 12 columns x 7 rows = 84 cells
  cells = Array.from({ length: 84 });
  private tl: gsap.core.Timeline | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) {
      this.completed.emit();
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.completed.emit();
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const root = this.gridRoot()?.nativeElement;
      if (!root) {
        this.completed.emit();
        return;
      }

      const cellNodes = root.querySelectorAll('.wipe-cell');

      this.tl = gsap.timeline({
        onComplete: () => {
          this.completed.emit();
        }
      });

      // 7.3 Cells scale from 0 to full starting at center moving outward, total stagger 0.8s
      this.tl.to(cellNodes, {
        scale: 1,
        duration: 0.5,
        ease: 'power3.inOut',
        stagger: {
          grid: [7, 12],
          from: 'center',
          amount: 0.8
        }
      })
      // Then fade out in 0.4s
      .to(cellNodes, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  }

  ngOnDestroy(): void {
    this.tl?.kill();
  }
}

