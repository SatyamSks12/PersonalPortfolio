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
                      <span class="cert-issuer">{{ cert.issuer }}</span>
                      @if (cert.issueDate) {
                        <span class="cert-date">{{ cert.issueDate }}</span>
                      }
                    </div>
                    <h4 class="cert-name">{{ cert.name }}</h4>
                    <p class="cert-skills">{{ cert.skills }}</p>
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
    </section>
  `,
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent implements OnInit, OnDestroy {
  content = PORTFOLIO_CONTENT;

  sectionRef = viewChild<ElementRef<HTMLElement>>('sectionRef');

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

