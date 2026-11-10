import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PORTFOLIO_CONTENT } from '../../content/portfolio.content';
import { CursorService } from '../../core/cursor.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main id="top" class="home-container" role="main">
      <section id="hero" style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: var(--color-cream); color: var(--color-ink); padding: 0 var(--gutter-side);">
        <p class="label-badge" style="color: var(--color-ink); margin-bottom: 16px;">{{ content.hero.secondaryWord }}</p>
        <h1 class="display-giant" style="font-size: clamp(3rem, 12vw, 10rem); text-align: center;">{{ content.hero.giantWord }}</h1>
        <div style="display: flex; gap: 16px; margin-top: 24px; font-weight: 700; font-size: 12px; letter-spacing: 0.2em;">
          @for (tag of content.hero.miniLabels; track tag) {
            <span>{{ tag }}</span>
          }
        </div>
      </section>

      <section id="work" style="min-height: 100vh; padding: var(--section-padding-y) var(--gutter-side); background: var(--color-obsidian);">
        <span class="label-badge">{{ content.projects.sectionLabel }}</span>
        <h2 style="font-family: var(--font-display); font-size: clamp(2rem, 6vw, 5rem); margin: 20px 0; color: var(--color-gold);">FEATURED PROJECTS</h2>
        <div style="display: grid; gap: 40px; margin-top: 40px;">
          @for (proj of content.projects.items; track proj.id) {
            <div
              (mouseenter)="cursorService.setState('project', 'VIEW')"
              (mouseleave)="cursorService.reset()"
              style="padding: 40px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px;"
            >
              <span class="label-badge">{{ proj.categoryLabel }}</span>
              <h3 style="font-size: 2rem; margin: 12px 0;">{{ proj.name }}</h3>
              <p style="color: var(--color-text-muted); max-width: 600px;">{{ proj.description }}</p>
            </div>
          }
        </div>
      </section>

      <section id="about" style="min-height: 100vh; padding: var(--section-padding-y) var(--gutter-side); background: var(--color-surface);">
        <span class="label-badge">{{ content.about.sectionLabel }}</span>
        <h2 style="font-family: var(--font-display); font-size: clamp(2rem, 6vw, 5rem); margin: 20px 0; color: var(--color-gold);">{{ content.about.heading }}</h2>
        <p style="font-size: 1.5rem; max-width: 800px; line-height: 1.4;">
          {{ content.about.headlinePart1 }}
          <strong style="color: var(--color-gold);">{{ content.about.headlineHighlight1 }}</strong>
          {{ content.about.headlinePart2 }}
          <strong style="color: var(--color-gold);">{{ content.about.headlineHighlight2 }}</strong>
          {{ content.about.headlinePart3 }}
        </p>
      </section>

      <section id="expertise" style="min-height: 100vh; padding: var(--section-padding-y) var(--gutter-side); background: var(--color-obsidian);">
        <span class="label-badge">{{ content.expertise.sectionLabel }}</span>
        <h2 style="font-family: var(--font-display); font-size: clamp(2rem, 6vw, 5rem); margin: 20px 0;">
          <span style="color: var(--color-text-muted);">{{ content.expertise.headingPrefix }}</span>
          <span style="color: #ffffff;">{{ content.expertise.headingMain }}</span>
        </h2>
      </section>

      <section id="contact" style="min-height: 100vh; padding: var(--section-padding-y) var(--gutter-side); background: var(--color-obsidian);">
        <span class="label-badge">{{ content.contact.pillLabel }}</span>
        <h2 style="font-family: var(--font-display); font-size: clamp(2rem, 6vw, 5rem); margin: 20px 0;">
          {{ content.contact.headlinePrefix }}<span style="color: var(--color-gold);">{{ content.contact.headlineHighlight }}</span>{{ content.contact.headlineSuffix }}
        </h2>
      </section>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  content = PORTFOLIO_CONTENT;
  cursorService = inject(CursorService);
}

