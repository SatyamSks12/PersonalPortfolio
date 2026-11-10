import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollService } from './core/scroll.service';
import { HeaderComponent } from './layout/header/header.component';
import { MenuOverlayComponent } from './layout/menu-overlay/menu-overlay.component';
import { CursorComponent } from './layout/cursor/cursor.component';
import { GrainOverlayComponent } from './layout/grain-overlay/grain-overlay.component';
import { ScrollProgressComponent } from './layout/scroll-progress/scroll-progress.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MenuOverlayComponent,
    CursorComponent,
    GrainOverlayComponent,
    ScrollProgressComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit, OnDestroy {
  scrollService = inject(ScrollService);
  isMenuOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.scrollService.init();
  }

  ngOnDestroy(): void {
    this.scrollService.destroy();
  }
}
