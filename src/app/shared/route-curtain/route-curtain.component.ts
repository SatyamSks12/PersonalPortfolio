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
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import gsap from 'gsap';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-route-curtain',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="route-curtain-overlay" aria-hidden="true">
      <div #goldCurtain class="curtain-layer gold-curtain"></div>
      <div #creamCurtain class="curtain-layer cream-curtain"></div>
    </div>
  `,
  styleUrl: './route-curtain.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteCurtainComponent implements OnInit, OnDestroy {
  goldCurtain = viewChild<ElementRef<HTMLDivElement>>('goldCurtain');
  creamCurtain = viewChild<ElementRef<HTMLDivElement>>('creamCurtain');

  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  private sub: Subscription | null = null;
  private animTl: gsap.core.Timeline | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      this.sub = this.router.events
        .pipe(
          filter((event) => event instanceof NavigationStart || event instanceof NavigationEnd)
        )
        .subscribe((event) => {
          if (event instanceof NavigationStart) {
            this.playCurtainTransition();
          }
        });
    });
  }

  // 6.8 A gold-then-cream curtain wipes across in 0.9s total, scroll resets
  private playCurtainTransition(): void {
    const gold = this.goldCurtain()?.nativeElement;
    const cream = this.creamCurtain()?.nativeElement;
    if (!gold || !cream) return;

    this.animTl?.kill();
    this.animTl = gsap.timeline();

    this.animTl
      .set([gold, cream], { y: '100%' })
      .to(gold, {
        y: '0%',
        duration: 0.45,
        ease: 'power3.inOut'
      })
      .to(cream, {
        y: '0%',
        duration: 0.45,
        ease: 'power3.inOut',
        onComplete: () => {
          window.scrollTo(0, 0);
        }
      }, '-=0.25')
      .to([gold, cream], {
        y: '-100%',
        duration: 0.45,
        ease: 'power3.inOut',
        stagger: 0.08
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.animTl?.kill();
  }
}

