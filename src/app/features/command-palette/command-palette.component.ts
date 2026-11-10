import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
  inject,
  signal,
  ElementRef,
  viewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollService } from '../../core/scroll.service';
import { CursorService } from '../../core/cursor.service';
import { PORTFOLIO_CONTENT } from '../../content/portfolio.content';

interface PaletteCommand {
  id: string;
  label: string;
  category: 'Navigation' | 'Case Study' | 'Action';
  icon: string;
  action: () => void;
}

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen()) {
      <div
        class="palette-backdrop"
        (click)="closePalette()"
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        <div class="palette-box" (click)="$event.stopPropagation()">
          <div class="palette-search-row">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              #searchInput
              type="text"
              [value]="searchQuery()"
              (input)="onSearchInput($event)"
              placeholder="Search sections, projects, or actions..."
              autocomplete="off"
            />
            <span class="kbd-esc">ESC</span>
          </div>

          <div class="palette-results-list" role="listbox">
            @for (cmd of filteredCommands(); track cmd.id; let idx = $index) {
              <div
                class="palette-item"
                [class.selected]="idx === selectedIndex()"
                (click)="executeCommand(cmd)"
                (mouseenter)="selectedIndex.set(idx)"
                role="option"
                [attr.aria-selected]="idx === selectedIndex()"
              >
                <div class="item-left">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    @switch (cmd.icon) {
                      @case ('link') {
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      }
                      @case ('file') {
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      }
                      @default {
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      }
                    }
                  </svg>
                  <span class="item-label">{{ cmd.label }}</span>
                </div>
                <span class="item-cat">{{ cmd.category }}</span>
              </div>
            }
          </div>

          <footer class="palette-footer">
            <div class="shortcuts-hint">
              <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
              <span><kbd>↵</kbd> Select</span>
              <span><kbd>esc</kbd> Close</span>
            </div>
            <div>{{ content.identity.name }}</div>
          </footer>
        </div>
      </div>
    }
  `,
  styleUrl: './command-palette.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandPaletteComponent {
  content = PORTFOLIO_CONTENT;

  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  private router = inject(Router);
  private scrollService = inject(ScrollService);
  private cursorService = inject(CursorService);

  isOpen = signal<boolean>(false);
  searchQuery = signal<string>('');
  selectedIndex = signal<number>(0);

  private commands: PaletteCommand[] = [
    {
      id: 'nav-work',
      label: 'Jump to Featured Projects',
      category: 'Navigation',
      icon: 'link',
      action: () => this.navigateToSection('#work')
    },
    {
      id: 'nav-about',
      label: 'Jump to About Me',
      category: 'Navigation',
      icon: 'link',
      action: () => this.navigateToSection('#about')
    },
    {
      id: 'nav-expertise',
      label: 'Jump to Expertise',
      category: 'Navigation',
      icon: 'link',
      action: () => this.navigateToSection('#expertise')
    },
    {
      id: 'nav-contact',
      label: 'Jump to Contact',
      category: 'Navigation',
      icon: 'link',
      action: () => this.navigateToSection('#contact')
    },
    {
      id: 'nav-journal',
      label: 'Read Engineering Journal',
      category: 'Navigation',
      icon: 'link',
      action: () => {
        this.closePalette();
        this.router.navigate(['/journal']);
      }
    },
    {
      id: 'case-support-copilot',
      label: 'Case Study: Support Copilot (Multi-Agent)',
      category: 'Case Study',
      icon: 'file',
      action: () => {
        this.closePalette();
        this.router.navigate(['/case-study', 'support-copilot']);
      }
    },
    {
      id: 'case-agent-commerce',
      label: 'Case Study: AgentCommerce (AI E-Commerce)',
      category: 'Case Study',
      icon: 'file',
      action: () => {
        this.closePalette();
        this.router.navigate(['/case-study', 'agent-commerce']);
      }
    },
    {
      id: 'case-meeting-iq',
      label: 'Case Study: MeetingIQ (Meeting Intelligence)',
      category: 'Case Study',
      icon: 'file',
      action: () => {
        this.closePalette();
        this.router.navigate(['/case-study', 'meeting-iq']);
      }
    },
    {
      id: 'case-connect-sphere',
      label: 'Case Study: ConnectSphere (.NET 8 Microservices)',
      category: 'Case Study',
      icon: 'file',
      action: () => {
        this.closePalette();
        this.router.navigate(['/case-study', 'connect-sphere']);
      }
    },
    {
      id: 'act-email',
      label: 'Copy Email to Clipboard',
      category: 'Action',
      icon: 'action',
      action: () => {
        navigator.clipboard.writeText(this.content.identity.email);
        alert('Email copied to clipboard: ' + this.content.identity.email);
        this.closePalette();
      }
    },
    {
      id: 'act-resume',
      label: 'Download Resume PDF',
      category: 'Action',
      icon: 'action',
      action: () => {
        window.open(this.content.identity.resumePdfUrl, '_blank');
        this.closePalette();
      }
    }
  ];

  filteredCommands = signal<PaletteCommand[]>(this.commands);

  @HostListener('window:keydown', ['$event'])
  onGlobalKeyDown(e: KeyboardEvent): void {
    // 8.2 Ctrl+K or Cmd+K opens search overlay
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.togglePalette();
      return;
    }

    if (!this.isOpen()) return;

    if (e.key === 'Escape') {
      this.closePalette();
      return;
    }

    const list = this.filteredCommands();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.selectedIndex.update((i) => (i + 1) % list.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.selectedIndex.update((i) => (i - 1 + list.length) % list.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = list[this.selectedIndex()];
      if (selected) {
        this.executeCommand(selected);
      }
    }
  }

  togglePalette(): void {
    const next = !this.isOpen();
    this.isOpen.set(next);
    if (next) {
      this.searchQuery.set('');
      this.filteredCommands.set(this.commands);
      this.selectedIndex.set(0);
      setTimeout(() => this.searchInput()?.nativeElement.focus(), 50);
    }
  }

  closePalette(): void {
    this.isOpen.set(false);
  }

  onSearchInput(e: Event): void {
    const q = (e.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery.set(q);
    const results = this.commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
    this.filteredCommands.set(results);
    this.selectedIndex.set(0);
  }

  executeCommand(cmd: PaletteCommand): void {
    cmd.action();
  }

  private navigateToSection(hash: string): void {
    this.closePalette();
    if (window.location.pathname !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollService.scrollTo(hash, { offset: -60, duration: 1.2 }), 400);
      });
    } else {
      this.scrollService.scrollTo(hash, { offset: -60, duration: 1.2 });
    }
  }
}

