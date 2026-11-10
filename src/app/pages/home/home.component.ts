import { Component, ChangeDetectionStrategy, viewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PORTFOLIO_CONTENT } from '../../content/portfolio.content';
import { IntroMasterComponent } from '../../sections/intro/intro-master.component';
import { HeroComponent } from '../../sections/hero/hero.component';
import { AboutComponent } from '../../sections/about/about.component';
import { ExpertiseComponent } from '../../sections/expertise/expertise.component';
import { WorkIntroComponent } from '../../sections/work-intro/work-intro.component';
import { ProjectsComponent } from '../../sections/projects/projects.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IntroMasterComponent,
    HeroComponent,
    AboutComponent,
    ExpertiseComponent,
    WorkIntroComponent,
    ProjectsComponent
  ],
  template: `
    <!-- Master cinematic intro orchestration (Preloader -> Hello -> Cream Wipe) -->
    <app-intro-master (introFinished)="onIntroFinished()" />

    <main id="top" class="home-container" role="main">
      <!-- 7.4 Hero Section with liquid warp, condensed type & rotating badge -->
      <app-hero #heroRef />

      <!-- Section 7.5 About Section with string line & pinned portrait zoom -->
      <app-about />

      <!-- Section 7.6 Expertise with floating logos & interactive previews -->
      <app-expertise />

      <!-- Section 7.7 Work Intro with tech strip, giant WORK & goo droplets -->
      <app-work-intro />

      <!-- Section 7.8 Projects: Sticky stacked cards with parallax ghost words -->
      <app-projects />

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
