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
  selector: 'app-hello',
  standalone: true,
  template: `
    <div #helloRoot class="hello-container" aria-hidden="true">
      <svg class="hello-svg" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Original handwritten cursive 'hello' stroke path -->
        <path
          #helloPath
          d="M 30,140 C 35,80 50,20 65,20 C 75,20 65,90 60,145 C 75,100 110,85 110,115 C 110,145 95,145 125,140 
             M 130,125 C 150,110 170,110 170,125 C 170,145 135,150 145,130 C 155,105 180,105 190,140 
             M 195,140 C 205,80 220,15 235,15 C 245,15 235,95 230,145 
             M 240,140 C 250,80 265,15 280,15 C 290,15 280,95 275,145 
             M 285,130 C 290,105 315,100 330,115 C 345,135 325,155 305,145 C 290,135 305,105 335,120 C 355,130 380,125 400,120"
        />
      </svg>
    </div>
  `,
  styleUrl: './hello.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelloComponent implements OnInit, OnDestroy {
  completed = output<void>();

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private preloaderService = inject(PreloaderService);
  private isBrowser = isPlatformBrowser(this.platformId);

  helloRoot = viewChild<ElementRef<HTMLDivElement>>('helloRoot');
  helloPath = viewChild<ElementRef<SVGPathElement>>('helloPath');

  private tl: gsap.core.Timeline | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) {
      this.completed.emit();
      return;
    }

    if (this.preloaderService.isShortIntro() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.completed.emit();
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const pathEl = this.helloPath()?.nativeElement;
      const rootEl = this.helloRoot()?.nativeElement;
      if (!pathEl || !rootEl) {
        this.completed.emit();
        return;
      }

      const length = pathEl.getTotalLength();
      pathEl.style.strokeDasharray = `${length}`;
      pathEl.style.strokeDashoffset = `${length}`;

      this.tl = gsap.timeline({
        onComplete: () => {
          this.completed.emit();
        }
      });

      // 7.2 Draw over 2.2s, hold 0.4s, fade out over 0.4s
      this.tl.to(pathEl, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: 'power1.inOut'
      })
      .to({}, { duration: 0.4 })
      .to(rootEl, {
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

