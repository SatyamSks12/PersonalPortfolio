import { Component, ChangeDetectionStrategy, output, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';
import { HelloComponent } from './hello/hello.component';
import { CreamWipeComponent } from './cream-wipe/cream-wipe.component';
import { PreloaderService } from '../../core/preloader.service';
import { ScrollService } from '../../core/scroll.service';

@Component({
  selector: 'app-intro-master',
  standalone: true,
  imports: [CommonModule, PreloaderComponent, HelloComponent, CreamWipeComponent],
  template: `
    @if (currentStep() === 'preloader') {
      <app-preloader (completed)="onPreloaderDone()" />
    }
    @if (currentStep() === 'hello') {
      <app-hello (completed)="onHelloDone()" />
    }
    @if (currentStep() === 'wipe') {
      <app-cream-wipe (completed)="onWipeDone()" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroMasterComponent implements OnInit {
  introFinished = output<void>();

  private preloaderService = inject(PreloaderService);
  private scrollService = inject(ScrollService);

  currentStep = signal<'preloader' | 'hello' | 'wipe' | 'done'>('preloader');

  ngOnInit(): void {
    // 6.3 Scroll is locked until intro ends
    this.scrollService.stop();
  }

  onPreloaderDone(): void {
    if (this.preloaderService.isShortIntro()) {
      this.currentStep.set('wipe');
    } else {
      this.currentStep.set('hello');
    }
  }

  onHelloDone(): void {
    this.currentStep.set('wipe');
  }

  onWipeDone(): void {
    this.currentStep.set('done');
    this.scrollService.start();
    this.introFinished.emit();
  }
}

