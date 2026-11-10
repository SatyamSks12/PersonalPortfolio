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

      <!-- Additional Capstones & Projects Grid -->
      <div class="archive-projects-wrapper">
        <div class="archive-header-row">
          <span class="label-badge">EXPLORE MORE</span>
          <h3 class="archive-title">{{ content.projects.archiveHeading }}</h3>
          <p class="archive-intro">{{ content.projects.archiveIntro }}</p>
        </div>

        <div class="archive-cards-grid">
          @for (item of content.projects.archiveItems; track item.id) {
            <div class="archive-card">
              <div class="archive-card-top">
                <div class="archive-icon-box">
                  @switch (item.icon) {
                    @case ('chart') {
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                      </svg>
                    }
                    @case ('wallet') {
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <line x1="2" y1="10" x2="22" y2="10"></line>
                        <circle cx="16" cy="15" r="1.5"></circle>
                      </svg>
                    }
                    @case ('user') {
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    }
                    @case ('fire') {
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                      </svg>
                    }
                    @default {
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                    }
                  }
                </div>

                <div class="archive-action-links">
                  @if (item.githubUrl) {
                    <a
                      [href]="item.githubUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="archive-link-btn"
                      title="View GitHub Repository"
                      (mouseenter)="cursorService.setState('link')"
                      (mouseleave)="cursorService.reset()"
                      aria-label="View source code on GitHub"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                  }
                  <a
                    [href]="item.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="archive-link-btn"
                    title="Open Link"
                    (mouseenter)="cursorService.setState('link')"
                    (mouseleave)="cursorService.reset()"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>

              <div class="archive-card-meta">
                <span class="archive-cat-badge">{{ item.category }}</span>
                <h4 class="archive-card-title">{{ item.title }}</h4>
                <p class="archive-card-desc">{{ item.description }}</p>
              </div>

              <div class="archive-tags-row">
                @for (tag of item.tags; track tag) {
                  <span class="archive-tag">{{ tag }}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit, OnDestroy {
  content = PORTFOLIO_CONTENT;

  stackContainer = viewChild<ElementRef<HTMLDivElement>>('stackContainer');

  cursorService = inject(CursorService);
  private router = inject(Router);
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

