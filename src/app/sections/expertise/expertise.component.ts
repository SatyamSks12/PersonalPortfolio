import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ElementRef,
  PLATFORM_ID,
  inject,
  NgZone,
  viewChild,
  signal
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PORTFOLIO_CONTENT, ExpertiseRow } from '../../content/portfolio.content';
import { CursorService } from '../../core/cursor.service';
import { PhysicsLogosComponent } from '../../shared/physics-logos/physics-logos.component';

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [CommonModule, PhysicsLogosComponent],
  template: `
    <section class="expertise-section" id="expertise">
      <!-- 7.6 Floating tech logos with physics & zero gravity in background -->
      <app-physics-logos />

      <div class="expertise-layout">
        <!-- 7.6 Left sticky column -->
        <div class="expertise-sticky-col">
          <span class="label-badge">{{ content.expertise.sectionLabel }}</span>

          <h2 class="expertise-heading">
            <span class="heading-muted">{{ content.expertise.headingPrefix }}</span>
            <span class="heading-white">{{ content.expertise.headingMain }}</span>
          </h2>

          <p class="expertise-intro">{{ content.expertise.intro }}</p>

          <div class="chips-container">
            @for (chip of content.expertise.chips; track chip) {
              <span class="tech-chip">{{ chip }}</span>
            }
          </div>
        </div>

        <!-- 7.6 Right column: 4 rows -->
        <div class="expertise-rows-col" (mouseleave)="onMouseLeaveList()">
          @for (row of content.expertise.rows; track row.index) {
            <div
              class="expertise-row"
              (mouseenter)="onRowEnter(row)"
              (mousemove)="onRowMouseMove($event)"
              (mouseleave)="onRowLeave()"
            >
              <div class="row-left-meta">
                <span class="row-index">{{ row.index }}</span>
                <div class="icon-square">
                  <!-- Row specific icon -->
                  @switch (row.index) {
                    @case ('01') {
                      <!-- Brain / Agent Network -->
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5V11a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.5c1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4z"></path>
                        <path d="M7 14v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4"></path>
                        <line x1="12" y1="13" x2="12" y2="20"></line>
                      </svg>
                    }
                    @case ('02') {
                      <!-- Server / Microservices -->
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                        <line x1="6" y1="6" x2="6.01" y2="6"></line>
                        <line x1="6" y1="18" x2="6.01" y2="18"></line>
                      </svg>
                    }
                    @case ('03') {
                      <!-- Web / Signals Layout -->
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                      </svg>
                    }
                    @default {
                      <!-- Blueprint / Architecture -->
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                      </svg>
                    }
                  }
                </div>
              </div>

              <div class="row-center-content">
                <h3 class="row-title">{{ row.title }}</h3>
                <p class="row-desc">{{ row.description }}</p>
                <div class="row-tags">
                  @for (tag of row.tags; track tag) {
                    <span class="tag-pill">{{ tag }}</span>
                  }
                </div>
              </div>

              <div class="row-arrow" aria-hidden="true">
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- 7.6 Floating preview card following cursor -->
      <div
        #floatingCard
        class="floating-preview-card"
        [class.is-visible]="activeRow() !== null"
        aria-hidden="true"
      >
        @if (activeRow(); as row) {
          <div class="preview-diagram">
            @switch (row.previewId) {
              @case ('agents-preview') {
                <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="60" r="16" stroke="#CDB98A" stroke-width="1.5" fill="#18181F" />
                  <text x="40" y="64" fill="#CDB98A" font-size="9" text-anchor="middle" font-family="Manrope">Plan</text>
                  <line x1="56" y1="60" x2="88" y2="35" stroke="#CDB98A" stroke-dasharray="3 3" />
                  <line x1="56" y1="60" x2="88" y2="85" stroke="#CDB98A" stroke-dasharray="3 3" />
                  <circle cx="104" cy="35" r="16" stroke="#ffffff" stroke-width="1.5" fill="#18181F" />
                  <text x="104" y="39" fill="#ffffff" font-size="9" text-anchor="middle" font-family="Manrope">Tool</text>
                  <circle cx="104" cy="85" r="16" stroke="#ffffff" stroke-width="1.5" fill="#18181F" />
                  <text x="104" y="89" fill="#ffffff" font-size="9" text-anchor="middle" font-family="Manrope">RAG</text>
                  <circle cx="168" cy="60" r="16" stroke="#CDB98A" stroke-width="1.5" fill="#CDB98A" />
                  <text x="168" y="64" fill="#0A0A0A" font-size="9" font-weight="bold" text-anchor="middle" font-family="Manrope">Critic</text>
                  <line x1="120" y1="35" x2="152" y2="60" stroke="#CDB98A" />
                  <line x1="120" y1="85" x2="152" y2="60" stroke="#CDB98A" />
                </svg>
              }
              @case ('backend-preview') {
                <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="45" width="40" height="30" rx="4" stroke="#ffffff" stroke-width="1.5" fill="#18181F" />
                  <text x="40" y="64" fill="#ffffff" font-size="8" text-anchor="middle" font-family="Manrope">YARP</text>
                  <path d="M 60 60 L 90 60" stroke="#CDB98A" stroke-width="1.5" marker-end="url(#arrow)" />
                  <rect x="90" y="25" width="45" height="28" rx="4" stroke="#CDB98A" stroke-width="1.5" fill="#18181F" />
                  <text x="112" y="42" fill="#CDB98A" font-size="8" text-anchor="middle" font-family="Manrope">.NET 8</text>
                  <rect x="90" y="68" width="45" height="28" rx="4" stroke="#CDB98A" stroke-width="1.5" fill="#18181F" />
                  <text x="112" y="85" fill="#CDB98A" font-size="8" text-anchor="middle" font-family="Manrope">FastAPI</text>
                  <circle cx="165" cy="60" r="18" stroke="#ffffff" stroke-width="1.5" fill="#18181F" />
                  <text x="165" y="63" fill="#ffffff" font-size="7" text-anchor="middle" font-family="Manrope">RabbitMQ</text>
                </svg>
              }
              @case ('web-preview') {
                <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="25" y="20" width="150" height="80" rx="6" stroke="#ffffff" stroke-width="1.5" fill="#18181F" />
                  <line x1="25" y1="40" x2="175" y2="40" stroke="rgba(255,255,255,0.1)" />
                  <circle cx="38" cy="30" r="3" fill="#CDB98A" />
                  <circle cx="48" cy="30" r="3" fill="rgba(255,255,255,0.3)" />
                  <rect x="40" y="52" width="50" height="36" rx="4" stroke="#CDB98A" stroke-width="1.2" fill="none" />
                  <text x="65" y="73" fill="#CDB98A" font-size="8" text-anchor="middle" font-family="Manrope">Signals</text>
                  <rect x="105" y="52" width="55" height="36" rx="4" stroke="#ffffff" stroke-width="1.2" fill="none" />
                  <text x="132" y="73" fill="#ffffff" font-size="8" text-anchor="middle" font-family="Manrope">SSR + RxJS</text>
                </svg>
              }
              @default {
                <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="30" y="25" width="60" height="32" rx="4" stroke="#CDB98A" stroke-width="1.5" fill="#18181F" />
                  <text x="60" y="45" fill="#CDB98A" font-size="8" text-anchor="middle" font-family="Manrope">HLD System</text>
                  <path d="M 90 41 L 125 41 L 125 75 L 140 75" stroke="#ffffff" stroke-width="1.2" />
                  <rect x="110" y="65" width="60" height="32" rx="4" stroke="#ffffff" stroke-width="1.5" fill="#18181F" />
                  <text x="140" y="85" fill="#ffffff" font-size="8" text-anchor="middle" font-family="Manrope">LLD Classes</text>
                </svg>
              }
            }
          </div>
        }
      </div>
    </section>
  `,
  styleUrl: './expertise.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpertiseComponent implements OnInit, OnDestroy {
  content = PORTFOLIO_CONTENT;
  cursorService = inject(CursorService);

  floatingCard = viewChild<ElementRef<HTMLDivElement>>('floatingCard');

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  activeRow = signal<ExpertiseRow | null>(null);

  private targetX = -200;
  private targetY = -200;
  private currentX = -200;
  private currentY = -200;
  private rafId: number | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      // Smooth lerp loop for floating preview card
      const render = () => {
        const lerp = 0.2;
        this.currentX += (this.targetX - this.currentX) * lerp;
        this.currentY += (this.targetY - this.currentY) * lerp;

        const card = this.floatingCard()?.nativeElement;
        if (card) {
          card.style.transform = `translate3d(${this.currentX + 24}px, ${this.currentY - 80}px, 0)`;
        }

        this.rafId = requestAnimationFrame(render);
      };

      this.rafId = requestAnimationFrame(render);
    });
  }

  onRowEnter(row: ExpertiseRow): void {
    this.activeRow.set(row);
    this.cursorService.setState('link');
  }

  onRowMouseMove(e: MouseEvent): void {
    this.targetX = e.clientX;
    this.targetY = e.clientY;
  }

  onRowLeave(): void {
    this.cursorService.reset();
  }

  onMouseLeaveList(): void {
    this.activeRow.set(null);
    this.cursorService.reset();
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}

