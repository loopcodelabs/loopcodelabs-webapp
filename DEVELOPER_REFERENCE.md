# elite-digital-agency - Developer Reference Guide

Welcome to the **elite-digital-agency** codebase. This comprehensive technical reference document serves as an onboarding guide for new developers, explaining the architecture, data flows, routing mechanics, component structures, and deployment pipelines.

---

## 🏛️ 1. Architecture Overview

This application is engineered as a **Full-Stack (Node.js/Express + Vite + React) Web Application** configured for containerized execution (specifically optimized for Google Cloud Run, Vercel, or custom VPS containers).

```
                      ┌──────────────────────────────────────────────┐
                      │              CLIENT BROWSER (SPA)            │
                      │   React 18 + Vite + Tailwind + Framer Motion │
                      └──────────────────────┬───────────────────────┘
                                             │
                       HTTP / JSON API Calls │ OAuth Redirects
                                             ▼
                      ┌──────────────────────────────────────────────┐
                      │              EXPRESS SERVER (Node)           │
                      │      API Routes, Vite Dev Middleware,        │
                      │     Aggressive Cache-Control Asset Engine    │
                      └──────────────────────┬───────────────────────┘
                                             │
                                             ▼
                      ┌──────────────────────────────────────────────┐
                      │             EXTERNAL INTEGRATIONS            │
                      │  • Google OAuth 2.0 (OpenID, Profile, Email) │
                      │  • Gemini API / SDK Framework                │
                      │  • Google Search Console Token Injection     │
                      └──────────────────────────────────────────────┘
```

### Key Technical Specs:
- **Port:** Configured strictly to run on port `3000` (backed by the reverse proxy).
- **TypeScript:** Strict type checking (`tsc --noEmit` on lint and build phases).
- **Module System:** ES Modules natively supported for modern syntax.
- **Production Bundle:** Compiled server code uses `esbuild` to produce a unified, self-contained CommonJS target (`dist/server.cjs`) to prevent ES Module relative path resolution failures on host environments.

---

## 📂 2. Directory Structure & File Inventory

```
├── .github/workflows/         # CI/CD Automations
│   └── ci-cd.yml              # Three-environment Dev/Stage/Prod automated pipeline
├── public/                    # Static Assets (Logos, Icons, JSON manifestos)
├── src/
│   ├── assets/                # Local images, banners, and vector icons
│   ├── components/            # High-fidelity Modular React Components
│   │   ├── AIAgents.tsx       # Live Multi-Agent Workspace Simulation (Semantic/Browser)
│   │   ├── AboutLandingPage.tsx # Dynamic layout for About info, stats, values, and timeline
│   │   ├── AdminDashboard.tsx # Real-time customizable site editor (Modules, Theme, Blogs)
│   │   ├── BlogHub.tsx        # SEO content engine & automatic article generation simulator
│   │   ├── Contact.tsx        # Form validation and dynamic estimation input handler
│   │   ├── CustomCursor.tsx   # Fluid, hover-sensitive cursor visual accent
│   │   ├── EstimateCalculator.tsx # Dynamic pricing & capability scoping engine
│   │   ├── Footer.tsx         # Legal links, navigation hubs, newsletter form
│   │   ├── Hero.tsx           # Premium display typography and core CTA intro
│   │   ├── InteractiveText.tsx # Staggered text animations and hover-responsive layouts
│   │   ├── LetsBuild.tsx      # Core interactive transition section
│   │   ├── LetsTalk.tsx       # Action-oriented high-converting section banner
│   │   ├── Marquee.tsx        # Custom horizontal endless marquee utilizing 20 sub-services
│   │   ├── Navbar.tsx         # Responsive dynamic glass header with Auth controls
│   │   ├── PortfolioDetail.tsx # Rich case-study layout with real-time stats cards
│   │   ├── Preloader.tsx      # Heavy asset boot screen
│   │   ├── Process.tsx        # Interactive, milestone-gated operational playbook
│   │   ├── Projects.tsx       # Filterable Case Studies grid
│   │   ├── ServiceLandingPage.tsx # Detailed Core Capabilities layout sheets
│   │   ├── ServiceVisualizer.tsx # Dynamic vector diagrams for server architectures
│   │   └── Services.tsx       # Responsive services cards split into Build/Grow/Scale
│   ├── context/
│   │   └── WebsiteContext.tsx # Central State Engine & Data Modeling
│   ├── utils/
│   │   ├── serviceMapping.ts  # Hardcoded detailed services descriptions
│   │   └── storage.ts         # Secure, error-safe localStorage wrappers
│   ├── App.tsx                # Client Routing and View orchestrator
│   ├── index.css              # Global styles, tailwind layers, and custom keyframes
│   ├── main.tsx               # SPA entry point mounting React 18
│   └── types.ts               # Shared Data Models (Service, Project, Blog, etc.)
├── .env.example               # Explicit environment config requirements template
├── server.ts                  # Production Express Server & Development Vite Proxy Middleware
├── setup-local.sh             # Automated developer environment bootstrapper
└── package.json               # Package configurations, scripts, and dependencies
```

---

## ⚙️ 3. Environment Variables & Secure Configurations

Ensure the following variables are defined in your local `.env` file or within your respective target Environments on Google Cloud Run/Vercel/GitHub Secrets:

| Key | Scope | Purpose | Required / Optional |
|---|---|---|---|
| `GEMINI_API_KEY` | Server-Side | Powers LLM generation for automated SEO blog post writing | Optional (Defaults to system text) |
| `GOOGLE_CLIENT_ID` | Server-Side | Client Identifier for Google OpenID Connect OAuth login | Required for Authentication |
| `GOOGLE_CLIENT_SECRET` | Server-Side | Client Secret for authorization code exchange on callback | Required for Authentication |
| `JWT_SECRET` | Server-Side | Signing key for encoding secure Client Session Tokens | Required for JWT session |
| `GOOGLE_SITE_VERIFICATION` | Server-Side | Injection variable for dynamic Google Search Console ownership | Optional |

---

## 📡 4. Backend Express Routing & Server APIs

The Express server (`server.ts`) handles API requests first, then hooks into Vite's middleware (in Dev) or serves pre-compiled static files (in Prod).

### 🔐 OAuth & Identity Endpoints

1. **`GET /api/auth/google/url`**:
   - Generates the authorization URL dynamically.
   - Infers the redirect URI seamlessly by reading header configurations (`X-Forwarded-Proto`, `X-Forwarded-Host`) to ensure robust operation behind Cloud Run Proxies.
   - Redirects users to Google's Identity Provider with request scope `openid email profile`.

2. **`GET /auth/callback`**:
   - Acts as the OAuth Redirection Callback landing page.
   - Exchanges the authorization code with Google Token endpoints.
   - Decodes the returned `id_token` (JWT) to extract `id`, `email`, `name`, and `picture`.
   - Generates a local, cryptographically signed JWT Session Token using `JWT_SECRET`.
   - Sets a secure, httpOnly, sameSite `none` cookie (`session_token`) so that identity is maintained securely even when embedded within AI Studio iframes.
   - Dispatches a postMessage window script (`type: 'OAUTH_AUTH_SUCCESS'`) to securely notify the parent browser application and instantly close the popup window.

3. **`GET /api/auth/me`**:
   - Validates user sessions.
   - Extracts authorization payloads from Bearer Authorization Headers or from Cookie stores.
   - Returns user profile fields (`id`, `email`, `name`, `picture`) if the signature is valid.

4. **`POST /api/auth/logout`**:
   - Clears cookie stores.
   - Resets state contexts.

---

## 🛠️ 5. Global State & Context Management

The codebase implements a single unified state manager inside `src/context/WebsiteContext.tsx`.

### State Storage Structure:
- **`modules`**: Array containing ordering, names, and toggle statuses for standard landing sections (Hero, LetsBuild, Marquee, Services, AIAgents, Projects, Process, LetsTalk, Contact).
- **`theme`**: Struct managing UI preferences such as `mode` ("dark" | "light"), hex values of accent colors, and base typography scale.
- **`services`**: Customizable object arrays storing all agency capabilities.
- **`blogs`**: Dynamic list of published SEO-optimized blogs.
- **`scenarios`**: Action paths for simulating multi-agent workflow systems (AI Workspace).

### Features:
- **Persistence:** Local state changes are persistently written into client browsers through `safeLocalStorage`.
- **Dynamic CMS Re-ordering:** Allows full site component re-ordering on the fly from the Admin Dashboard, changing the `order` parameter dynamically inside the array.
- **Reset Utility:** Users can restore pristine visual states via the `resetAll()` function.

---

## 🧬 6. Core Dynamic Interactive Components

### 🖥️ AI Agent Workspace (`AIAgents.tsx`)
A simulated live orchestration interface representing a multi-agent cluster solving business scenarios (e.g. Lead Qualification, Customer Support, Document Extraction, or Code Compilation).
- **Simulated Agents:** Orchestrates tasks across `Synthesizer`, `Classifier`, `Database Connector`, and `Action Executer`.
- **Status Mapping:** Real-time progress logs and animated data-transmission nodes using SVGs.

### 📊 Service Catalog (`Services.tsx` / `ServiceVisualizer.tsx`)
Displays capabilities split cleanly across three domains:
1. **Build:** Website Development, Mobile App Development, UI/UX Design, Branding.
2. **Grow:** SEO, Paid Advertising, Email Marketing, Automations.
3. **Scale:** AI Automation, Custom Integrations, Enterprise Solutions.
- **Visualizer Engine:** Houses custom interactive vector diagrams representing real-time API integrations, flow charts, and data queries.

### 📏 Cost Estimates Calculator (`EstimateCalculator.tsx`)
Interactive sliding scale and checkboxes to compute immediate quotes for projects.
- Computes costs dynamically based on service scope, estimated page count, and target deadline dates.
- Seamlessly maps calculated estimates directly to the Contact Form for instant dispatch.

---

## 🚀 7. Continuous Integration & CD Pipeline

The repository integrates a robust **GitHub Actions CI/CD workflow** (`.github/workflows/ci-cd.yml`) mapped to a strict three-environment paradigm:

### 🔱 Branch To Environment Architecture:

1. **Development (`dev` Branch)**:
   - Target Environment: **Dev**
   - Automatically triggered on push or accepted PR merge to `dev`.
   - Continuous deployment builds are pushed to the sandbox instance.

2. **Staging (`stage` Branch)**:
   - Target Environment: **Stage**
   - Used for final client sign-off, SEO technical audits, and speed reviews.

3. **Production (`main` Branch)**:
   - Target Environment: **Prod**
   - Highly stable code target mapped to the enterprise domain.

### 🛡️ Pipeline Verification Checklists:
Before any deployment script is executed, the following jobs run concurrently:
1. **Source Checkout:** Clones the code.
2. **Node Caching:** Retrieves cached dependencies to keep build times under 90 seconds.
3. **TypeScript Compilation Check:** Runs `npm run lint` (`tsc --noEmit`) to verify that the code has zero syntax anomalies or type mismatches.
4. **Vite Build Phase:** Compiles assets using `npm run build` and places them in `dist/`.

---

## 🧑‍💻 8. Quick-Start Commands Reference

To run tasks during development:

```bash
# Prepare environment configs and install local dependencies
chmod +x setup-local.sh && ./setup-local.sh

# Run the Dev server with HMR enabled on port 3000
npm run dev

# Compile server and build the production-ready client code
npm run build

# Run the production-bundled server targets
npm run start

# Validate the codebase for TypeScript compilation errors
npm run lint
```
