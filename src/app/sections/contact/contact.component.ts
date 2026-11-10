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
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_CONTENT } from '../../content/portfolio.content';
import { CursorService } from '../../core/cursor.service';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MagneticDirective],
  template: `
    <section #contactSection class="contact-section" id="contact">
      <!-- 7.9 Giant ghost word CONTACT with scroll drift -->
      <div #ghostWord class="contact-ghost-word" aria-hidden="true">
        CONTACT
      </div>

      <div class="contact-layout">
        <!-- Left column: Info cards & headline -->
        <div class="contact-left-col">
          <span class="label-badge">{{ content.contact.pillLabel }}</span>

          <h2 class="contact-headline">
            {{ content.contact.headlinePrefix }}<span class="gold-light">{{ content.contact.headlineHighlight }}</span>{{ content.contact.headlineSuffix }}
          </h2>

          <p class="contact-intro">{{ content.contact.paragraph }}</p>

          <div class="info-cards-list">
            @for (card of content.contact.infoCards; track card.label) {
              <a
                [href]="card.href"
                [target]="card.type === 'link' ? '_blank' : '_self'"
                [rel]="card.type === 'link' ? 'noopener noreferrer' : ''"
                class="info-card"
                (mouseenter)="cursorService.setState('link')"
                (mouseleave)="cursorService.reset()"
              >
                <div class="card-text">
                  <span class="card-label">{{ card.label }}</span>
                  <span class="card-val">{{ card.value }}</span>
                </div>
                <div class="card-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </a>
            }
          </div>
        </div>

        <!-- Right column: Glass panel contact form -->
        <div class="contact-glass-panel">
          @if (submitStatus() === 'success') {
            <div class="state-banner success" role="alert">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>{{ content.contact.form.successMessage }}</span>
            </div>
          } @else {
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form" novalidate>
              <!-- Hidden Honeypot Field for anti-spam (Section 7.9 & 11) -->
              <div class="hp-field" aria-hidden="true">
                <input type="text" formControlName="website" tabindex="-1" autocomplete="off" />
              </div>

              <div class="form-field-group">
                <label for="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  formControlName="name"
                  [placeholder]="content.contact.form.namePlaceholder"
                  (focus)="cursorService.setState('text')"
                  (blur)="cursorService.reset()"
                />
                @if (contactForm.get('name')?.invalid && contactForm.get('name')?.touched) {
                  <span class="error-hint">Please enter your name.</span>
                }
              </div>

              <div class="form-field-group">
                <label for="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  formControlName="email"
                  [placeholder]="content.contact.form.emailPlaceholder"
                  (focus)="cursorService.setState('text')"
                  (blur)="cursorService.reset()"
                />
                @if (contactForm.get('email')?.invalid && contactForm.get('email')?.touched) {
                  <span class="error-hint">Please enter a valid email address.</span>
                }
              </div>

              <div class="form-field-group">
                <label for="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  formControlName="message"
                  [placeholder]="content.contact.form.messagePlaceholder"
                  (focus)="cursorService.setState('text')"
                  (blur)="cursorService.reset()"
                ></textarea>
                @if (contactForm.get('message')?.invalid && contactForm.get('message')?.touched) {
                  <span class="error-hint">Message must be at least 10 characters long.</span>
                }
              </div>

              @if (submitStatus() === 'error') {
                <div class="state-banner error" role="alert">
                  <span>{{ content.contact.form.errorMessage }}</span>
                </div>
              }

              <!-- 6.7 Magnetic send button with loading state -->
              <button
                type="submit"
                class="submit-btn"
                appMagnetic
                [disabled]="isLoading() || contactForm.invalid"
                (mouseenter)="cursorService.setState('link')"
                (mouseleave)="cursorService.reset()"
              >
                @if (isLoading()) {
                  <span>{{ content.contact.form.sendingText }}</span>
                } @else {
                  <span>{{ content.contact.form.submitButtonText }}</span>
                }
              </button>
            </form>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit, OnDestroy {
  content = PORTFOLIO_CONTENT;
  cursorService = inject(CursorService);

  contactSection = viewChild<ElementRef<HTMLElement>>('contactSection');
  ghostWord = viewChild<ElementRef<HTMLDivElement>>('ghostWord');

  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private isBrowser = isPlatformBrowser(this.platformId);

  contactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    website: [''] // Honeypot field
  });

  isLoading = signal<boolean>(false);
  submitStatus = signal<'idle' | 'success' | 'error'>('idle');

  private scrollTriggerInstance: ScrollTrigger | null = null;

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);

      const section = this.contactSection()?.nativeElement;
      const ghost = this.ghostWord()?.nativeElement;
      if (!section || !ghost) return;

      this.scrollTriggerInstance = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(ghost, { y: (self.progress - 0.5) * -180 });
        }
      });
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid || this.isLoading()) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // Check honeypot field
    if (this.contactForm.value.website) {
      // Silently pretend success
      this.submitStatus.set('success');
      return;
    }

    this.isLoading.set(true);
    this.submitStatus.set('idle');

    // Simulate / invoke contact submission
    setTimeout(() => {
      this.isLoading.set(false);
      this.submitStatus.set('success');
      this.contactForm.reset();
    }, 1200);
  }

  ngOnDestroy(): void {
    this.scrollTriggerInstance?.kill();
  }
}

