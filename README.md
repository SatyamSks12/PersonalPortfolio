# Satyam Kumar — Award-Style Personal Portfolio

> **Production-grade, award-winning personal portfolio website for Satyam Kumar, GenAI & Backend Engineer** specializing in LangGraph multi-agent systems, RAG, and .NET microservices.

![Portfolio Preview](public/assets/img/portrait.png)

---

## 🌟 Key Features & Motion Highlights

1. **Cinematic Three-Phase Master Intro**:
   - Numeric 0–100 counter with SVG circular progress ring and orbiting gold stylus.
   - Handcrafted cursive SVG "Hello" stroke path animated over 2.2s.
   - 12x7 (mobile 6x10) cream grid outward tile wipe revealing the hero section.
   - Session storage detection (`hasSeenIntro`) reduces intro to a subtle 0.4s fade on re-visits.
2. **Kinetic Hero**:
   - Giant Anton condensed typography stretched vertically (`scaleY 1.15`) spanning 88% viewport width.
   - Hover liquid ripple SVG distortion filter.
   - Rotating circular text badge (`LET'S WORK TOGETHER`) with magnetic cursor tracking.
3. **Face-Crop Pinned About Section**:
   - 150vh ScrollTrigger pinned portrait zooming smoothly out from tight face crop (scale 2.2) to full frame.
   - Interactive elastic SVG string line with damped physics oscillation.
   - 6-metric stats grid.
4. **Sticky Expertise & Physics Background**:
   - 5/7 column sticky layout with hover gold border reveal and directional arrow rotation.
   - Interactive floating tech logos with zero-gravity drift, pointer repulsion, and `IntersectionObserver` pause.
   - Floating architecture diagram preview cards tracking the cursor.
5. **Gooey Drop Effect & Sticky Project Stack**:
   - SVG blur + high-contrast color matrix goo filter with falling gold droplets merging into "WORK".
   - Sticky project stacking cards with depth perspective (scaling down to 0.92, dimming to 40% brightness).
   - Parallax ghost typography (`AGENTS`, `COMMERCE`, `MEETINGS`, `CONNECT`).
6. **Glass Contact Suite & Dual Backends**:
   - Frosted glass panel with reactive form, inline validation, honeypot spam protection, and status toasts.
   - **.NET 8 Minimal API** (`backend/contact-api/`): Rate limiting (5 req/min), XSS HTML sanitization, input validation, and health checks.
   - **Python FastAPI API** (`backend/assistant-api/`): SSE streaming AI chat assistant with domain guardrails and grounding.
7. **Journal & Detailed Case Studies**:
   - Markdown-rendered technical posts on RAG mistakes, critic loops, and .NET AI microservices.
   - Unified case study template with system architecture diagrams, key challenges, and metrics.
8. **Command Palette & AI Assistant**:
   - Quick command palette (`Ctrl+K` / `Cmd+K` or header trigger) with section navigation and email copy.
   - Grounded portfolio AI assistant answering questions about Satyam's experience and architecture skills.
9. **Accessibility & Responsive Polish**:
   - Fully responsive across 320px, 375px, 414px, 768px, 1024px, 1440px, and 1920px.
   - Custom cursor automatically disabled on touch devices (`pointer: coarse`, `hover: none`).
   - Complete `prefers-reduced-motion` support.
   - OpenGraph, Twitter Cards, Sitemap, Robots.txt, and JSON-LD `Person` schema.

---

## 🛠️ Tech Stack

- **Frontend**: Angular 21 (Standalone Components, Signals, Strict TypeScript, SCSS tokens)
- **Rendering**: Angular Universal Server-Side Rendering (SSR) + Full Static Prerendering (9 routes)
- **Motion & Physics**: GSAP 3 (ScrollTrigger, SplitText, CustomEase), Lenis Smooth Scroll, OGL, Matter.js
- **Content Rendering**: Marked (Markdown parser)
- **Contact Backend**: .NET 8 Minimal API (C#)
- **AI Assistant Backend**: FastAPI (Python 3.11+), Server-Sent Events (SSE)

---

## 📁 Repository Structure

```
Portfolio/
├── ASSUMPTIONS.md                 # Documented fallback decisions & assumptions
├── README.md                      # Comprehensive deployment & architecture documentation
├── angular.json                   # Angular CLI configuration with optimized budgets
├── package.json                   # Dependencies & build scripts
├── vercel.json                    # Vercel deployment & routing config
├── public/
│   ├── favicon.ico                # Site favicon
│   ├── robots.txt                 # Search engine crawler permissions
│   ├── sitemap.xml                # XML sitemap with all 9 prerendered URLs
│   ├── _redirects                 # Netlify SPA redirect rules
│   └── assets/
│       ├── docs/resume.pdf        # Satyam Kumar CV
│       └── img/portrait.png       # High-resolution portrait photograph
├── backend/
│   ├── contact-api/               # .NET 8 Minimal API contact form service
│   │   ├── Program.cs             # Rate limiting, honeypot, XSS sanitization
│   │   └── contact-api.csproj     # C# project definition
│   └── assistant-api/             # Python FastAPI AI chat service
│       ├── main.py                # SSE streaming endpoint with portfolio guardrails
│       └── requirements.txt       # FastAPI & uvicorn dependencies
└── src/
    ├── index.html                 # HTML shell, JSON-LD Person schema, preconnect fonts
    ├── main.ts                    # Client entry point
    ├── main.server.ts             # SSR server entry point
    ├── styles.scss                # Global styles, noise filter, reset, reduced motion
    ├── styles/
    │   └── _tokens.scss           # Design tokens (obsidian, gold, surface, cream, ink)
    └── app/
        ├── app.component.ts       # Root layout coordinator
        ├── app.routes.ts          # Route definitions
        ├── app.routes.server.ts   # Prerender parameters for static route export
        ├── content/
        │   └── portfolio.content.ts # SINGLE SOURCE OF TRUTH for all site copy & data
        ├── core/                  # Core services (Lenis, Cursor, Audio/Intro state)
        │   ├── scroll.service.ts
        │   └── cursor.service.ts
        ├── layout/                # Persistent chrome components
        │   ├── header/            # Signature, roll-up nav, hamburger
        │   ├── menu-overlay/      # Fullscreen staggered nav menu
        │   ├── footer/            # Giant display name, live IST clock, back-to-top
        │   ├── cursor/            # Dual-ring difference-blend custom cursor
        │   └── grain-overlay/     # 3% opacity pointer-transparent film grain
        ├── sections/              # Homepage narrative sections
        │   ├── intro/             # Preloader, cursive hello, cream grid wipe
        │   ├── hero/              # Giant Anton word, liquid ripple, rotating badge
        │   ├── about/             # Pinned zoom portrait, interactive string, stats
        │   ├── expertise/         # 4-row architecture list with preview cards
        │   ├── work-intro/        # Marquee & tech ticker
        │   └── contact/           # Frosted glass contact form
        ├── pages/                 # Standalone routes
        │   ├── journal/           # Technical articles list & markdown reader
        │   ├── case-study/        # In-depth architectural case studies
        │   └── not-found/         # Award-style 404 page
        ├── features/              # Interactive enhancements
        │   ├── command-palette/   # Ctrl+K search & quick action overlay
        │   └── ai-assistant/      # Grounded SSE streaming AI chat widget
        └── shared/                # Reusable widgets
            ├── goo-work/          # SVG gooey droplet filter
            ├── physics-logos/     # Zero-gravity tech logo particles
            ├── rotating-badge/    # Circular spinning SVG text
            ├── route-curtain/     # Gold-to-cream page transition curtain
            └── string-line/       # Interactive elastic SVG string
```

---

## 🚀 Local Development

### Prerequisites
- Node.js LTS (v20 or v22+)
- .NET 8 SDK (for Contact API)
- Python 3.10+ (for AI Assistant API)

### Frontend
```bash
# 1. Install dependencies
npm install

# 2. Start Angular dev server
npm start

# 3. Build production bundle (with SSR & static prerendering)
npm run build
```

> **Note for Windows OneDrive users**: In Windows environments where the repository is synced via OneDrive, LMDB native addon memory mapping can trigger a transient lock. The build script is configured with `node --no-addons` to safely fall back to fast pure-JavaScript compilation.

### .NET 8 Contact API
```bash
cd backend/contact-api
dotnet run
# Runs on https://localhost:5001 or http://localhost:5000
```

### Python AI Assistant API
```bash
cd backend/assistant-api
python -m venv venv
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python main.py
# Runs on http://localhost:8000 (Swagger docs at /docs)
```

---

## 🌐 Production Deployment

### 1. Vercel (Recommended for Frontend)
1. Push this repository to GitHub/GitLab.
2. Import the project into **Vercel**.
3. Set the following build settings:
   - **Framework Preset**: Angular
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/satyam-portfolio/browser`
4. The included `vercel.json` ensures clean URLs and instant delivery of prerendered HTML pages.

### 2. Netlify
1. Connect repository in Netlify.
2. Build Settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist/satyam-portfolio/browser`
3. Netlify automatically consumes `public/_redirects` for single-page client routing fallbacks.

### 3. Backend Deployment
- **Contact API (.NET 8)**: Deploy containerized to Railway, Fly.io, or Azure App Service. Set environment variables:
  - `AllowedOrigins`: `https://your-portfolio-domain.com`
  - `SMTP_HOST` / `RESEND_API_KEY`: For email dispatch.
- **AI Assistant API (Python)**: Deploy containerized or as a Python service to Railway or Render. Set:
  - `OPENAI_API_KEY` or `GEMINI_API_KEY` (if streaming through external LLM provider).

---

## ✍️ Content Customization

All text copy, project descriptions, skills, social links, and journal entries are centralized in **one single file**:
`src/app/content/portfolio.content.ts`

To update projects, email, or experience, modify `PORTFOLIO_CONTENT` and run `npm run build`. No template editing is required.

---

## 📄 License

Original code and architectural design built for Satyam Kumar. All rights reserved.
