import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  ElementRef,
  viewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PORTFOLIO_CONTENT } from '../../content/portfolio.content';
import { CursorService } from '../../core/cursor.service';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  source?: string;
}

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- 8.1 Floating button at bottom-right -->
    <button
      type="button"
      class="assistant-trigger-btn"
      (click)="togglePanel()"
      (mouseenter)="cursorService.setState('link')"
      (mouseleave)="cursorService.reset()"
      [attr.aria-label]="isOpen() ? 'Close AI Assistant' : 'Open Ask Satyam AI Assistant'"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>

    @if (isOpen()) {
      <div class="assistant-panel-backdrop" role="dialog" aria-modal="true" aria-label="Ask Satyam AI Assistant">
        <header class="panel-header">
          <div class="header-info">
            <span class="bot-name">{{ content.assistant.name }}</span>
            <span class="bot-status">Grounding & RAG active</span>
          </div>
          <button
            type="button"
            class="close-icon-btn"
            (click)="togglePanel()"
            aria-label="Close assistant panel"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <div #scrollArea class="chat-messages-scroll">
          @for (msg of messages(); track $index) {
            <div class="message-bubble" [class]="msg.sender">
              <span>{{ msg.text }}</span>
              @if (msg.source) {
                <span class="source-tag">Source: {{ msg.source }}</span>
              }
            </div>
          }

          @if (messages().length === 1) {
            <div class="suggested-questions-box">
              @for (q of content.assistant.suggestedQuestions; track q) {
                <button type="button" class="suggested-btn" (click)="askQuestion(q)">
                  {{ q }}
                </button>
              }
            </div>
          }
        </div>

        <form class="chat-input-bar" (ngSubmit)="sendQuery()">
          <input
            type="text"
            [(ngModel)]="userInput"
            name="query"
            placeholder="Ask about Satyam's architecture or skills..."
            [disabled]="isGenerating()"
            autocomplete="off"
          />
          <button
            type="submit"
            class="send-msg-btn"
            [disabled]="!userInput.trim() || isGenerating()"
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    }
  `,
  styleUrl: './ai-assistant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiAssistantComponent {
  content = PORTFOLIO_CONTENT;
  cursorService = inject(CursorService);

  scrollArea = viewChild<ElementRef<HTMLDivElement>>('scrollArea');

  isOpen = signal<boolean>(false);
  isGenerating = signal<boolean>(false);
  userInput = '';

  messages = signal<ChatMessage[]>([
    {
      sender: 'bot',
      text: PORTFOLIO_CONTENT.assistant.greeting
    }
  ]);

  togglePanel(): void {
    this.isOpen.update((v) => !v);
  }

  askQuestion(q: string): void {
    this.userInput = q;
    this.sendQuery();
  }

  sendQuery(): void {
    const q = this.userInput.trim();
    if (!q || this.isGenerating()) return;

    this.userInput = '';
    this.messages.update((list) => [...list, { sender: 'user', text: q }]);
    this.isGenerating.set(true);

    setTimeout(() => {
      const response = this.answerKnowledge(q);
      this.messages.update((list) => [...list, response]);
      this.isGenerating.set(false);
      setTimeout(() => {
        const el = this.scrollArea()?.nativeElement;
        if (el) el.scrollTop = el.scrollHeight;
      }, 50);
    }, 600);
  }

  // 8.1 & 11 Grounded retrieval over Satyam's professional information
  private answerKnowledge(query: string): ChatMessage {
    const lower = query.toLowerCase();

    // Check for off-topic queries (Refusal as required by Section 8.1 & 11)
    const isProfessionalTopic = [
      'satyam', 'langgraph', 'agent', 'rag', 'microservice', '.net', 'c#', 'fastapi',
      'python', 'angular', 'capgemini', 'project', 'skill', 'certif', 'chroma',
      'rabbit', 'redis', 'experience', 'education', 'contact', 'hire', 'resume', 'system', 'architecture'
    ].some((k) => lower.includes(k));

    if (!isProfessionalTopic) {
      return {
        sender: 'bot',
        text: "I am specifically configured to answer questions regarding Satyam Kumar's engineering background, multi-agent systems, RAG architectures, and microservices experience. Please ask a topic related to his professional work."
      };
    }

    if (lower.includes('langgraph') || lower.includes('agent')) {
      return {
        sender: 'bot',
        text: 'Satyam designs autonomous LangGraph multi-agent systems with state machines, tool orchestration, and critic verification loops. His flagship project Support Copilot uses specialized shopping and triage agents with persistent context memory.',
        source: 'projects.content.ts (Support Copilot & AgentCommerce)'
      };
    }

    if (lower.includes('microservice') || lower.includes('.net') || lower.includes('rabbit') || lower.includes('redis')) {
      return {
        sender: 'bot',
        text: 'Satyam engineers enterprise backend architectures using C#, .NET 8, and ASP.NET Core. In ConnectSphere, he built 8 microservices deployed behind a YARP API Gateway with RabbitMQ event queues and Redis feed caching.',
        source: 'portfolio.content.ts (ConnectSphere Case Study)'
      };
    }

    if (lower.includes('rag') || lower.includes('chroma') || lower.includes('retriev')) {
      return {
        sender: 'bot',
        text: 'Satyam builds low-latency RAG pipelines with hierarchical chunking, dense semantic search with ChromaDB, hybrid BM25 search, and cross-encoder reranking to ensure grounded responses without hallucinations.',
        source: 'journal.content.ts (RAG mistakes I stopped making)'
      };
    }

    if (lower.includes('certif') || lower.includes('claude') || lower.includes('stack')) {
      return {
        sender: 'bot',
        text: 'Satyam holds the Claude Certified Developer – Foundations certification from Anthropic, GitHub Certified Agentic AI Developer from Microsoft, and Full Stack Backend using Node.js certification.',
        source: 'portfolio_data.md (Certifications)'
      };
    }

    if (lower.includes('capgemini') || lower.includes('experience') || lower.includes('role')) {
      return {
        sender: 'bot',
        text: 'Satyam is currently a Software Analyst at Capgemini (Bengaluru, India), specializing in .NET 8 microservices, enterprise REST APIs, clean architecture, and Generative AI workflows.',
        source: 'portfolio.content.ts (Work Experience)'
      };
    }

    return {
      sender: 'bot',
      text: "Satyam Kumar is a GenAI & Backend Engineer specializing in LangGraph multi-agent systems, enterprise RAG platforms, and high-performance .NET 8 microservices. He holds a B.Tech in CSE from GLA University.",
      source: 'portfolio.content.ts (Identity)'
    };
  }
}

