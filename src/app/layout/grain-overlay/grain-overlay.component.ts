import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-grain-overlay',
  standalone: true,
  template: `<div class="film-grain-overlay" aria-hidden="true"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GrainOverlayComponent {}

