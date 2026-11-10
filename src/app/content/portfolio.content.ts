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

export interface ArchiveProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoVideoUrl?: string;
  icon: 'chart' | 'wallet' | 'user' | 'fire' | 'camera';
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

export interface ExperienceJob {
  role: string;
  company: string;
  location: string;
  period: string;
  badge?: string;
  summary: string;
  points: string[];
  skills: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  issueDate?: string;
  skills: string;
  credentialUrl?: string;
  badgeColor?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  cpi: string;
  highlights: string[];
}

export interface PortfolioContent {
  intro: {
    welcomeBadge: string;
    welcomeLine1: string;
    welcomeLine2: string;
    welcomeSubtitle: string;
  };
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
  experience: {
    sectionLabel: string;
    headingPrefix: string;
    headingMain: string;
    intro: string;
    jobs: ExperienceJob[];
    certifications: CertificationItem[];
    education: EducationItem;
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
    archiveHeading: string;
    archiveIntro: string;
    archiveItems: ArchiveProjectItem[];
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
  intro: {
    welcomeBadge: 'GREETINGS',
    welcomeLine1: 'WELCOME TO',
    welcomeLine2: 'MY PORTFOLIO',
    welcomeSubtitle: 'SATYAM KUMAR — GENAI & BACKEND ENGINEER'
  },
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
      { label: 'ABOUT', href: '#about' },
      { label: 'EXPERTISE', href: '#expertise' },
      { label: 'EXPERIENCE', href: '#experience' },
      { label: 'WORK', href: '#work' },
      { label: 'JOURNAL', href: '/journal', isRoute: true },
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
  experience: {
    sectionLabel: '04 --- JOURNEY & CREDENTIALS',
    headingPrefix: 'EXPERIENCE & ',
    headingMain: 'CERTIFICATIONS',
    intro:
      'A proven track record of engineering scalable enterprise microservices, designing multi-agent AI architectures, and continuous professional excellence.',
    jobs: [
      {
        role: 'Software Analyst',
        company: 'Capgemini',
        location: 'Bengaluru, India',
        period: 'July 2026 – Present',
        badge: 'CURRENT',
        summary:
          'Designing, developing, and maintaining enterprise-grade backend services and distributed microservices with clean architecture and automated test suites.',
        points: [
          'Architecting secure RESTful APIs and distributed microservices using C#, .NET 8, and ASP.NET Core.',
          'Implementing Clean Architecture, repository patterns, SQL Server connectivity, and high-performance caching.',
          'Building and orchestrating cutting-edge Generative AI & LangGraph agentic workflows for software automation.'
        ],
        skills: ['C#', '.NET 8', 'ASP.NET Core', 'Microservices', 'LangGraph', 'GenAI', 'SQL Server']
      },
      {
        role: 'Engineering Trainee',
        company: 'Capgemini (Exceller Edge)',
        location: 'India',
        period: 'Dec 2025 – May 2026',
        badge: 'DISTINCTION',
        summary:
          'Completed rigorous corporate engineering training in enterprise software development and advanced OOP with outstanding marks.',
        points: [
          'Mastered C# and .NET Core enterprise architecture, SOLID principles, and asynchronous design patterns.',
          'Developed automated test suites utilizing NUnit and FluentAssertions for robust code coverage.',
          'Implemented performance benchmarking and enterprise debugging across multi-tier backend services.'
        ],
        skills: ['C#', '.NET Core', 'NUnit', 'FluentAssertions', 'OOP', 'Clean Code']
      },
      {
        role: 'Full Stack Backend Trainee',
        company: 'GLA University (Coding Blocks)',
        location: 'Mathura, India',
        period: 'June 2024 – July 2024',
        badge: 'HONORS',
        summary:
          'Intensive backend engineering training focusing on asynchronous server runtimes, databases, and REST architecture.',
        points: [
          'Constructed full RESTful web APIs and async service architectures using Node.js and Express.',
          'Engineered an interactive Environmental Telemetry Monitoring Dashboard capstone project with real-time updates.',
          'Learned database schema design, security best practices, and API performance optimization.'
        ],
        skills: ['Node.js', 'Express', 'JavaScript', 'REST APIs', 'Telemetry Dashboard']
      }
    ],
    certifications: [
      {
        name: 'Claude Certified Developer – Foundations',
        issuer: 'Anthropic',
        skills: 'Frontier foundation models, prompt engineering, context management, API integration, model grounding.',
        badgeColor: '#CDB98A'
      },
      {
        name: 'GitHub Certified: Agentic AI Developer',
        issuer: 'Microsoft & GitHub',
        skills: 'Multi-agent architectures, autonomous agent workflows, state machine orchestration, tool use, agent memory.',
        badgeColor: '#58A6FF'
      },
      {
        name: 'Full Stack Backend using Node.js',
        issuer: 'Coding Blocks & GLA University',
        issueDate: 'July 2024',
        skills: 'Backend web development, asynchronous microservices, REST APIs, database connectivity.',
        badgeColor: '#3ECF8E'
      }
    ],
    education: {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'GLA University, Mathura, Uttar Pradesh',
      location: 'Mathura, Uttar Pradesh, India',
      period: 'August 2022 – May 2026',
      cpi: '7.96 / 10 CPI',
      highlights: [
        '100+ Data Structures & Algorithms problems solved across LeetCode, GeeksforGeeks, and CodeChef.',
        'Global Contest Rank 7671 in LeetCode Weekly Contest (Top 25% of 30,000+ competitors worldwide).',
        'Specialized in Distributed Systems, Operating Systems, DBMS, and Object-Oriented Software Design.'
      ]
    }
  },
  workIntro: {
    techStrip: ['HTML', 'CSS', 'TypeScript', 'Angular', '.NET', 'Python', 'LangGraph', 'GSAP'],
    headingPrefix: 'SCROLL TO EXPLORE MY',
    giantWord: 'WORK',
    marqueeItems: ['GENAI', 'AGENTS', 'BACKEND', 'FULL-STACK', 'ARCHITECTURE']
  },
  projects: {
    sectionLabel: 'SELECTED WORKS',
    items: [
      {
        id: 'ecommerce-multi-agent-copilot',
        index: '01',
        name: 'E-Commerce Multi-Agent AI Shopping Copilot',
        categoryLabel: 'AGENTIC AI & LANGGRAPH',
        description:
          'Built an autonomous LangGraph-based multi-agent platform featuring coordinated shopping assistant and customer support agents with persistent state management, context passing, memory, intent-based routing, and RAG validation guardrails.',
        tags: ['Python', 'LangGraph', 'Multi-Agent Systems', 'RAG', 'State Management', 'Agent Routing'],
        ghostWord: 'AGENTS',
        caseStudyUrl: '/case-study/ecommerce-multi-agent-copilot',
        githubUrl: 'https://github.com/Satyamglacs22',
        architectureDetails:
          'LangGraph multi-agent state graph orchestrating autonomous shopping assistant and customer support agents with intent routing, semantic cache, and RAG grounding.'
      },
      {
        id: 'enterprise-banking-rag',
        index: '02',
        name: 'Enterprise Banking Policy & Compliance RAG Platform',
        categoryLabel: 'ENTERPRISE RAG & CHROMADB',
        description:
          'Built an enterprise-oriented Retrieval-Augmented Generation (RAG) platform for high-precision retrieval across complex banking policy and compliance documentation with ChromaDB vector search and source-citation grounded responses.',
        tags: ['Python', 'FastAPI', 'Angular', 'ChromaDB', 'RAG', 'Semantic Search', 'Vector Retrieval'],
        ghostWord: 'RAG',
        caseStudyUrl: '/case-study/enterprise-banking-rag',
        githubUrl: 'https://github.com/Satyamglacs22',
        architectureDetails:
          'Document chunking pipelines, semantic embeddings, vector similarity retrieval with ChromaDB, multilingual search, and strict citation grounding without hallucinations.'
      },
      {
        id: 'connect-sphere',
        index: '03',
        name: 'ConnectSphere — Microservices Social Media Platform',
        categoryLabel: 'DISTRIBUTED MICROSERVICES',
        description:
          'Built a full-stack social media platform with 8 microservices behind a YARP API Gateway, using RabbitMQ for async event-driven communication and Redis for feed caching, containerized with Docker Compose.',
        tags: ['C#', '.NET 8', 'Angular 21', 'Redis', 'RabbitMQ', 'Docker', 'YARP'],
        ghostWord: 'CONNECT',
        caseStudyUrl: '/case-study/connect-sphere',
        githubUrl: 'https://github.com/Satyamglacs22',
        architectureDetails:
          '8 distributed .NET 8 microservices behind YARP API Gateway, asynchronous RabbitMQ event bus, Redis feed caching, JWT security, and Angular 21 SSR frontend.'
      },
      {
        id: 'healthcare-management-system',
        index: '04',
        name: 'Healthcare Management System',
        categoryLabel: 'BACKEND & DATABASE ARCHITECTURE',
        description:
          'Developed a robust database-driven application to manage patient records, clinical schedules, and doctor appointments with full CRUD operations and optimized SQL Server query connectivity.',
        tags: ['C#', '.NET', 'SQL Server', 'Database Design', 'REST APIs', 'CRUD'],
        ghostWord: 'HEALTH',
        caseStudyUrl: '/case-study/healthcare-management-system',
        githubUrl: 'https://github.com/Satyamglacs22',
        architectureDetails:
          'High-throughput relational schema design, connection pooling, transactional integrity, clinical scheduling engine, and optimized SQL Server connectivity.'
      }
    ],
    archiveHeading: 'MORE SELECTED WORKS & CAPSTONES',
    archiveIntro:
      'A collection of real-time telemetry dashboards, financial analytics applications, and browser media projects built across the full stack.',
    archiveItems: [
      {
        id: 'environmental-monitoring',
        title: 'Environmental Monitoring Dashboard',
        category: 'Real-Time Telemetry & IoT',
        description:
          'A real-time environmental telemetry dashboard built with HTML, CSS, JavaScript, and Node.js to monitor air and water quality metrics.',
        tags: ['Node.js', 'HTML5', 'CSS3', 'JavaScript', 'REST APIs'],
        githubUrl: 'https://github.com/Satyamglacs22/Environmental-Monitoring-DashBoard.git',
        demoVideoUrl: 'WeatherDashBoardWorking.mp4',
        icon: 'chart'
      },
      {
        id: 'expense-tracker',
        title: 'Smart Expense Tracker',
        category: 'Finance Analytics',
        description:
          'Web application that allows users to record income/expenses, filter categorized transactions, and visualize monthly cash flow with interactive charts.',
        tags: ['JavaScript', 'Chart.js', 'Local Storage', 'Analytics'],
        githubUrl: 'https://github.com/Satyamglacs22/Expense-Tracker.git',
        demoVideoUrl: 'ExpenseTrackerWorking.mp4',
        icon: 'wallet'
      },
      {
        id: 'portfolio-legacy',
        title: 'Interactive Portfolio Website (Legacy)',
        category: 'Developer Showcase',
        description:
          'Personal developer showcase highlighting skills, interactive UI animations, and project demos built with vanilla web technologies.',
        tags: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
        githubUrl: 'https://github.com/Satyamglacs22/PortFolio-.git',
        demoVideoUrl: 'portfolioworkingvideo.mkv',
        icon: 'user'
      },
      {
        id: 'habit-streak-tracker',
        title: 'Habit Streak Tracker',
        category: 'Productivity & Utilities',
        description:
          'Modern habit tracker with daily streaks, visual progress bars, completion analytics, and local data persistence.',
        tags: ['JavaScript', 'Local Storage', 'Analytics', 'DOM APIs'],
        githubUrl: 'https://github.com/Satyamglacs22',
        icon: 'fire'
      },
      {
        id: 'webcam-capture',
        title: 'Web-Cam Snapshot Capture',
        category: 'Browser Media APIs',
        description:
          'Client-side media application utilizing browser MediaStream APIs to capture photos, preview snapshots, and download high-resolution images.',
        tags: ['Web APIs', 'MediaDevices', 'JavaScript', 'Canvas'],
        githubUrl: 'https://github.com/Satyamglacs22',
        icon: 'camera'
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

