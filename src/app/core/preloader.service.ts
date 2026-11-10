import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  isCompleted = signal<boolean>(false);
  isShortIntro = signal<boolean>(false);
  progress = signal<number>(0);

  constructor() {
    if (this.isBrowser) {
      const hasVisited = sessionStorage.getItem('visited_satyam_portfolio');
      if (hasVisited) {
        this.isShortIntro.set(true);
      }
    }
  }

  markCompleted(): void {
    this.isCompleted.set(true);
    if (this.isBrowser) {
      sessionStorage.setItem('visited_satyam_portfolio', 'true');
    }
  }

  setProgress(val: number): void {
    this.progress.set(Math.min(100, Math.max(0, Math.floor(val))));
  }
}

