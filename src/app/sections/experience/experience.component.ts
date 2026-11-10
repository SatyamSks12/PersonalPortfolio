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
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_CONTENT } from '../../content/portfolio.content';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="experience-section" id="experience" #sectionRef>
      <div class="experience-header-block">
        <span class="label-badge">{{ content.experience.sectionLabel }}</span>
        <h2 class="experience-heading">
          <span class="heading-muted">{{ content.experience.headingPrefix }}</span>
          <span class="heading-white">{{ content.experience.headingMain }}</span>
        </h2>
        <p class="experience-intro">{{ content.experience.intro }}</p>
      </div>

      <div class="experience-grid">
        <!-- Left Column: Work Experience Timeline -->
        <div class="timeline-column">
          <div class="column-title-row">
            <div class="column-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <h3 class="column-title">Work Experience</h3>
          </div>

          <div class="jobs-timeline-list">
            @for (job of content.experience.jobs; track job.role + job.period) {
              <div class="job-card">
                <div class="job-card-header">
                  <div class="job-meta-top">
                    <span class="company-name">{{ job.company }}</span>
                    @if (job.badge) {
                      <span class="job-badge" [class.current]="job.badge === 'CURRENT'">
                        {{ job.badge }}
                      </span>
                    }
                  </div>
                  <h4 class="job-role">{{ job.role }}</h4>
                  <div class="job-time-location">
                    <span class="period-text">{{ job.period }}</span>
                    <span class="dot-sep">•</span>
                    <span class="location-text">{{ job.location }}</span>
                  </div>
                </div>

                <p class="job-summary">{{ job.summary }}</p>

                <ul class="job-points-list">
                  @for (point of job.points; track point) {
                    <li class="job-point-item">
                      <svg class="point-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                      <span>{{ point }}</span>
                    </li>
                  }
                </ul>

                <div class="job-skills-chips">
                  @for (skill of job.skills; track skill) {
                    <span class="skill-tag">{{ skill }}</span>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Right Column: Certifications & Education -->
        <div class="credentials-column">
          <!-- Certifications Group -->
          <div class="credentials-group">
            <div class="column-title-row">
              <div class="column-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <h3 class="column-title">Certifications & Credentials</h3>
            </div>

            <div class="certifications-list">
              @for (cert of content.experience.certifications; track cert.name) {
                <div class="cert-card">
                  <div class="cert-badge-ribbon" [style.background-color]="cert.badgeColor || '#CDB98A'"></div>
                  <div class="cert-body">
                    <div class="cert-header">
                      <div class="cert-issuer-group">
                        @if (cert.issuerLogoUrl) {
                          <img [src]="cert.issuerLogoUrl" [alt]="cert.issuer" class="cert-issuer-logo" />
                        }
                        <span class="cert-issuer">{{ cert.issuer }}</span>
                      </div>
                      @if (cert.issueDate) {
                        <span class="cert-date">{{ cert.issueDate }}</span>
                      }
                    </div>
                    <h4 class="cert-name">{{ cert.name }}</h4>
                    <p class="cert-skills">{{ cert.skills }}</p>

                    @if (cert.mediaAttachment; as media) {
                      <div
                        class="cert-media-card"
                        (click)="openCertModal(media)"
                        role="button"
                        tabindex="0"
                        (keydown.enter)="openCertModal(media)"
                        (keydown.space)="openCertModal(media)"
                        title="Click to view credential"
                      >
                        <div class="media-thumb-box">
                          <img [src]="media.thumbnailUrl" [alt]="media.title" class="media-thumb-img" />
                          <div class="media-zoom-overlay">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <circle cx="11" cy="11" r="8"></circle>
                              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                              <line x1="11" y1="8" x2="11" y2="14"></line>
                              <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                          </div>
                        </div>
                        <div class="media-info">
                          <span class="media-title">{{ media.title }}</span>
                          <span class="media-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                            Verified Credential
                          </span>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Education Group -->
          <div class="education-group">
            <div class="column-title-row">
              <div class="column-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <h3 class="column-title">Education & Academics</h3>
            </div>

            <div class="education-card">
              <div class="edu-top">
                <span class="edu-institution">{{ content.experience.education.institution }}</span>
                <span class="edu-cpi-pill">{{ content.experience.education.cpi }}</span>
              </div>
              <h4 class="edu-degree">{{ content.experience.education.degree }}</h4>
              <div class="edu-meta">
                <span>{{ content.experience.education.period }}</span>
                <span class="dot-sep">•</span>
                <span>{{ content.experience.education.location }}</span>
              </div>

              <ul class="edu-highlights">
                @for (item of content.experience.education.highlights; track item) {
                  <li class="edu-highlight-item">
                    <span class="gold-bullet"></span>
                    <span>{{ item }}</span>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>

      @if (activeModalImage(); as modal) {
        <div
          class="cert-modal-backdrop"
          (click)="closeCertModal()"
          (keydown.escape)="closeCertModal()"
          tabindex="0"
          role="dialog"
          aria-modal="true"
          aria-label="Certificate preview"
        >
          <div class="cert-modal-card" (click)="$event.stopPropagation()">
            <div class="cert-modal-header">
              <span class="cert-modal-title">{{ modal.title }}</span>
              <button
                class="cert-modal-close"
                (click)="closeCertModal()"
                aria-label="Close certificate preview"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="cert-modal-body">
              <img [src]="modal.url" [alt]="modal.title" class="cert-modal-image" />
            </div>
          </div>
        </div>
      }
    </section>
  `,
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent implements OnInit, OnDestroy {
  content = PORTFOLIO_CONTENT;

  sectionRef = viewChild<ElementRef<HTMLElement>>('sectionRef');

  activeModalImage = signal<{ title: string; url: string } | null>(null);

  openCertModal(media: { title: string; fullImageUrl?: string; thumbnailUrl: string }): void {
    this.activeModalImage.set({
      title: media.title,
      url: media.fullImageUrl || media.thumbnailUrl
    });
  }

  closeCertModal(): void {
    this.activeModalImage.set(null);
  }

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);
  private scrollTriggers: ScrollTrigger[] = [];

  ngOnInit(): void {
    if (!this.isBrowser) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      const sectionEl = this.sectionRef()?.nativeElement;
      if (!sectionEl) return;

      const cards = sectionEl.querySelectorAll('.job-card, .cert-card, .education-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.scrollTriggers.forEach((st) => st.kill());
  }
}

