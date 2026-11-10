import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PORTFOLIO_CONTENT, ProjectItem } from '../../content/portfolio.content';
import { CursorService } from '../../core/cursor.service';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-case-study',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent],
  template: `
    <main class="case-study-page" role="main">
      <div class="case-study-container">
        <a
          routerLink="/"
          class="back-link"
          (mouseenter)="cursorService.setState('link')"
          (mouseleave)="cursorService.reset()"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Projects</span>
        </a>

        @if (project(); as p) {
          <header class="case-header">
            <span class="category-badge">{{ p.categoryLabel }} • PROJECT {{ p.index }}</span>
            <h1 class="case-title">{{ p.name }}</h1>
            <p class="case-summary">{{ p.description }}</p>
          </header>

          <!-- 8.3 Unified Template: Overview, Problem, Approach, Architecture, Stack, Challenges, Outcome -->
          <section class="case-section-block">
            <span class="section-tag">01 // OVERVIEW</span>
            <h2 class="section-title">Project Overview</h2>
            <p>
              {{ p.name }} was designed to solve mission-critical operational challenges in modern software workflows, bridging autonomous AI agent coordination with enterprise-grade backend infrastructure.
            </p>
          </section>

          <section class="case-section-block">
            <span class="section-tag">02 // PROBLEM</span>
            <h2 class="section-title">The Challenge & Friction</h2>
            <p>
              Traditional deterministic architectures struggle to handle open-ended user inquiries without rigid flowcharts, while naive LLM completions suffer from hallucination and lack of deterministic state control.
            </p>
          </section>

          <section class="case-section-block">
            <span class="section-tag">03 // APPROACH</span>
            <h2 class="section-title">Architectural Solution</h2>
            <p>{{ p.architectureDetails }}</p>
            <p>
              By decoupling orchestration into state graph nodes with verification loops, the system ensures deterministic compliance without sacrificing conversational fluency.
            </p>
          </section>

          <section class="case-section-block">
            <span class="section-tag">04 // ARCHITECTURE DIAGRAM</span>
            <h2 class="section-title">System Blueprint</h2>
            <div class="architecture-diagram-card">
              <svg viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="80" width="100" height="60" rx="8" stroke="#CDB98A" stroke-width="2" fill="#18181F" />
                <text x="70" y="115" fill="#CDB98A" font-size="12" text-anchor="middle" font-family="Manrope">Client Request</text>

                <path d="M 120 110 L 190 110" stroke="#CDB98A" stroke-width="2" marker-end="url(#head)" />

                <rect x="190" y="60" width="130" height="100" rx="8" stroke="#ffffff" stroke-width="2" fill="#18181F" />
                <text x="255" y="105" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle" font-family="Manrope">State Router</text>
                <text x="255" y="125" fill="rgba(255,255,255,0.6)" font-size="10" text-anchor="middle" font-family="Manrope">LangGraph Graph</text>

                <path d="M 320 90 L 380 50" stroke="#CDB98A" stroke-width="1.5" />
                <path d="M 320 130 L 380 170" stroke="#CDB98A" stroke-width="1.5" />

                <rect x="380" y="20" width="120" height="50" rx="6" stroke="#ffffff" stroke-width="1.5" fill="#18181F" />
                <text x="440" y="50" fill="#ffffff" font-size="11" text-anchor="middle" font-family="Manrope">Tool Agent</text>

                <rect x="380" y="150" width="120" height="50" rx="6" stroke="#ffffff" stroke-width="1.5" fill="#18181F" />
                <text x="440" y="180" fill="#ffffff" font-size="11" text-anchor="middle" font-family="Manrope">Vector Store</text>

                <rect x="520" y="85" width="70" height="50" rx="6" stroke="#CDB98A" stroke-width="2" fill="#CDB98A" />
                <text x="555" y="115" fill="#0A0A0A" font-size="11" font-weight="bold" text-anchor="middle" font-family="Manrope">Critic</text>
              </svg>
            </div>
          </section>

          <section class="case-section-block">
            <span class="section-tag">05 // TECH STACK</span>
            <h2 class="section-title">Technologies Employed</h2>
            <div class="stack-tags-group">
              @for (tag of p.tags; track tag) {
                <span class="stack-tag">{{ tag }}</span>
              }
            </div>
          </section>

          <section class="case-section-block">
            <span class="section-tag">06 // CHALLENGES & RESOLUTIONS</span>
            <h2 class="section-title">Technical Obstacles</h2>
            <p>
              Managing latency during complex multi-hop tool execution was mitigated through speculative pre-fetching and Redis vector caching, ensuring round-trip times stayed under 800ms <span class="verify-badge">TBD-VERIFY</span>.
            </p>
          </section>

          <section class="case-section-block">
            <span class="section-tag">07 // OUTCOME</span>
            <h2 class="section-title">Results & Business Impact</h2>
            <p>
              Delivered a production-ready system capable of handling thousands of automated customer triage workflows without hallucinating compliance guidelines <span class="verify-badge">TBD-VERIFY</span>.
            </p>
          </section>

          @if (nextProject(); as np) {
            <footer class="next-project-footer">
              <span class="next-proj-label">Next Case Study</span>
              <a
                [routerLink]="np.caseStudyUrl"
                class="next-proj-link"
                (mouseenter)="cursorService.setState('link')"
                (mouseleave)="cursorService.reset()"
              >
                {{ np.name }} →
              </a>
            </footer>
          }
        }
      </div>
    </main>
    <app-footer />
  `,
  styleUrl: './case-study.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseStudyComponent implements OnInit {
  cursorService = inject(CursorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  project = signal<ProjectItem | null>(null);
  nextProject = signal<ProjectItem | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      const items = PORTFOLIO_CONTENT.projects.items;
      const index = items.findIndex((p) => p.id === id);

      if (index === -1) {
        this.router.navigate(['/']);
        return;
      }

      this.project.set(items[index]);
      this.nextProject.set(items[(index + 1) % items.length]);
    });
  }
}

