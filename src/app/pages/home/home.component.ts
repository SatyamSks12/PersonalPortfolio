import { Component, ChangeDetectionStrategy, viewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PORTFOLIO_CONTENT } from '../../content/portfolio.content';
import { IntroMasterComponent } from '../../sections/intro/intro-master.component';
import { HeroComponent } from '../../sections/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IntroMasterComponent, HeroComponent],
  template: `
    <!-- Master cinematic intro orchestration (Preloader -> Hello -> Cream Wipe) -->
    <app-intro-master (introFinished)="onIntroFinished()" />

    <main id="top" class="home-container" role="main">
      <!-- 7.4 Hero Section with liquid warp, condensed type & rotating badge -->
      <app-hero #heroRef />

      <!-- Section 7.5 About Section Anchor -->
      <section id="about" style="min-height: 100vh; padding: var(--section-padding-y) var(--gutter-side); background: var(--color-surface); position: relative; z-index: 15;">
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

      <!-- Section 7.6 Expertise Anchor -->
      <section id="expertise" style="min-height: 100vh; padding: var(--section-padding-y) var(--gutter-side); background: var(--color-obsidian); position: relative; z-index: 16;">
        <span class="label-badge">{{ content.expertise.sectionLabel }}</span>
        <h2 style="font-family: var(--font-display); font-size: clamp(2rem, 6vw, 5rem); margin: 20px 0;">
          <span style="color: var(--color-text-muted);">{{ content.expertise.headingPrefix }}</span>
          <span style="color: #ffffff;">{{ content.expertise.headingMain }}</span>
        </h2>
      </section>

      <!-- Section 7.7 & 7.8 Work & Projects Anchor -->
      <section id="work" style="min-height: 100vh; padding: var(--section-padding-y) var(--gutter-side); background: var(--color-obsidian); position: relative; z-index: 17;">
        <span class="label-badge">{{ content.projects.sectionLabel }}</span>
        <h2 style="font-family: var(--font-display); font-size: clamp(2rem, 6vw, 5rem); margin: 20px 0; color: var(--color-gold);">FEATURED PROJECTS</h2>
      </section>

      <!-- Section 7.9 Contact Anchor -->
      <section id="contact" style="min-height: 100vh; padding: var(--section-padding-y) var(--gutter-side); background: var(--color-surface); position: relative; z-index: 18;">
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
  heroRef = viewChild<HeroComponent>('heroRef');

  onIntroFinished(): void {
    this.heroRef()?.playRevealAnimation();
  }
}
