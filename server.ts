import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import jwt from "jsonwebtoken";
import { analyticsStore } from "./server/analyticsStore";
import { loadConfigFromMySQL } from "./server/db";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust reverse proxy headers (crucial for Cloud Run and custom domains)
  app.set("trust proxy", true);

  app.use(express.json());

  // ==========================================
  // WEBSITE CONFIGURATION REST APIS
  // ==========================================
  app.get("/api/config", async (req, res) => {
    try {
      const mysqlConfig = await loadConfigFromMySQL();
      if (mysqlConfig && Object.keys(mysqlConfig).length > 0) {
        analyticsStore.saveWebsiteConfig(mysqlConfig);
        return res.json({ success: true, config: mysqlConfig, source: "mysql" });
      }
      const config = analyticsStore.getWebsiteConfig();
      res.json({ success: true, config, source: "file" });
    } catch (err: any) {
      const config = analyticsStore.getWebsiteConfig();
      res.json({ success: true, config, source: "fallback" });
    }
  });

  app.post("/api/config", async (req, res) => {
    try {
      const updated = analyticsStore.saveWebsiteConfig(req.body);
      res.json({ success: true, config: updated });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ==========================================
  // ANALYTICS REST APIS
  // ==========================================

  // 1. Session Init / Heartbeat
  app.post("/api/analytics/session", (req, res) => {
    try {
      const ip = (req.headers["x-forwarded-for"] as string) || req.ip || "127.0.0.1";
      const userAgent = (req.headers["user-agent"] as string) || "";
      const { visitor, session } = analyticsStore.saveSession(
        req.body.session || {},
        {
          ...req.body.visitor,
          ipAddress: ip
        },
        userAgent
      );
      res.json({ success: true, visitor, session });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 2. End Session
  app.patch("/api/analytics/session/end", (req, res) => {
    try {
      const { sessionId, durationSeconds } = req.body;
      const db = analyticsStore.getDB();
      const session = db.sessions.find(s => s.sessionId === sessionId);
      if (session) {
        session.endTime = new Date().toISOString();
        if (durationSeconds) session.durationSeconds = durationSeconds;
      }
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 3. Pageview
  app.post("/api/analytics/pageview", (req, res) => {
    try {
      const pv = analyticsStore.recordPageView(req.body);
      res.json({ success: true, pageView: pv });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 4. Custom Event
  app.post("/api/analytics/event", (req, res) => {
    try {
      const evt = analyticsStore.recordEvent(req.body);
      res.json({ success: true, event: evt });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 4b. Dedicated WhatsApp Click Handler
  app.post("/api/analytics/whatsapp-click", (req, res) => {
    try {
      const ip = (req.headers["x-forwarded-for"] as string) || req.ip || "127.0.0.1";
      const payload = req.body || {};

      // 1. Ensure visitor & session exist
      const { visitor, session } = analyticsStore.saveSession(
        { 
          sessionId: payload.sessionId, 
          landingPage: payload.pageUrl || "/" 
        },
        { 
          visitorId: payload.visitorId, 
          ipAddress: ip, 
          browser: payload.browser, 
          deviceType: payload.device,
          language: payload.language,
          screenResolution: payload.screenResolution
        }
      );

      // 2. Record Custom Event for WhatsApp
      const evt = analyticsStore.recordEvent({
        eventName: "WhatsApp Widget Click",
        urlPath: payload.pageUrl || "/",
        pageTitle: payload.pageTitle || "WhatsApp Interaction",
        visitorId: visitor.visitorId,
        sessionId: session.sessionId,
        metadata: payload
      });

      res.json({ success: true, event: evt, visitor, session });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 4c. GET WhatsApp Click Logs
  app.get("/api/analytics/whatsapp-clicks", (req, res) => {
    try {
      const logs = analyticsStore.getWhatsAppLogs();
      res.json({ success: true, logs });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 4d. CLEAR WhatsApp Click Logs
  app.post("/api/analytics/whatsapp-clicks/clear", (req, res) => {
    try {
      analyticsStore.clearWhatsAppLogs();
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 5. Heatmap Click Coordinate
  app.post("/api/analytics/heatmap", (req, res) => {
    try {
      const pt = analyticsStore.recordHeatmapClick(req.body);
      res.json({ success: true, point: pt });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 6. Web Vitals / Performance Log
  app.post("/api/analytics/performance", (req, res) => {
    try {
      const perf = analyticsStore.recordPerformance(req.body);
      res.json({ success: true, performance: perf });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 7. Lead Journey Capture
  app.post("/api/analytics/lead", (req, res) => {
    try {
      const lead = analyticsStore.recordLeadJourney(req.body);
      res.json({ success: true, lead });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 8. GET Dashboard Summary Stats
  app.get("/api/analytics/dashboard", (req, res) => {
    try {
      const summary = analyticsStore.getAnalyticsSummary();
      res.json({ summary });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 9. GET Live Active Visitors
  app.get("/api/analytics/live", (req, res) => {
    try {
      const liveVisitors = analyticsStore.getLiveVisitors();
      res.json({ liveVisitors, count: liveVisitors.length, timestamp: new Date().toISOString() });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 10. GET Visitors List
  app.get("/api/analytics/visitors", (req, res) => {
    try {
      const db = analyticsStore.getDB();
      res.json({ visitors: db.visitors });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 11. GET Sessions
  app.get("/api/analytics/sessions", (req, res) => {
    try {
      const db = analyticsStore.getDB();
      res.json({ sessions: db.sessions });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 12. GET Events
  app.get("/api/analytics/events", (req, res) => {
    try {
      const db = analyticsStore.getDB();
      res.json({ events: db.events });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 13. GET Leads with Journey
  app.get("/api/analytics/leads", (req, res) => {
    try {
      const db = analyticsStore.getDB();
      res.json({ leads: db.leads });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 14. GET Pages Breakdown
  app.get("/api/analytics/pages", (req, res) => {
    try {
      const summary = analyticsStore.getAnalyticsSummary();
      res.json({ topPages: summary.topPages });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 15. GET Integrations
  app.get("/api/analytics/integrations", (req, res) => {
    try {
      const db = analyticsStore.getDB();
      res.json({ integrations: db.integrations });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 16. POST Save Integrations
  app.post("/api/analytics/integrations", (req, res) => {
    try {
      const db = analyticsStore.getDB();
      db.integrations = { ...db.integrations, ...req.body };
      res.json({ success: true, integrations: db.integrations });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 17. GET Export CSV
  app.get("/api/analytics/export", (req, res) => {
    try {
      const db = analyticsStore.getDB();
      let csv = "Visitor ID,First Visit,Last Activity,Country,City,Device,Browser,Current Page,Total Sessions\n";
      db.visitors.forEach(v => {
        csv += `"${v.visitorId}","${v.firstVisit}","${v.lastActivity}","${v.country}","${v.city}","${v.deviceType}","${v.browser}","${v.currentUrl}",${v.totalSessions}\n`;
      });
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", 'attachment; filename="loopcodelabs_analytics_export.csv"');
      res.send(csv);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Helper to get redirect URI dynamically based on request host and scheme
  const getRedirectUri = (req: express.Request): string => {
    // Check X-Forwarded-Host first for custom domains/proxies
    let host = (req.headers["x-forwarded-host"] as string) || req.get("host") || "localhost:3000";
    if (host.includes(",")) {
      host = host.split(",")[0].trim();
    }
    const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
    const proto = (req.headers["x-forwarded-proto"] as string) || (isLocal ? "http" : "https");
    return `${proto}://${host}/auth/callback`;
  };

  // API Route: Google OAuth Authorization URL
  app.get("/api/auth/google/url", (req, res) => {
    const redirectUri = getRedirectUri(req);

    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent"
    });

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    res.json({ url: authUrl });
  });

  // API Route: Callback Handler
  app.get(["/auth/callback", "/auth/callback/"], async (req, res) => {
    const { code } = req.query;
    if (!code) {
      return res.status(400).send("No authorization code provided");
    }

    const redirectUri = getRedirectUri(req);

    try {
      // Exchange code for tokens
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code: code as string,
          client_id: process.env.GOOGLE_CLIENT_ID || "",
          client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        throw new Error(`Google Token Exchange failed: ${errorText}`);
      }

      const data = await tokenResponse.json();
      const decoded: any = jwt.decode(data.id_token);
      
      const profile = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture
      };

      // Check allowed emails restriction if ALLOWED_EMAILS or ADMIN_EMAILS environment variable is configured
      const allowedEmailsEnv = process.env.ALLOWED_EMAILS || process.env.ADMIN_EMAILS || "";
      if (allowedEmailsEnv.trim()) {
        const allowedList = allowedEmailsEnv
          .split(",")
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean);

        const userEmail = (profile.email || "").toLowerCase();

        if (!userEmail || !allowedList.includes(userEmail)) {
          return res.status(403).send(`
            <html>
              <head>
                <title>Access Denied - Restricted Access</title>
                <style>
                  body {
                    background-color: #09090b;
                    color: #ffffff;
                    font-family: system-ui, -apple-system, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    text-align: center;
                    padding: 24px;
                  }
                  .card {
                    background: #18181b;
                    border: 1px solid #27272a;
                    padding: 36px;
                    border-radius: 20px;
                    max-width: 450px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.6);
                  }
                  .icon {
                    width: 56px;
                    height: 56px;
                    background: rgba(244, 63, 94, 0.1);
                    border: 1px solid rgba(244, 63, 94, 0.2);
                    color: #f43f5e;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    margin: 0 auto 20px;
                  }
                  h2 { color: #f43f5e; margin: 0 0 12px; font-size: 22px; font-weight: 700; }
                  p { color: #a1a1aa; font-size: 14px; line-height: 1.6; margin: 0 0 16px; }
                  .email { color: #2BBAA5; font-weight: 700; word-break: break-all; }
                  .btn {
                    display: inline-block;
                    margin-top: 16px;
                    padding: 12px 24px;
                    background: #27272a;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 10px;
                    font-size: 13px;
                    font-weight: 600;
                    transition: all 0.2s;
                  }
                  .btn:hover { background: #3f3f46; color: #ffffff; }
                </style>
              </head>
              <body>
                <div class="card">
                  <div class="icon">🚫</div>
                  <h2>Access Denied</h2>
                  <p>The Google account <span class="email">${userEmail || "unknown"}</span> is not authorized to sign into this system.</p>
                  <p>To gain access, ask the administrator to add your email address to the <code>ALLOWED_EMAILS</code> environment variable list.</p>
                  <a href="/" class="btn" onclick="if(window.opener){window.close();}else{location.href='/';}return false;">Close / Return to Home</a>
                </div>
              </body>
            </html>
          `);
        }
      }

      const jwtSecret = process.env.JWT_SECRET || "fallback_secret";
      const token = jwt.sign(profile, jwtSecret, { expiresIn: "7d" });

      // Set cookie as security best practice & sameSite none for iframe compatibility
      res.cookie("session_token", token, {
        secure: true,
        sameSite: "none",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      // Send success message to parent window and close popup
      res.send(`
        <html>
          <head>
            <title>Authentication Success</title>
            <style>
              body {
                background-color: #09090b;
                color: #ffffff;
                font-family: system-ui, -apple-system, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                text-align: center;
              }
              .spinner {
                border: 3px solid rgba(255,255,255,0.1);
                border-top: 3px solid #2BBAA5;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            </style>
          </head>
          <body>
            <div class="spinner"></div>
            <h2>Authenticated Successfully!</h2>
            <p>Connecting to AI Studio...</p>
            <script>
              try {
                if (window.opener) {
                  window.opener.postMessage({ 
                    type: 'OAUTH_AUTH_SUCCESS', 
                    token: ${JSON.stringify(token)}, 
                    user: ${JSON.stringify(profile)} 
                  }, '*');
                  window.close();
                } else {
                  window.location.href = '/';
                }
              } catch (e) {
                console.error(e);
                window.location.href = '/';
              }
            </script>
          </body>
        </html>
      `);
    } catch (error: any) {
      console.error("Auth error:", error);
      res.status(500).send(`Authentication failed: ${error.message}`);
    }
  });

  // API Route: Get current user
  app.get("/api/auth/me", (req, res) => {
    let token = req.headers.authorization?.split(" ")[1];
    
    if (!token && req.headers.cookie) {
      const cookies = Object.fromEntries(
        req.headers.cookie.split(";").map(c => c.trim().split("="))
      );
      token = cookies["session_token"];
    }

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const jwtSecret = process.env.JWT_SECRET || "fallback_secret";
      const decoded: any = jwt.verify(token, jwtSecret);

      const allowedEmailsEnv = process.env.ALLOWED_EMAILS || process.env.ADMIN_EMAILS || "";
      if (allowedEmailsEnv.trim()) {
        const allowedList = allowedEmailsEnv
          .split(",")
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean);

        const userEmail = (decoded.email || "").toLowerCase();
        if (!userEmail || !allowedList.includes(userEmail)) {
          return res.status(403).json({ error: "Access denied. Your email is not authorized." });
        }
      }

      res.json({ user: decoded });
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  });

  // API Route: Logout
  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("session_token", {
      secure: true,
      sameSite: "none",
      httpOnly: true
    });
    res.json({ success: true });
  });

  // Google Search Console dynamic ownership verification (HTML file method)
  app.get("/google:gsc_id.html", (req, res) => {
    const { gsc_id } = req.params;
    if (/^[a-zA-Z0-9_-]+$/.test(gsc_id)) {
      res.type("html").send(`google-site-verification: google${gsc_id}.html`);
    } else {
      res.status(404).send("Not Found");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files with optimized Cache-Control headers for high-performance SEO rankings
    app.use(express.static(distPath, {
      maxAge: "1y",
      setHeaders: (res, filePath) => {
        const isDynamicOrTxt = filePath.endsWith(".html") || 
                              filePath.endsWith("sitemap.xml") || 
                              filePath.endsWith("robots.txt") ||
                              filePath.endsWith(".json");
        
        if (isDynamicOrTxt) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        } else {
          // Keep images, fingerprinted scripts, styles, and font files cached aggressively
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      }
    }));

    // Dynamic GSC Tag Injection into index.html
    let cachedIndexHtml: string | null = null;
    app.get("*", (req, res) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      
      try {
        if (!cachedIndexHtml) {
          const indexPath = path.join(distPath, "index.html");
          if (fs.existsSync(indexPath)) {
            cachedIndexHtml = fs.readFileSync(indexPath, "utf-8");
          }
        }

        if (cachedIndexHtml) {
          const token = process.env.GOOGLE_SITE_VERIFICATION || "";
          const personalizedHtml = cachedIndexHtml.replace("GSC_VERIFICATION_TOKEN_REPLACE_ME", token);
          res.type("html").send(personalizedHtml);
        } else {
          res.status(404).send("index.html not found");
        }
      } catch (err) {
        console.error("Error dynamically injecting GSC token into index.html:", err);
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
