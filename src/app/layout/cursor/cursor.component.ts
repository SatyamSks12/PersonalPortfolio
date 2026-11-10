import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  inject,
  NgZone,
  viewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CursorService } from '../../core/cursor.service';

@Component({
  selector: 'app-cursor',
  standalone: true,
  template: `
    <div
      #cursorEl
      class="custom-cursor"
      [class]="'custom-cursor state-' + cursorService.state()"
      aria-hidden="true"
    >
      <span class="cursor-label">{{ cursorService.textLabel() }}</span>
    </div>
  `,
  styleUrl: './cursor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursorComponent implements OnInit, OnDestroy {
  cursorService = inject(CursorService);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  cursorEl = viewChild<ElementRef<HTMLDivElement>>('cursorEl');

  private targetX = -100;
  private targetY = -100;
  private currentX = -100;
  private currentY = -100;
  private rafId: number | null = null;
  private mouseMoveListener: ((e: MouseEvent) => void) | null = null;
  private mouseLeaveListener: (() => void) | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Check touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    this.ngZone.runOutsideAngular(() => {
      this.mouseMoveListener = (e: MouseEvent) => {
        this.targetX = e.clientX;
        this.targetY = e.clientY;
        this.cursorService.updatePosition(e.clientX, e.clientY);
        if (this.cursorService.state() === 'hidden') {
          this.cursorService.setState('default');
        }
      };

      this.mouseLeaveListener = () => {
        this.cursorService.setState('hidden');
      };

      window.addEventListener('mousemove', this.mouseMoveListener, { passive: true });
      document.addEventListener('mouseleave', this.mouseLeaveListener);

      // Eased lag loop (lerp ~0.18)
      const render = () => {
        const lerp = 0.18;
        this.currentX += (this.targetX - this.currentX) * lerp;
        this.currentY += (this.targetY - this.currentY) * lerp;

        const el = this.cursorEl()?.nativeElement;
        if (el) {
          el.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0) translate(-50%, -50%)`;
        }

        this.rafId = requestAnimationFrame(render);
      };

      this.rafId = requestAnimationFrame(render);
    });
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.mouseMoveListener) {
      window.removeEventListener('mousemove', this.mouseMoveListener);
    }
    if (this.mouseLeaveListener) {
      document.removeEventListener('mouseleave', this.mouseLeaveListener);
    }
  }
}

