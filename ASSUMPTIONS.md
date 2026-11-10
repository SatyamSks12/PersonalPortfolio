# Project Assumptions & Decisions

**Project:** Satyam Kumar Portfolio  
**Spec Version:** 1.0 (Nov 10, 2026)  
**Last Updated:** Phase 10 Completion

---

## 1. Identity & Contact Information
- **Name**: Satyam Kumar
- **Title**: GenAI & Backend Engineer
- **Location Line**: `BASED IN INDIA` (Spec fallback applied; verified from CV: Bengaluru / India).
- **Email**: Configured to `sk72574401@gmail.com` (from user CV). Spec placeholder `hello@example.com` is documented here as replaceable.
- **Social Links**:
  - GitHub: `https://github.com/Satyamglacs22`
  - LinkedIn: `https://www.linkedin.com/in/satyam-kumar-250263367`
  - Instagram: `https://www.instagram.com/i_m_sks12/`
- **Resume PDF**: User provided `autoCV (6).pdf` in workspace root. Linked at `public/assets/docs/resume.pdf` for one-click download.
- **Portrait Photo**: User provided `ChatGPT Image Oct 24, 2026, 04_56_17 PM (2).png`. Placed at `public/assets/img/portrait.png` with gold initials `SK` fallback card.

---

## 2. Projects & Case Studies
- **Project 01: Support Copilot** (Multi-Agent Support Triage): Internal case study `/case-study/support-copilot` with interactive architecture diagram and `TBD-VERIFY` metric pill.
- **Project 02: AgentCommerce** (AI Multi-Agent E-Commerce): Internal case study `/case-study/agent-commerce` with agent comparison workflow.
- **Project 03: MeetingIQ** (AI Meeting Intelligence): Internal case study `/case-study/meeting-iq` with Semantic Kernel and MCP integration diagrams.
- **Project 04: ConnectSphere** (Full-Stack Social Platform): GitHub repository `https://github.com/Satyamglacs22` and case study `/case-study/connect-sphere`.

---

## 3. Motion & Asset Implementations
- **Cinematic Master Intro**:
  - Sequence: 0-100 numeric preloader with radial ring and orbiting gold stylus SVG -> Handcrafted cursive "Hello" stroke path drawn over 2.2s -> 12x7 cream grid block wipe.
  - Session storage check `hasSeenIntro` shortens replay to 0.4s on revisit within the same session.
- **Hero Anton Display**: Fitted Anton condensed font stretched vertically (scaleY 1.15) spanning ~88% of viewport. Interactive liquid ripple filter on hover and rotating circular badge with magnetic pull.
- **About Pinned Zoom**: 150vh ScrollTrigger pin with face-crop zoom-out (scale 2.2 to 1) on desktop (>= 1024px); unpinned smooth block flow on mobile.
- **Interactive String Line**: SVG sine-wave elastic string responding to pointer velocity and springing back with damped oscillation.
- **Physics Logos**: Floating tech logos with zero-gravity drift, pointer repulsion, IntersectionObserver sleep, and 4-logo mobile limit.
- **Goo Effect**: Dual-pass SVG Gaussian blur (`stdDeviation="12"`) and high-contrast matrix filter with 24 gold droplets on desktop (8 on mobile) merging into giant `WORK`.
- **Sticky Project Stack**: Cards stack via CSS sticky, scaling down to 0.92 and dimming to 40% brightness as subsequent cards slide over, with parallax ghost words (`AGENTS`, `COMMERCE`, `MEETINGS`, `CONNECT`).
- **Route Curtain**: Gold-then-cream wipe with 0.9s duration on page navigation.

---

## 4. Backend Microservices
- **Contact API (`backend/contact-api/`)**: .NET 8 Minimal API with fixed-window rate limiting (5 req/min), honeypot anti-spam (`_gotcha`), XSS HTML sanitization, and structured health checks.
- **AI Assistant API (`backend/assistant-api/`)**: Python FastAPI SSE streaming endpoint with strict domain guardrails, portfolio embedding retrieval, and grounding to `PORTFOLIO_CONTENT`.

---

## 5. Performance & Build Decisions
- **Angular 21 + Node 24**: Executed with `--no-addons` to prevent native LMDB memory-mapping conflicts on OneDrive filesystems.
- **Static SSR Prerendering**: Pre-renders all 9 routes (`/`, `/journal`, `/journal/:slug`, `/case-study/:id`) into static HTML files for instantaneous First Contentful Paint.
