export interface ProjectItem {
  id: string;
  index: string;
  name: string;
  categoryLabel: string;
  description: string;
  tags: string[];
  ghostWord: string;
  caseStudyUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  architectureDetails: string;
}

export interface ExpertiseRow {
  index: string;
  title: string;
  description: string;
  tags: string[];
  previewId: string;
}

export interface JournalPost {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  excerpt: string;
  contentMarkdown: string;
}

export interface PortfolioContent {
  identity: {
    name: string;
    title: string;
    locationLine: string;
    email: string;
    githubUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
    resumePdfUrl: string;
    hasResume: boolean;
    metaDescription: string;
    portraitImgUrl: string;
    signatureText: string;
  };
  navigation: {
    links: { label: string; href: string; isRoute?: boolean }[];
  };
  hero: {
    giantWord: string;
    secondaryWord: string;
    miniLabels: string[];
    badgeText: string;
    scrollHint: string;
    locationText: string;
    copyrightText: string;
  };
  about: {
    sectionLabel: string;
    heading: string;
    headlinePart1: string;
    headlineHighlight1: string;
    headlinePart2: string;
    headlineHighlight2: string;
    headlinePart3: string;
    paragraph1: string;
    paragraph2: string;
    stats: { label: string; value: string; countTo?: number; suffix?: string }[];
  };
  expertise: {
    sectionLabel: string;
    headingPrefix: string;
    headingMain: string;
    intro: string;
    chips: string[];
    rows: ExpertiseRow[];
    floatingLogos: { name: string; symbol: string; color: string }[];
  };
  workIntro: {
    techStrip: string[];
    headingPrefix: string;
    giantWord: string;
    marqueeItems: string[];
  };
  projects: {
    sectionLabel: string;
    items: ProjectItem[];
  };
  contact: {
    pillLabel: string;
    headlinePrefix: string;
    headlineHighlight: string;
    headlineSuffix: string;
    paragraph: string;
    infoCards: { label: string; value: string; href: string; type: 'email' | 'link' | 'location' }[];
    form: {
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      submitButtonText: string;
      sendingText: string;
      successMessage: string;
      errorMessage: string;
    };
  };
  journal: {
    sectionLabel: string;
    heading: string;
    intro: string;
    posts: JournalPost[];
  };
  assistant: {
    name: string;
    title: string;
    greeting: string;
    suggestedQuestions: string[];
  };
}

export const PORTFOLIO_CONTENT: PortfolioContent = {
  identity: {
    name: 'Satyam Kumar',
    title: 'GenAI & Backend Engineer',
    locationLine: 'BASED IN INDIA',
    email: 'sk72574401@gmail.com',
    githubUrl: 'https://github.com/Satyamglacs22',
    linkedinUrl: 'https://www.linkedin.com/in/satyam-kumar-250263367',
    instagramUrl: 'https://www.instagram.com/i_m_sks12/',
    resumePdfUrl: '/assets/docs/resume.pdf',
    hasResume: true,
    metaDescription:
      'Portfolio of Satyam Kumar, a GenAI & Backend Engineer specializing in LangGraph multi-agent systems, RAG and .NET microservices.',
    portraitImgUrl: '/assets/img/portrait.png',
    signatureText: 'Satyam Kumar'
  },
  navigation: {
    links: [
      { label: 'WORK', href: '#work' },
      { label: 'ABOUT', href: '#about' },
      { label: 'JOURNAL', href: '/journal', isRoute: true },
      { label: 'EXPERTISE', href: '#expertise' },
      { label: 'CONTACT', href: '#contact' }
    ]
  },
  hero: {
    giantWord: 'INTELLIGENT',
    secondaryWord: 'ENGINEER',
    miniLabels: ['AGENTS', 'RAG', 'MICROSERVICES'],
    badgeText: "LET'S WORK TOGETHER • LET'S WORK TOGETHER • ",
    scrollHint: 'SCROLL TO EXPLORE',
    locationText: 'BASED IN INDIA',
    copyrightText: '© 2026 SATYAM KUMAR'
  },
  about: {
    sectionLabel: '02 --- THE PERSON BEHIND THE WORK',
    heading: 'ABOUT ME',
    headlinePart1: 'I BUILD ',
    headlineHighlight1: 'INTELLIGENT SYSTEMS',
    headlinePart2: ' WHERE AI MEETS ',
    headlineHighlight2: 'ENGINEERING',
    headlinePart3: '.',
    paragraph1:
      "I'm Satyam, a GenAI and backend engineer who turns complex ideas into reliable products: multi-agent workflows, retrieval-augmented systems and microservices that hold up in production.",
    paragraph2:
      'I care about the details most people never see: how an agent recovers from a bad answer, how a service scales, how an interface feels when it responds. Clean architecture first, then polish.',
    stats: [
      { label: 'BASED', value: 'India' },
      { label: 'FOCUS', value: 'GenAI + Backend' },
      { label: 'STACK', value: '.NET, Python, Angular' },
      { label: 'MINDSET', value: 'Ship, measure, improve' },
      { label: 'PROJECTS', value: '4+', countTo: 4 },
      { label: 'AVAILABILITY', value: 'Open to opportunities' }
    ]
  },
  expertise: {
    sectionLabel: '03 --- EXPERTISE',
    headingPrefix: 'MY ',
    headingMain: 'EXPERTISE',
    intro: 'I design and build intelligent products where AI, backend and interface work as one.',
    chips: ['LangGraph', 'RAG', '.NET', 'FastAPI', 'Angular', 'GSAP'],
    rows: [
      {
        index: '01',
        title: 'GenAI & Multi-Agent Systems',
        description:
          'Designing agent workflows with planning, tool use and critic loops, grounded by retrieval over private data.',
        tags: ['LangGraph', 'RAG', 'Semantic Kernel', 'MCP'],
        previewId: 'agents-preview'
      },
      {
        index: '02',
        title: 'Backend & Microservices',
        description:
          'Building secure, scalable APIs and service architectures with clear contracts and observability.',
        tags: ['ASP.NET Core', 'FastAPI', 'SQL Server'],
        previewId: 'backend-preview'
      },
      {
        index: '03',
        title: 'Full-Stack Web',
        description:
          'Fast, accessible, component-driven interfaces that make complex systems feel simple.',
        tags: ['Angular', 'TypeScript', 'SSR'],
        previewId: 'web-preview'
      },
      {
        index: '04',
        title: 'Architecture & Design',
        description:
          'Turning requirements into low-level and high-level designs, diagrams and decisions the team can build from.',
        tags: ['LLD', 'HLD', 'Diagrams'],
        previewId: 'arch-preview'
      }
    ],
    floatingLogos: [
      { name: 'Angular', symbol: 'ANG', color: '#DD0031' },
      { name: '.NET', symbol: '.NET', color: '#512BD4' },
      { name: 'Python', symbol: 'PY', color: '#3776AB' },
      { name: 'FastAPI', symbol: 'FAST', color: '#009688' },
      { name: 'LangGraph', symbol: 'LANG', color: '#CDB98A' },
      { name: 'SQL Server', symbol: 'SQL', color: '#CC292B' },
      { name: 'GSAP', symbol: 'GSAP', color: '#88CE02' },
      { name: 'TypeScript', symbol: 'TS', color: '#3178C6' }
    ]
  },
  workIntro: {
    techStrip: ['HTML', 'CSS', 'TypeScript', 'Angular', '.NET', 'Python', 'LangGraph', 'GSAP'],
    headingPrefix: 'SCROLL TO EXPLORE MY',
    giantWord: 'WORK',
    marqueeItems: ['GENAI', 'AGENTS', 'BACKEND', 'FULL-STACK', 'ARCHITECTURE']
  },
  projects: {
    sectionLabel: 'MY WORK',
    items: [
      {
        id: 'support-copilot',
        index: '01',
        name: 'Support Copilot',
        categoryLabel: 'MULTI-AGENT SUPPORT TRIAGE',
        description:
          'A multi-agent support triage system with retrieval and a critic loop that checks answers before they reach the user.',
        tags: ['LangGraph', 'FastAPI', 'Angular'],
        ghostWord: 'AGENTS',
        caseStudyUrl: '/case-study/support-copilot',
        architectureDetails:
          'Multi-agent graph with triage router, dynamic tool-execution nodes, semantic cache and verification critic loop.'
      },
      {
        id: 'agent-commerce',
        index: '02',
        name: 'AgentCommerce',
        categoryLabel: 'AI MULTI-AGENT E-COMMERCE',
        description:
          'An e-commerce experience where cooperating AI agents search, compare and assist, wrapped in a premium dark interface.',
        tags: ['Angular', 'Agents'],
        ghostWord: 'COMMERCE',
        caseStudyUrl: '/case-study/agent-commerce',
        architectureDetails:
          'Specialized conversational agents sharing contextual state memory with ChromaDB product embeddings.'
      },
      {
        id: 'meeting-iq',
        index: '03',
        name: 'MeetingIQ',
        categoryLabel: 'AI MEETING INTELLIGENCE',
        description:
          'A platform that turns meetings into searchable knowledge with retrieval, summaries and tool integrations.',
        tags: ['ASP.NET Core', 'RAG', 'Semantic Kernel', 'MCP'],
        ghostWord: 'MEETINGS',
        caseStudyUrl: '/case-study/meeting-iq',
        architectureDetails:
          '.NET Core ingestion pipeline chunking transcripts into vector embeddings with semantic Q&A over meeting artifacts.'
      },
      {
        id: 'connect-sphere',
        index: '04',
        name: 'ConnectSphere',
        categoryLabel: 'FULL-STACK SOCIAL PLATFORM',
        description:
          'A social media application built on a microservices backend with a responsive Angular client.',
        tags: ['Angular', '.NET 8', 'Microservices'],
        ghostWord: 'CONNECT',
        caseStudyUrl: '/case-study/connect-sphere',
        githubUrl: 'https://github.com/Satyamglacs22',
        architectureDetails:
          '8 distributed .NET 8 microservices unified behind a YARP API Gateway with RabbitMQ event messaging and Redis feed caching.'
      }
    ]
  },
  contact: {
    pillLabel: 'CONTACT',
    headlinePrefix: "Let's create ",
    headlineHighlight: 'something',
    headlineSuffix: ' meaningful.',
    paragraph:
      "Have a project in mind, a question, or simply want to talk about an idea? I'd love to hear from you.",
    infoCards: [
      {
        label: 'Email me',
        value: 'sk72574401@gmail.com',
        href: 'mailto:sk72574401@gmail.com',
        type: 'email'
      },
      {
        label: 'Connect',
        value: 'linkedin.com/in/satyam-kumar-250263367',
        href: 'https://www.linkedin.com/in/satyam-kumar-250263367',
        type: 'link'
      },
      {
        label: 'Based in',
        value: 'Bengaluru / Begusarai, India',
        href: '#',
        type: 'location'
      }
    ],
    form: {
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Tell me about your project or inquiry...',
      submitButtonText: 'Send Message',
      sendingText: 'Sending...',
      successMessage: "Thank you! Your message has been sent. I'll get back to you shortly.",
      errorMessage: 'Something went wrong while sending. Please try again or email me directly.'
    }
  },
  journal: {
    sectionLabel: '04 --- THOUGHTS & WRITINGS',
    heading: 'ENGINEERING JOURNAL',
    intro: 'Deep dives on multi-agent architectures, RAG reliability, and microservices engineering.',
    posts: [
      {
        slug: 'critic-loop-support-agents',
        title: 'How I designed a critic loop for support agents',
        date: 'Nov 02, 2026',
        readingTime: '4 min read',
        excerpt:
          'Why raw agent responses fail in customer triage, and how a deterministic critic node with policy grounding stops hallucinations before user delivery.',
        contentMarkdown: `
# How I designed a critic loop for support agents

Customer-facing AI support agents cannot afford hallucinations. When an autonomous agent attempts to interpret return policies, billing queries, or SLA-bound escalation paths, an unchecked generation can lead to compliance violations and customer frustration.

In building **Support Copilot**, I introduced an explicit **Critic Node** inside a LangGraph state graph. Here is how the loop functions in production.

## The Problem with Direct Generation

Standard agent flows generate answers directly from retrieved documents and send them straight to the user stream:

\`\`\`
User Query -> Retrieval -> Agent Node -> Output
\`\`\`

If retrieval contains conflicting documents or the prompt context drifts, the output can invent policies that do not exist.

## The Critic Architecture

Instead of terminating at generation, the response is routed to a verification node:

\`\`\`
User Query -> Retrieval -> Agent Node -> Critic Node -> [PASS -> User | REVISE -> Agent Node]
\`\`\`

1. **Grounded Fact Check**: The critic verifies that every factual assertion made in the generated answer has a corresponding citation chunk in the retrieval context.
2. **Deterministic Rules Engine**: Crucial fields such as refund amounts, SLA deadlines, or policy links are cross-referenced with deterministic regex and validation rules.
3. **Structured State Update**: If the score is below confidence threshold, the Critic mutates state with actionable feedback (*"Policy 4.2 requires explicit mention of the 14-day window"*) and increments a retry counter before bouncing back to the generator.

By capping retries at two iterations and falling back to human handoff if verification fails, system answer reliability reached enterprise production standards.
`
      },
      {
        slug: 'rag-mistakes-i-stopped-making',
        title: 'RAG mistakes I stopped making',
        date: 'Oct 15, 2026',
        readingTime: '5 min read',
        excerpt:
          'Lessons from production: why naive chunking fails, the necessity of hybrid search, and how reranking outperforms brute-force embedding sizes.',
        contentMarkdown: `
# RAG mistakes I stopped making

Building a demo RAG application takes an afternoon. Making a RAG pipeline reliable across thousands of domain-specific policy documents takes months of unlearning early assumptions.

Here are the three fundamental mistakes I stopped making while developing enterprise knowledge retrieval systems.

## 1. Fixed-Size Naive Chunking

Splitting documents into fixed 500-token blocks with a 50-token overlap creates context fragmentation. Paragraphs get cut mid-sentence, tables lose their headers, and legal definitions become orphaned.

**The Fix**: Structural, syntax-aware chunking. For banking policies, we parse headers, sections, and bullet lists hierarchically so each chunk retains its parent context metadata.

## 2. Relying Solely on Dense Vector Search

Dense embeddings excel at conceptual semantic search, but fail dramatically on exact acronyms, policy IDs, or error codes (e.g., *SEC-Rule-17a-4*).

**The Fix**: Hybrid search combining dense vector embeddings with BM25 keyword scoring, normalized with Reciprocal Rank Fusion (RRF).

## 3. Omitting the Cross-Encoder Reranker

Bi-encoder embeddings compress entire passages into a single vector. Fine nuances are inevitably lost.

**The Fix**: Passing the top-20 retrieved candidates through a cross-encoder reranker before selecting the top-4 chunks for the final prompt context dramatically increases ground-truth recall while cutting prompt token overhead in half.
`
      },
      {
        slug: 'structuring-dotnet-microservices-ai-workloads',
        title: 'Structuring .NET microservices for AI workloads',
        date: 'Sep 24, 2026',
        readingTime: '5 min read',
        excerpt:
          'Integrating long-running LLM inferences into asynchronous .NET 8 event-driven microservices using RabbitMQ, Redis, and YARP.',
        contentMarkdown: `
# Structuring .NET microservices for AI workloads

Traditional web microservices follow quick request-response cycles: an HTTP request arrives, hits a database, and returns JSON in 20 to 80 milliseconds.

AI workloads break this assumption completely. Multi-agent planning, document chunking, and streaming LLM responses can take anywhere from 2 to 30 seconds.

## Asynchronous Ingestion with RabbitMQ

To prevent connection exhaustion and thread starvation in ASP.NET Core, all heavy AI jobs are decoupled into background message queues:

- **YARP API Gateway** handles incoming client requests and JWT authentication.
- The **Ingestion Service** publishes an event to **RabbitMQ** with payload metadata and instantly returns a \`202 Accepted\` status with a tracking ID.
- Dedicated Python and .NET worker pods consume the queue, process chunks, and stream real-time updates over SignalR or Redis Pub/Sub back to the Angular client.

## Redis Cache for State and Partial Embeddings

Embedding calculation is computationally expensive. By hashing normalized text chunks and caching vector embeddings in **Redis**, redundant queries bypass LLM APIs entirely, dropping latency to sub-millisecond response times.
`
      }
    ]
  },
  assistant: {
    name: 'Ask Satyam AI',
    title: 'GenAI & Systems Knowledge Assistant',
    greeting:
      "Hello! I'm Satyam's AI portfolio assistant. Ask me anything about his multi-agent systems, RAG architectures, .NET microservices, or background.",
    suggestedQuestions: [
      'Tell me about his LangGraph multi-agent projects',
      'What is his experience with .NET microservices and RabbitMQ?',
      'What are his certifications and tech stack?'
    ]
  }
};

