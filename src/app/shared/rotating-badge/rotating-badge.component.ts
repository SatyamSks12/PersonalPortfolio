import { Component, ChangeDetectionStrategy, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagneticDirective } from '../directives/magnetic.directive';
import { CursorService } from '../../core/cursor.service';

@Component({
  selector: 'app-rotating-badge',
  standalone: true,
  imports: [CommonModule, MagneticDirective],
  template: `
    <div
      class="rotating-badge-container"
      appMagnetic
      (click)="badgeClick.emit()"
      (mouseenter)="cursorService.setState('link')"
      (mouseleave)="cursorService.reset()"
      role="button"
      [attr.aria-label]="ariaLabel()"
      tabindex="0"
    >
      <svg class="badge-svg" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path
            id="textPathCircle"
            d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
          />
        </defs>
        <text>
          <textPath href="#textPathCircle" startOffset="0%">
            {{ text() }}
          </textPath>
        </text>
      </svg>

      <div class="badge-center-circle" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
    </div>
  `,
  styleUrl: './rotating-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RotatingBadgeComponent {
  text = input<string>("LET'S WORK TOGETHER • LET'S WORK TOGETHER • ");
  ariaLabel = input<string>("Let's work together - Contact Satyam");
  badgeClick = output<void>();

  cursorService = inject(CursorService);
}

