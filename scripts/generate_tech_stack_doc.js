import fs from "fs";
import path from "path";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  WidthType,
  AlignmentType,
  ShadingType
} from "docx";

async function generate() {
  const borderGray = "CBD5E1";

  // Total printable page width: 12240 dxa - 2 * 1440 = 9360 dxa
  const tableWidths = [2200, 2400, 4760]; // total 9360

  const createHeaderCell = (text, widthDxa) => {
    return new TableCell({
      width: { size: widthDxa, type: WidthType.DXA },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text,
              bold: true,
              color: "FFFFFF",
              size: 19,
              font: "Calibri"
            })
          ],
          alignment: AlignmentType.LEFT
        })
      ],
      shading: { fill: "1E293B", type: ShadingType.CLEAR },
      padding: { top: 120, bottom: 120, left: 120, right: 120 }
    });
  };

  const createCell = (text, widthDxa, isCode = false, bg = "FFFFFF") => {
    return new TableCell({
      width: { size: widthDxa, type: WidthType.DXA },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text,
              size: 18,
              font: isCode ? "Consolas" : "Calibri",
              color: isCode ? "0F172A" : "334155"
            })
          ]
        })
      ],
      shading: { fill: bg, type: ShadingType.CLEAR },
      padding: { top: 100, bottom: 100, left: 120, right: 120 },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: borderGray },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: borderGray },
        left: { style: BorderStyle.SINGLE, size: 4, color: borderGray },
        right: { style: BorderStyle.SINGLE, size: 4, color: borderGray }
      }
    });
  };

  const techRows = [
    // Category 1: Frontend
    ["Frontend Framework", "React 18.3 (TypeScript)", "Component-driven single page application UI architecture with strict type safety."],
    ["Build Tool & Bundler", "Vite 5.4 + ESBuild", "Blazing-fast local development dev server, HMR, and production static asset bundling."],
    ["Styling Engine", "Tailwind CSS v4", "Utility-first responsive CSS styling with custom dark-mode theme variables and high-contrast aesthetics."],
    ["Animations & FX", "Motion (motion/react)", "Fluid UI transitions, modal entry/exit effects, spring physics, and animated micro-interactions."],
    ["Icon System", "Lucide React", "Modern, lightweight vector iconography used across navigation, CTA buttons, and feature cards."],
    ["State Management", "React Context API", "Global WebsiteContext engine synchronizing CMS configuration, site settings, theme, services, and blog articles."],
    ["Special FX Utilities", "canvas-confetti", "Celebratory visual particle effects triggered upon lead form submission and CTA conversions."],

    // Category 2: Backend
    ["Server Runtime", "Node.js (v20+)", "Asynchronous server environment supporting Express REST APIs and external API integrations."],
    ["Web Server Framework", "Express.js 4.19", "Lightweight web application framework serving API routes, static assets, and authentication endpoints."],
    ["TypeScript Execution", "tsx 4.19 + ESBuild 0.23", "Instant TypeScript execution during development and single-file CommonJS bundling for production."],
    ["Authentication & Tokens", "jsonwebtoken + cookie-parser", "JWT-based session authentication with HTTP-only secure cookie management for Admin Console access."],

    // Category 3: Database & Persistence
    ["Primary Database", "MySQL 8.0 (mysql2)", "Relational database storing CMS settings, visitor sessions, leads, event logs, and click heatmaps."],
    ["Database Connection", "mysql2 (Connection Pool)", "High-performance asynchronous MySQL pool connection with retry logic and fallback cache sync."],
    ["Caching & Fallback", "In-Memory Store + File JSON", "In-memory JS store (analyticsStore.ts) ensuring zero-downtime serving with dual MySQL persistence."],

    // Category 4: Integrations & External APIs
    ["AI Orchestration", "Google Gemini API (@google/genai)", "Server-side integration utilizing gemini-2.5-flash for AI Agent interactions and solution generation."],
    ["OAuth 2.0 Integration", "google-auth-library + googleapis", "Google Sign-In flow and Search Console V3 integration for live SEO performance tracking."],
    ["WhatsApp Web API", "WhatsApp Deep Link (wa.me)", "Dynamic link generator formatting pre-filled consultation messages directed to agency WhatsApp support."],
    ["Telemetry Beacon", "Navigator.sendBeacon API", "Browser beacon API for non-blocking telemetry and session duration reporting on page unload."]
  ];

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              bottom: 1440,
              left: 1440,
              right: 1440
            }
          }
        },
        children: [
          // Title
          new Paragraph({
            children: [
              new TextRun({
                text: "LoopCodeLabs - Comprehensive Technology Stack Documentation",
                bold: true,
                size: 34,
                color: "0F172A",
                font: "Calibri"
              })
            ],
            spaceAfter: 120
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Complete Architecture Breakdown of Frontend, Backend Runtime, Database Systems, External APIs, and Build Infrastructure",
                size: 20,
                italic: true,
                color: "475569",
                font: "Calibri"
              })
            ],
            spaceAfter: 280
          }),

          // Executive Summary Section
          new Paragraph({
            text: "1. Technology Architecture Overview",
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 150
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "LoopCodeLabs is engineered on a high-performance, full-stack TypeScript architecture designed for ultra-fast page load speeds, real-time behavioral analytics, dynamic CMS content updates, and enterprise-grade security. The stack spans a modern React 18 client, an Express.js backend runtime, a MySQL database engine, and integrations with Google Gemini AI, Google Search Console, and WhatsApp.",
                size: 20,
                color: "334155"
              })
            ],
            spaceAfter: 200
          }),

          // Tech Stack Table
          new Paragraph({
            text: "2. Technology Stack Index",
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 150
          }),

          new Table({
            width: { size: 9360, type: WidthType.DXA },
            columnWidths: tableWidths,
            rows: [
              new TableRow({
                tableHeader: true,
                cantSplit: true,
                children: [
                  createHeaderCell("Layer / Category", tableWidths[0]),
                  createHeaderCell("Technology / Library", tableWidths[1]),
                  createHeaderCell("Purpose & Implementation Details", tableWidths[2])
                ]
              }),
              ...techRows.map(([cat, tech, details]) =>
                new TableRow({
                  cantSplit: true,
                  children: [
                    createCell(cat, tableWidths[0]),
                    createCell(tech, tableWidths[1], true),
                    createCell(details, tableWidths[2])
                  ]
                })
              )
            ]
          }),

          new Paragraph({ text: "", spaceAfter: 300 }),

          // Detailed Section 3: In-Depth Component Breakdown
          new Paragraph({
            text: "3. Component Layer Breakdown",
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 150
          }),

          new Paragraph({
            text: "3.1 Client Layer (Frontend React & Vite)",
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 100
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "The frontend is built using React 18 with TypeScript. Page rendering uses modular components styled with Tailwind CSS v4. Motion and spring animations are powered by motion/react. Custom interactivity includes a fluid dual-ring magnetic cursor (CustomCursor.tsx) and interactive 3D letter tilt typography. Global application state is managed via React Context (WebsiteContext.tsx), which maintains seamless synchronization between client views and the backend MySQL database.",
                size: 20,
                color: "334155"
              })
            ],
            spaceAfter: 150
          }),

          new Paragraph({
            text: "3.2 Server Layer (Express.js & TypeScript)",
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 100
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "The backend server runs on Express.js in a Node.js environment. Development mode uses tsx for real-time TypeScript compilation without build delays. Production builds bundle server.ts into a single, self-contained CJS bundle using ESBuild. The server exposes REST endpoints for CMS settings (/api/config), visitor sessions (/api/analytics/session), heatmap coordinates (/api/analytics/heatmap), lead capture (/api/analytics/lead), and Google OAuth authentication (/api/auth/*).",
                size: 20,
                color: "334155"
              })
            ],
            spaceAfter: 150
          }),

          new Paragraph({
            text: "3.3 Database & Storage Layer (MySQL & Hybrid Cache)",
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 100
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Data persistence is backed by MySQL (loopcodelabs_dev) via mysql2 connection pooling. To guarantee zero-downtime serving and rapid responses, the application uses a hybrid storage model: reads are served instantly from an in-memory analytics store, while updates asynchronously persist to MySQL tables (website_settings, visitors, sessions, page_views, events, click_events, leads, performance_metrics).",
                size: 20,
                color: "334155"
              })
            ],
            spaceAfter: 150
          }),

          new Paragraph({
            text: "3.4 Third-Party APIs & AI Integrations",
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 100
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "• Google Gemini AI (@google/genai): Secure server-side proxy execution of Gemini models for automated solution recommendations and AI Agent workflows.\n• Google Search Console API: Authenticated via Google OAuth 2.0 (google-auth-library & googleapis) to surface real-time search impressions, CTR, rankings, and indexing status in the Admin Console.\n• WhatsApp Web API: Encodes service consultation templates into wa.me deep links for instant client communication.\n• Telemetry Beacon: Navigator.sendBeacon for lightweight background session telemetry logging.",
                size: 20,
                color: "334155"
              })
            ],
            spaceAfter: 200
          }),

          // Footer
          new Paragraph({
            children: [
              new TextRun({
                text: "Document generated automatically for LoopCodeLabs Technology & Operations Team.",
                italic: true,
                size: 16,
                color: "64748B"
              })
            ],
            alignment: AlignmentType.CENTER
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const distDir = path.join(process.cwd(), "dist");
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const publicFilePath = path.join(publicDir, "LoopCodeLabs_Tech_Stack_Documentation.docx");
  const distFilePath = path.join(distDir, "LoopCodeLabs_Tech_Stack_Documentation.docx");

  fs.writeFileSync(publicFilePath, buffer);
  fs.writeFileSync(distFilePath, buffer);

  console.log("Successfully generated Tech Stack DOCX files at:");
  console.log(" - " + publicFilePath);
  console.log(" - " + distFilePath);
}

generate().catch((e) => {
  console.error("Error generating tech stack docx:", e);
  process.exit(1);
});
