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
  const table1Widths = [2300, 1100, 1300, 2960, 1700]; // total 9360
  const table2Widths = [2300, 4200, 2860]; // total 9360

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

  const createDiagramBlock = (diagramText) => {
    return new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: [9360],
      rows: [
        new TableRow({
          cantSplit: true,
          children: [
            new TableCell({
              width: { size: 9360, type: WidthType.DXA },
              children: diagramText.split("\n").map(
                (line) =>
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: line,
                        font: "Consolas",
                        size: 17,
                        color: "0F172A"
                      })
                    ]
                  })
              ),
              shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
              padding: { top: 140, bottom: 140, left: 180, right: 180 },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 8, color: "3B82F6" },
                bottom: { style: BorderStyle.SINGLE, size: 8, color: "3B82F6" },
                left: { style: BorderStyle.SINGLE, size: 24, color: "3B82F6" },
                right: { style: BorderStyle.SINGLE, size: 8, color: "3B82F6" }
              }
            })
          ]
        })
      ]
    });
  };

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
                text: "LoopCodeLabs - Full Architecture & API Reference Manual",
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
                text: "Comprehensive Technical Guide for Internal Express APIs, External Service Integrations, Database Workflows, State Management, and Architecture Diagrams",
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
            text: "1. Architecture Executive Overview",
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 150
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "The LoopCodeLabs web application and admin console operate on a unified full-stack Node.js + Express + Vite + MySQL architecture. All API requests follow strict RESTful patterns, delivering real-time telemetry, CMS content updates, lead processing, user session tracking, click heatmaps, and third-party integrations (Google OAuth 2.0, Google Search Console, WhatsApp Web API, and Gemini AI).",
                size: 20,
                color: "334155"
              })
            ],
            spaceAfter: 200
          }),

          // Table of Contents / Summary Table
          new Paragraph({
            text: "2. Master API Endpoint Index",
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 150
          }),

          new Table({
            width: { size: 9360, type: WidthType.DXA },
            columnWidths: table1Widths,
            rows: [
              new TableRow({
                tableHeader: true,
                cantSplit: true,
                children: [
                  createHeaderCell("Endpoint Path", table1Widths[0]),
                  createHeaderCell("Method", table1Widths[1]),
                  createHeaderCell("Type", table1Widths[2]),
                  createHeaderCell("Primary Purpose", table1Widths[3]),
                  createHeaderCell("Database Tables", table1Widths[4])
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("/api/config", table1Widths[0], true),
                  createCell("GET / POST", table1Widths[1]),
                  createCell("Internal CMS", table1Widths[2]),
                  createCell("Fetch & persist global site settings, email, phone, modules, services & blogs", table1Widths[3]),
                  createCell("website_settings", table1Widths[4], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("/api/analytics/session", table1Widths[0], true),
                  createCell("POST", table1Widths[1]),
                  createCell("Telemetry", table1Widths[2]),
                  createCell("Initialize visitor session, store IDs, browser, device, OS, IP location", table1Widths[3]),
                  createCell("visitors, sessions", table1Widths[4], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("/api/analytics/session/end", table1Widths[0], true),
                  createCell("PATCH", table1Widths[1]),
                  createCell("Telemetry", table1Widths[2]),
                  createCell("Update session duration, total page clicks, max scroll depth", table1Widths[3]),
                  createCell("sessions", table1Widths[4], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("/api/analytics/pageview", table1Widths[0], true),
                  createCell("POST", table1Widths[1]),
                  createCell("Telemetry", table1Widths[2]),
                  createCell("Track individual page navigation views and referrers", table1Widths[3]),
                  createCell("page_views", table1Widths[4], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("/api/analytics/event", table1Widths[0], true),
                  createCell("POST", table1Widths[1]),
                  createCell("Telemetry", table1Widths[2]),
                  createCell("Record user CTA button clicks, feature expansions, modal toggles", table1Widths[3]),
                  createCell("events, event_types", table1Widths[4], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("/api/analytics/whatsapp-clicks", table1Widths[0], true),
                  createCell("GET / POST", table1Widths[1]),
                  createCell("Telemetry", table1Widths[2]),
                  createCell("Record, fetch real-time logs, and clear WhatsApp smart chat widget clicks", table1Widths[3]),
                  createCell("events, event_types", table1Widths[4], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("/api/analytics/heatmap", table1Widths[0], true),
                  createCell("POST", table1Widths[1]),
                  createCell("Telemetry", table1Widths[2]),
                  createCell("Log visual click coordinates (x_ratio, y_ratio) for heatmap rendering", table1Widths[3]),
                  createCell("click_events", table1Widths[4], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("/api/analytics/performance", table1Widths[0], true),
                  createCell("POST", table1Widths[1]),
                  createCell("Telemetry", table1Widths[2]),
                  createCell("Log Web Vitals (TTFB, FCP, LCP, CLS) and page load speed", table1Widths[3]),
                  createCell("performance_metrics", table1Widths[4], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("/api/analytics/lead", table1Widths[0], true),
                  createCell("POST", table1Widths[1]),
                  createCell("Lead Gen", table1Widths[2]),
                  createCell("Submit contact forms, consultation requests & newsletter signups", table1Widths[3]),
                  createCell("leads", table1Widths[4], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("/api/analytics/dashboard", table1Widths[0], true),
                  createCell("GET", table1Widths[1]),
                  createCell("Admin Data", table1Widths[2]),
                  createCell("Fetch aggregated KPI stats, visitor trends, conversion funnels", table1Widths[3]),
                  createCell("Read-only aggregate", table1Widths[4], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("/api/auth/google/url", table1Widths[0], true),
                  createCell("GET", table1Widths[1]),
                  createCell("Auth", table1Widths[2]),
                  createCell("Generate Google OAuth 2.0 authorization URL for Admin Console", table1Widths[3]),
                  createCell("N/A", table1Widths[4], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("/auth/callback", table1Widths[0], true),
                  createCell("GET", table1Widths[1]),
                  createCell("Auth", table1Widths[2]),
                  createCell("Handle OAuth callback, exchange token, issue signed JWT cookie", table1Widths[3]),
                  createCell("users / sessions", table1Widths[4], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("/api/analytics/integrations", table1Widths[0], true),
                  createCell("GET / POST", table1Widths[1]),
                  createCell("Integration", table1Widths[2]),
                  createCell("Fetch Google Search Console impressions, CTR, rankings & indexing status", table1Widths[3]),
                  createCell("website_settings", table1Widths[4], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("WhatsApp wa.me API", table1Widths[0], true),
                  createCell("External Link", table1Widths[1]),
                  createCell("External API", table1Widths[2]),
                  createCell("Deep link to open WhatsApp with pre-filled context message", table1Widths[3]),
                  createCell("N/A", table1Widths[4], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("Google Gemini API", table1Widths[0], true),
                  createCell("Server SDK", table1Widths[1]),
                  createCell("External API", table1Widths[2]),
                  createCell("Generate AI responses for AI Agents and smart solution demos", table1Widths[3]),
                  createCell("N/A", table1Widths[4], true)
                ]
              })
            ]
          }),

          new Paragraph({ text: "", spaceAfter: 300 }),

          // Detailed API Documentation
          new Paragraph({
            text: "3. Detailed Internal API Specifications",
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 150
          }),

          // API 1: /api/config
          new Paragraph({
            text: "3.1 CMS & Site Configuration API (/api/config)",
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 100
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Purpose: ", bold: true }),
              new TextRun({
                text: "Serves as the central content synchronization engine between the Admin Console and the main website frontend. Loads and updates site settings (agency name, support contact email site_contactEmail, phone, physical address), module visibility, active services list, blog articles, and custom AI scenarios."
              })
            ],
            spaceAfter: 80
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• How it's implemented: ", bold: true }),
              new TextRun({
                text: "Defined in server.ts under GET /api/config and POST /api/config. On startup or request, it queries the MySQL website_settings table, parsing keys prefixed with 'site_' (such as site_contactEmail) alongside JSON blocks for modules, services, and blogs. When an administrator saves new settings in Admin Console, POST /api/config updates the MySQL table instantly."
              })
            ],
            spaceAfter: 80
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Workflow & Database Impact: ", bold: true }),
              new TextRun({
                text: "The frontend WebsiteContext consumes this API. Any update to site settings (e.g., updating support contact email) immediately updates website_settings in MySQL and synchronizes across all active visitor sessions, ensuring enquiry cards in the Contact and Footer components display the updated email address without needing a full code redeployment."
              })
            ],
            spaceAfter: 120
          }),
          createDiagramBlock(`[Admin Console] --(POST /api/config)--> [Express Server]
                                              |
                                              v
                              [MySQL: website_settings table]
                                (Key: site_contactEmail = 'email@domain.com')
                                              |
                                              v
[Visitor Browser] <--(GET /api/config)-- [WebsiteContext] --> [Contact & Footer Cards]`),
          new Paragraph({ text: "", spaceAfter: 200 }),

          // API 2: Telemetry APIs
          new Paragraph({
            text: "3.2 Visitor Telemetry & Session Management API (/api/analytics/*)",
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 100
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Purpose: ", bold: true }),
              new TextRun({
                text: "Captures full behavioral telemetry across visitor journeys. Includes session initialization (/session), session duration updates (/session/end), page navigation logging (/pageview), CTA interaction tracking (/event), and click heatmaps (/heatmap)."
              })
            ],
            spaceAfter: 80
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• How it's implemented: ", bold: true }),
              new TextRun({
                text: "Client-side tracker src/utils/analyticsTracker.ts executes automatically on page load. It generates persistent Visitor IDs (vid-YYMMDD-XXXXX) and Session IDs (sid-YYMMDD-XXXXX) in localStorage/sessionStorage and dispatches background fetch calls to server endpoints. The server records data into visitors, sessions, page_views, events, event_types, and click_events MySQL tables."
              })
            ],
            spaceAfter: 80
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Workflow & Database Impact: ", bold: true }),
              new TextRun({
                text: "Enables real-time analytics dashboards. Admins can view active live visitors, traffic acquisition sources (organic search, direct, social), top visited pages, device distributions, scroll depths, and coordinate click heatmaps."
              })
            ],
            spaceAfter: 120
          }),
          createDiagramBlock(`[Visitor Browser Load] --> [analyticsTracker.ts]
                                        |
      +---------------------------------+---------------------------------+
      |                                 |                                 |
[POST /session]                 [POST /pageview]                   [POST /heatmap]
      |                                 |                                 |
      v                                 v                                 v
[MySQL: visitors/sessions]    [MySQL: page_views]              [MySQL: click_events]
      \\                                 |                                 /
       +--------------------------------+--------------------------------+
                                        |
                                        v
                    [Admin Analytics Dashboard Real-Time View]`),
          new Paragraph({ text: "", spaceAfter: 200 }),

          // API 3: WhatsApp Analytics
          new Paragraph({
            text: "3.3 WhatsApp Smart Chat Analytics API (/api/analytics/whatsapp-clicks)",
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 100
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Purpose: ", bold: true }),
              new TextRun({
                text: "Logs every visitor click on the floating WhatsApp Smart Chat widget or embedded WhatsApp CTA buttons, recording the specific service topic selected, page URL, device metadata, OS, IP location, and timestamp."
              })
            ],
            spaceAfter: 80
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• How it's implemented: ", bold: true }),
              new TextRun({
                text: "When a visitor interacts with WhatsAppWidget.tsx, trackWhatsAppClick() in src/utils/analytics.ts sends a beacon/fetch request to POST /api/analytics/whatsapp-click. In the Admin Console under the 'WhatsApp Clicks' tab, GET /api/analytics/whatsapp-clicks fetches live click logs directly from the database in real time. POST /api/analytics/whatsapp-clicks/clear allows clearing logs."
              })
            ],
            spaceAfter: 80
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Workflow & Database Impact: ", bold: true }),
              new TextRun({
                text: "Records high-intent lead interactions in the events table with category 'WhatsApp'. Provides immediate feedback on which services are generating the highest WhatsApp chat inquiries."
              })
            ],
            spaceAfter: 120
          }),
          createDiagramBlock(`[Visitor Clicks WhatsApp Widget] --> [trackWhatsAppClick(topic)]
                                                 |
                                     (navigator.sendBeacon)
                                                 |
                                                 v
                                 [POST /api/analytics/whatsapp-click]
                                                 |
                                                 v
                                    [MySQL: events Table]
                                                 |
                                                 v
       [Admin Console: WhatsApp Tab] <--(GET /api/analytics/whatsapp-clicks)`),
          new Paragraph({ text: "", spaceAfter: 200 }),

          // API 4: Lead Generation API
          new Paragraph({
            text: "3.4 Lead Processing & Consultation API (/api/analytics/lead)",
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 100
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Purpose: ", bold: true }),
              new TextRun({
                text: "Captures prospect enquiries submitted via the website Contact section, custom service consultation modals, or newsletter signups."
              })
            ],
            spaceAfter: 80
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• How it's implemented: ", bold: true }),
              new TextRun({
                text: "Contact.tsx calls trackLeadSubmission() which POSTs lead data (name, email, projectType, budget, message, pageUrl) to /api/analytics/lead. The server validates inputs and saves the record in the MySQL leads table with initial status 'New'."
              })
            ],
            spaceAfter: 80
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Workflow & Database Impact: ", bold: true }),
              new TextRun({
                text: "Triggers lead count updates on the Admin Dashboard lead pipeline view and increments conversion metrics."
              })
            ],
            spaceAfter: 120
          }),
          createDiagramBlock(`[User Submits Form in Contact.tsx] --> [POST /api/analytics/lead]
                                                  |
                                                  v
                                     [MySQL: leads Table]
                                                  |
                                                  v
                       [Admin Analytics Dashboard: Lead Management Pipeline]`),
          new Paragraph({ text: "", spaceAfter: 200 }),

          // API 5: External APIs
          new Paragraph({
            text: "4. External API Integrations Specifications",
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 150
          }),

          // 4.1 Google OAuth 2.0 & Workspace API
          new Paragraph({
            text: "4.1 Google OAuth 2.0 & Search Console Integration",
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 100
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• External Endpoints: ", bold: true }),
              new TextRun({
                text: "https://accounts.google.com/o/oauth2/v2/auth, https://oauth2.googleapis.com/token, https://www.googleapis.com/webmasters/v3/sites"
              })
            ],
            spaceAfter: 80
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Implementation & Flow: ", bold: true }),
              new TextRun({
                text: "Implements Google OAuth 2.0 authorization code flow. The server route /api/auth/google/url constructs a secure Google login link. Upon user authorization, Google redirects back to /auth/callback with an authorization code. The server exchanges this code for access/refresh tokens and user profile info (email, name), establishing an authenticated session and storing OAuth credentials securely."
              })
            ],
            spaceAfter: 80
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Workflow & Impact: ", bold: true }),
              new TextRun({
                text: "Allows seamless 1-click Google Sign-In for administrators and provides live Search Console performance data (impressions, CTR, search queries, indexing status) inside the Analytics Dashboard."
              })
            ],
            spaceAfter: 120
          }),
          createDiagramBlock(`[Admin Clicks Google Login] --> [GET /api/auth/google/url]
                                             |
                                 (Redirects to Google OAuth)
                                             |
                                             v
                           [Google Authorization Server]
                                             |
                              (Redirects with Auth Code)
                                             |
                                             v
[Express /auth/callback] <--(Exchange Code)--> [Google Token Endpoint]
           |
   (Generates JWT Cookie)
           |
           v
[Admin Authenticated & Search Console Synced]`),
          new Paragraph({ text: "", spaceAfter: 200 }),

          // 4.2 WhatsApp Web API
          new Paragraph({
            text: "4.2 WhatsApp Deep Link & Web Messaging API",
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 100
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• External Endpoint: ", bold: true }),
              new TextRun({ text: "https://wa.me/916305178805 or https://api.whatsapp.com/send" })
            ],
            spaceAfter: 80
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Implementation: ", bold: true }),
              new TextRun({
                text: "src/utils/whatsappMessage.ts dynamically formats URL strings incorporating the business phone number (+91 63051 78805), selected service topic, and current visitor URL path."
              })
            ],
            spaceAfter: 80
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Workflow & Impact: ", bold: true }),
              new TextRun({
                text: "Opens WhatsApp application or WhatsApp Web instantly with a pre-formatted consultation request, allowing high-conversion client communication."
              })
            ],
            spaceAfter: 120
          }),
          createDiagramBlock(`[Visitor selects service topic] --> [buildWhatsAppUrl()]
                                              |
                                              v
                      [https://wa.me/916305178805?text=EncodedMessage]
                                              |
                                              v
                            [WhatsApp Web / Desktop App Opens]`),
          new Paragraph({ text: "", spaceAfter: 200 }),

          // 4.3 Google Gemini AI API
          new Paragraph({
            text: "4.3 Google Gemini AI API (@google/genai)",
            heading: HeadingLevel.HEADING_2,
            spaceAfter: 100
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• SDK / Endpoint: ", bold: true }),
              new TextRun({ text: "Google Gen AI TypeScript SDK (@google/genai) with gemini-2.5-flash / gemini-2.5-pro models" })
            ],
            spaceAfter: 80
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Implementation: ", bold: true }),
              new TextRun({
                text: "Configured server-side using GEMINI_API_KEY environment variable. Protects secret keys from client exposure."
              })
            ],
            spaceAfter: 80
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "• Workflow & Impact: ", bold: true }),
              new TextRun({
                text: "Executes natural language generation for client agent scenarios, automated solution recommendations, and smart content generation."
              })
            ],
            spaceAfter: 120
          }),
          createDiagramBlock(`[Client AI Scenario Request] --> [Express Server API Route]
                                              |
                                     (GEMINI_API_KEY)
                                              |
                                              v
                              [Google Gemini AI Service]
                                              |
                                              v
                               [Streamed AI Response to UI]`),
          new Paragraph({ text: "", spaceAfter: 200 }),

          // Database Schema Appendix
          new Paragraph({
            text: "5. Database Schema & Persistence Architecture",
            heading: HeadingLevel.HEADING_1,
            spaceAfter: 150
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "The application relies on MySQL persistence (`loopcodelabs_dev`). The table schemas supporting the API suite are as follows:",
                size: 20
              })
            ],
            spaceAfter: 100
          }),
          new Table({
            width: { size: 9360, type: WidthType.DXA },
            columnWidths: table2Widths,
            rows: [
              new TableRow({
                tableHeader: true,
                cantSplit: true,
                children: [
                  createHeaderCell("Table Name", table2Widths[0]),
                  createHeaderCell("Primary Columns", table2Widths[1]),
                  createHeaderCell("Associated API Endpoints", table2Widths[2])
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("website_settings", table2Widths[0], true),
                  createCell("setting_key, setting_value, updated_at", table2Widths[1], true),
                  createCell("/api/config, /api/analytics/integrations", table2Widths[2], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("visitors", table2Widths[0], true),
                  createCell("id, visitor_id, ip_address, country, city, browser, os, device_type", table2Widths[1], true),
                  createCell("/api/analytics/session, /api/analytics/visitors", table2Widths[2], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("sessions", table2Widths[0], true),
                  createCell("id, session_id, visitor_id, entry_url, referrer, utm_source, duration", table2Widths[1], true),
                  createCell("/api/analytics/session, /api/analytics/session/end", table2Widths[2], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("page_views", table2Widths[0], true),
                  createCell("id, url_path, page_title, visitor_id, session_id, timestamp", table2Widths[1], true),
                  createCell("/api/analytics/pageview, /api/analytics/pages", table2Widths[2], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("events & event_types", table2Widths[0], true),
                  createCell("id, event_name, visitor_id, session_id, url_path, metadata", table2Widths[1], true),
                  createCell("/api/analytics/event, /api/analytics/whatsapp-clicks", table2Widths[2], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("click_events", table2Widths[0], true),
                  createCell("id, url_path, element_tag, element_text, x_ratio, y_ratio", table2Widths[1], true),
                  createCell("/api/analytics/heatmap", table2Widths[2], true)
                ]
              }),
              new TableRow({
                cantSplit: true,
                children: [
                  createCell("leads", table2Widths[0], true),
                  createCell("id, name, email, project_type, budget, status, created_at", table2Widths[1], true),
                  createCell("/api/analytics/lead, /api/analytics/leads", table2Widths[2], true)
                ]
              })
            ]
          }),

          new Paragraph({ text: "", spaceAfter: 300 }),

          // Document Footer
          new Paragraph({
            children: [
              new TextRun({
                text: "Document generated automatically for LoopCodeLabs Engineering & Operations Team.",
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

  const publicFilePath = path.join(publicDir, "LoopCodeLabs_API_Documentation.docx");
  const distFilePath = path.join(distDir, "LoopCodeLabs_API_Documentation.docx");

  fs.writeFileSync(publicFilePath, buffer);
  fs.writeFileSync(distFilePath, buffer);

  console.log("Successfully generated DOCX files at:");
  console.log(" - " + publicFilePath);
  console.log(" - " + distFilePath);
}

generate().catch((e) => {
  console.error("Error generating docx:", e);
  process.exit(1);
});
