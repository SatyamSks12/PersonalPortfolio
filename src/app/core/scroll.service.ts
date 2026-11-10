import { Injectable, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private lenis: Lenis | null = null;
  private isBrowser = isPlatformBrowser(this.platformId);
  private tickerCallback: ((time: number) => void) | null = null;

  init(): void {
    if (!this.isBrowser || this.lenis) return;

    this.ngZone.runOutsideAngular(() => {
      // Register GSAP ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // 6.1 Scroll engine: Lenis with lerp 0.1
      this.lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        infinite: false
      });

      // Synchronize Lenis with GSAP's ticker
      this.tickerCallback = (time: number) => {
        this.lenis?.raf(time * 1000);
      };

      gsap.ticker.add(this.tickerCallback);
      gsap.ticker.lagSmoothing(0);

      // Update ScrollTrigger on Lenis scroll
      this.lenis.on('scroll', () => {
        ScrollTrigger.update();
      });
    });
  }

  stop(): void {
    this.lenis?.stop();
  }

  start(): void {
    this.lenis?.start();
  }

  scrollTo(target: string | HTMLElement | number, options?: { offset?: number; immediate?: boolean; duration?: number }): void {
    if (!this.lenis) {
      if (this.isBrowser && typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    this.lenis.scrollTo(target, {
      offset: options?.offset ?? 0,
      immediate: options?.immediate ?? false,
      duration: options?.duration ?? 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Expo out
    });
  }

  destroy(): void {
    if (this.tickerCallback) {
      gsap.ticker.remove(this.tickerCallback);
      this.tickerCallback = null;
    }
    this.lenis?.destroy();
    this.lenis = null;
  }
}

