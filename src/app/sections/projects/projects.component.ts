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
import { Router, RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_CONTENT, ProjectItem } from '../../content/portfolio.content';
import { CursorService } from '../../core/cursor.service';
import { RotatingBadgeComponent } from '../../shared/rotating-badge/rotating-badge.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, RotatingBadgeComponent],
  template: `
    <section class="projects-section" id="work">
      <!-- 7.8 Sticky label MY WORK -->
      <div class="sticky-work-label">
        <span class="label-pill">{{ content.projects.sectionLabel }}</span>
      </div>

      <!-- 7.8 Stacking cards container -->
      <div #stackContainer class="cards-stack-container">
        @for (project of content.projects.items; track project.id; let idx = $index) {
          <article
            class="project-card"
            [attr.data-card-idx]="idx"
            tabindex="0"
            (mouseenter)="onCardEnter()"
            (mouseleave)="onCardLeave()"
            (keydown.enter)="onCardClick(project)"
            [attr.aria-label]="project.name + ' - ' + project.categoryLabel"
          >
            <!-- Background Layer with diagram and dimming overlay -->
            <div class="card-bg-layer" aria-hidden="true">
              <div class="card-diagram-bg">
                <svg viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 100 300 Q 350 100 600 300 T 1100 300" stroke="#CDB98A" stroke-width="1" stroke-dasharray="4 4" />
                  <circle cx="350" cy="200" r="80" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
                  <circle cx="650" cy="380" r="120" stroke="rgba(205,185,138,0.2)" stroke-width="1.5" />
                  <rect x="200" y="380" width="160" height="100" rx="8" stroke="rgba(255,255,255,0.1)" />
                </svg>
              </div>
              <div class="card-bg-overlay"></div>
            </div>

            <!-- 7.8 Huge ghost word in low opacity with parallax -->
            <div class="card-ghost-word" aria-hidden="true">
              {{ project.ghostWord }}
            </div>

            <!-- Card Content Left-Aligned -->
            <div class="card-content-wrap">
              <div class="card-meta-line">
                <span class="dot"></span>
                <span>{{ project.categoryLabel }}</span>
                <span class="dot"></span>
                <span>{{ project.index }}</span>
              </div>

              <a
                [routerLink]="project.caseStudyUrl"
                class="project-card-link-title"
                (click)="onCardClick(project)"
              >
                {{ project.name }}
              </a>

              <p class="card-description">{{ project.description }}</p>

              <div class="card-tags">
                @for (tag of project.tags; track tag) {
                  <span class="card-tag-pill">{{ tag }}</span>
                }
              </div>
            </div>

            <!-- 7.8 Bottom-Right Rotating circular badge: VIEW CASE STUDY -->
            <div class="card-badge-anchor">
              <app-rotating-badge
                [text]="project.liveUrl ? 'VIEW MASTERPIECE • LIVE DEMO • ' : 'VIEW CASE STUDY • VIEW CASE STUDY • '"
                [ariaLabel]="'View case study for ' + project.name"
                (badgeClick)="onCardClick(project)"
              />
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit, OnDestroy {
  content = PORTFOLIO_CONTENT;

  stackContainer = viewChild<ElementRef<HTMLDivElement>>('stackContainer');

  private router = inject(Router);
  private cursorService = inject(CursorService);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  private triggers: ScrollTrigger[] = [];

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      const container = this.stackContainer()?.nativeElement;
      if (!container) return;

      const cards = container.querySelectorAll<HTMLElement>('.project-card');

      // 7.8 Stacking cards: each card pins at top while next slides over it
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1];

          // As next card scrolls up over this card, scale this card to 0.92 and darken to 40%
          const st = ScrollTrigger.create({
            trigger: nextCard,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.08; // 1 to 0.92
              const brightness = 1 - progress * 0.6; // 1 to 0.4
              gsap.set(card, {
                scale,
                filter: `brightness(${brightness})`,
                transformOrigin: 'center top'
              });
            }
          });

          this.triggers.push(st);
        }

        // Parallax ghost word
        const ghost = card.querySelector<HTMLElement>('.card-ghost-word');
        if (ghost) {
          const ghostSt = ScrollTrigger.create({
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              gsap.set(ghost, { y: (self.progress - 0.5) * -120 });
            }
          });
          this.triggers.push(ghostSt);
        }
      });
    });
  }

  onCardEnter(): void {
    this.cursorService.setState('project', 'VIEW');
  }

  onCardLeave(): void {
    this.cursorService.reset();
  }

  onCardClick(project: ProjectItem): void {
    this.cursorService.reset();
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else {
      this.router.navigateByUrl(project.caseStudyUrl);
    }
  }

  ngOnDestroy(): void {
    for (const t of this.triggers) {
      t.kill();
    }
    this.triggers = [];
  }
}

