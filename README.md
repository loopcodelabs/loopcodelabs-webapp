# LoopCodeLabs - AI & Engineering Studio Application

A full-stack enterprise web application built with **React 19**, **TypeScript**, **Tailwind CSS**, **Express.js**, and an intelligent **Visitor Analytics & Lead Attribution Tracking System**.

---

## 🚀 One-Command Automated Local Setup

You can set up the entire local development environment—including environment configuration files, database schema migrations, realistic analytics seed data, directory structures, and application assets—by running a single command:

```bash
chmod +x setup-local.sh
./setup-local.sh
```

---

## 📌 Prerequisites & Supported Operating Systems

### Supported Operating Systems
* **Ubuntu** (20.04 LTS / 22.04 LTS / 24.04 LTS)
* **Debian** (11 / 12)
* **Fedora** / RHEL / CentOS
* **macOS** (Intel / Apple Silicon)
* **WSL2** (Windows Subsystem for Linux)

### System Dependencies
| Dependency | Minimum Version | Description |
| :--- | :--- | :--- |
| **Node.js** | `v18.0.0+` | JavaScript Runtime Engine |
| **npm** or **Bun** | `npm v9+` / `bun v1.0+` | Package Manager |
| **OpenSSL** | Latest | Automatic Secret Generation |
| **Git** | `v2.25+` | Version Control System |
| **MySQL** *(Optional)* | `v8.0+` | Relational Database *(Fallback to file-based `analyticsStore.ts` if inactive)* |

---

## 🛠 Setup & Utility Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Setup Local Environment** | `./setup-local.sh` | Full environment setup: validates OS/deps, generates `.env` files with secure secrets, creates storage directories, seeds database & analytics, builds frontend/backend assets. |
| **Validate Environment** | `./validate-local.sh` | Runs 15+ automated health & schema integrity checks across tooling, config, DB schema, directories, compiled bundles, and API status. |
| **Reset Environment & Data** | `./reset-local.sh` | Creates a timestamped backup in `backups/`, wipes build artifacts, resets database to clean initial seed data, and rebuilds assets. |

---

## 🔑 Environment Variables Reference

Environment configuration templates (`.env`, `.env.dev`, `.env.stage`, `.env.prod`) are automatically created during setup from `.env.example`.

```env
# Server Runtime
NODE_ENV="development"
PORT=3000
APP_URL="http://localhost:3000"

# Auto-Generated Security Secrets (Created by setup-local.sh)
JWT_SECRET="<random_32_byte_hex>"
ENCRYPTION_KEY="<random_32_byte_hex>"
SESSION_SECRET="<random_32_byte_hex>"
COOKIE_SECRET="<random_32_byte_hex>"

# MySQL Database Connection (Optional)
DB_HOST="localhost"
DB_PORT=3306
DB_USER="loopcodelabs_user"
DB_PASSWORD="LoopCodeDevPassword123!"
DB_NAME="loopcodelabs_dev"

# Google AI & OAuth Credentials (Optional)
GEMINI_API_KEY=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
ALLOWED_EMAILS=""
```

---

## 🗄 Database Schema & Table Architecture

The application includes an automated MySQL DDL schema (`scripts/schema.sql`) and a rich production-like dataset (`scripts/seed.sql`).

### Key Database Tables & Modules
* **`users`**: Administrative and user account records (`id`, `uuid`, `email`, `password_hash`, `role_id`, `is_active`).
* **`roles` & `permissions`**: RBAC permissions matrix (`Super Admin`, `Admin`, `Editor`, `Viewer`).
* **`visitors`**: Anonymized visitor profiles, geolocation, IP address, device specs, first visit, and exit tracking.
* **`visitor_sessions`**: Session duration, pages visited per session, traffic sources (`Direct`, `Organic Search`, `Social Media`, `Referral`), and bounce status.
* **`page_views`**: Real-time URL route tracking, time spent per route, and scroll depth tracking.
* **`events` & `event_types`**: Custom behavioral interactions, CTA clicks, modal toggles, and WhatsApp launcher events.
* **`click_events`**: Click heatmap coordinates (`x_ratio`, `y_ratio`, `element_tag`).
* **`performance_logs`**: Core Web Vitals telemetry (`FCP`, `LCP`, `TTFB`, `load_time_ms`).
* **`leads` & `visitor_lead_mapping`**: Lead attribution connecting submitted enquiries to historical visitor session telemetry.
* **`analytics_summary_daily`**: Pre-aggregated daily rollup statistics for instant chart rendering.
* **`services`, `portfolio`, `faq`, `website_settings`, `feature_flags`**: Dynamic website content CMS tables.

---

## 📂 Project Directory Structure

```
├── .env                    # Active local environment variables
├── .env.example            # Environment template reference
├── setup-local.sh          # Primary automated setup script
├── validate-local.sh       # Local diagnostics & validation utility
├── reset-local.sh          # Database reset & data restore utility
├── package.json            # Dependencies & npm scripts
├── server.ts               # Full-Stack Express API server entry point
├── scripts/
│   ├── schema.sql          # MySQL Database DDL Schema definition
│   └── seed.sql            # MySQL Database initial seed data
├── server/
│   └── analyticsStore.ts   # Server-side persistent analytics engine & store
├── src/
│   ├── App.tsx             # Main client SPA entry component
│   ├── components/         # UI Components & Modules
│   │   ├── AdminDashboard.tsx     # Unified Admin Control Panel
│   │   ├── AnalyticsDashboard.tsx # Visitor Analytics & Real-Time Tracking
│   │   ├── Contact.tsx            # Contact Form & Lead Capture
│   │   ├── CookieConsent.tsx      # GDPR & DPDP Consent Banner
│   │   └── WhatsAppWidget.tsx     # Floating Smart WhatsApp Chat Widget
│   ├── utils/
│   │   ├── analyticsTracker.ts    # Client-side telemetry & tracking SDK
│   │   └── storage.ts             # Safe local storage wrapper
│   └── types/              # Shared TypeScript type definitions
└── uploads/, logs/, exports/, analytics/, temp/, cache/, reports/, backups/
```

---

## 🔐 Demo Accounts & Credentials

Upon running `./setup-local.sh`, the following pre-seeded administrative accounts are available:

| Account Role | Email Address | Default Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@loopcodelabs.com` | `admin123` | Full System Access |
| **Tech Lead** | `techlead@loopcodelabs.com` | `admin123` | Engineering & Analytics |
| **Editor** | `editor@loopcodelabs.com` | `admin123` | CMS Content Management |
| **Demo Viewer** | `demo@loopcodelabs.com` | `admin123` | Read-Only Dashboard |

---

## ⚡ Developer Commands Guide

### Start Development Server
```bash
npm run dev
# or with Bun
bun run dev
```

### Validate Local Setup
```bash
./validate-local.sh
```

### Reset Database & Seed Data
```bash
./reset-local.sh
```

### Compile Production Build
```bash
npm run build
```

---

## ❓ Troubleshooting & FAQs

#### 1. "Port 3000 is in use"
* **Solution**: Kill any process bound to port 3000:
  ```bash
  fuser -k 3000/tcp || lsof -i :3000 | awk 'NR>1 {print $2}' | xargs kill -9
  ```

#### 2. "MySQL connection failed"
* **Solution**: Verify your local MySQL server is running or configured in `.env`: `sudo service mysql status` or `brew services start mysql`.

#### 3. "Permission denied executing setup-local.sh"
* **Solution**: Grant execution permission: `chmod +x setup-local.sh validate-local.sh reset-local.sh`.

#### 4. "How to test visitor tracking?"
* Open `http://localhost:3000`, click around the site or submit a contact enquiry, then navigate to `http://localhost:3000/#admin` and select **Visitor Analytics** tab to view real-time events, session recordings, heatmaps, and lead attributions!
