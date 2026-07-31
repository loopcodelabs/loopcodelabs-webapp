import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool: mysql.Pool | null = null;
let mysqlAvailable = false;

export async function getMySQLPool(): Promise<mysql.Pool | null> {
  if (pool) return pool;

  try {
    const host = process.env.DB_HOST || "localhost";
    const port = Number(process.env.DB_PORT) || 3306;
    const user = process.env.DB_USER || "root";
    const password = process.env.DB_PASSWORD || "";
    const database = process.env.DB_NAME || "loopcodelabs_dev";

    const testPool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 2000 // Quick timeout check
    });

    const conn = await testPool.getConnection();
    conn.release();
    pool = testPool;
    mysqlAvailable = true;
    console.log(`[MySQL] Successfully connected to database: ${database} on ${host}:${port}`);
    return pool;
  } catch (err: any) {
    mysqlAvailable = false;
    // Silent notice: local MySQL server is optional; store uses file-based JSON store if offline
    return null;
  }
}

export function isMySQLAvailable(): boolean {
  return mysqlAvailable;
}

export async function loadConfigFromMySQL(): Promise<any | null> {
  const p = await getMySQLPool();
  if (!p) return null;

  try {
    const [rows]: any = await p.query("SELECT setting_key, setting_value FROM website_settings");
    if (!rows || rows.length === 0) return null;

    const settingsMap: Record<string, string> = {};
    for (const row of rows) {
      settingsMap[row.setting_key] = row.setting_value;
    }

    let config: any = {};
    if (settingsMap["full_website_config"]) {
      try {
        config = JSON.parse(settingsMap["full_website_config"]);
      } catch (e) {
        // Fallback to individual keys
      }
    }

    if (!config.siteSettings) {
      config.siteSettings = {};
    }

    // Merge individual site_* keys (e.g. site_contactEmail) from website_settings
    for (const [key, val] of Object.entries(settingsMap)) {
      if (key.startsWith("site_")) {
        const prop = key.replace("site_", "");
        let parsedVal: any = val;
        try {
          parsedVal = JSON.parse(val);
        } catch (e) {
          // Use string value directly
        }
        config.siteSettings[prop] = parsedVal;
      }
    }

    return config;
  } catch (err) {
    console.error("[MySQL] Error loading config from website_settings table:", err);
    return null;
  }
}

let saveQueue: Promise<any> = Promise.resolve();

export function saveConfigToMySQL(config: any): Promise<boolean> {
  saveQueue = saveQueue.then(() => _executeSaveConfigToMySQL(config)).catch(() => false);
  return saveQueue;
}

async function _executeSaveConfigToMySQL(config: any): Promise<boolean> {
  const p = await getMySQLPool();
  if (!p) return false;

  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const jsonStr = JSON.stringify(config);
      await p.query(
        `INSERT INTO website_settings (setting_key, setting_value) 
         VALUES ('full_website_config', ?) 
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
        [jsonStr]
      ).catch(() => {});

      // Also update individual setting keys for compatibility
      if (config.siteSettings) {
        for (const [key, val] of Object.entries(config.siteSettings)) {
          const valStr = typeof val === "object" ? JSON.stringify(val) : String(val);
          await p.query(
            `INSERT INTO website_settings (setting_key, setting_value) 
             VALUES (?, ?) 
             ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
            [`site_${key}`, valStr]
          ).catch(() => {});
        }
      }

      // Update Services table if services are present
      if (Array.isArray(config.services)) {
        for (const s of config.services) {
          await p.query(
            `INSERT INTO services (id, title, slug, description, icon, features_json, order_index)
             VALUES (?, ?, ?, ?, 'Code', ?, 0)
             ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description), features_json=VALUES(features_json)`,
            [s.id, s.title, s.slug || s.id, s.description, JSON.stringify(s.deliverables || [])]
          ).catch(() => {});
        }
      }

      return true;
    } catch (err: any) {
      const isDeadlock = err?.code === "ER_LOCK_DEADLOCK" || err?.errno === 1213;
      if (isDeadlock && attempt < maxRetries) {
        await new Promise(res => setTimeout(res, 60 * attempt));
        continue;
      }
      console.error("[MySQL] Error saving config to website_settings table:", err);
      return false;
    }
  }
  return false;
}

export async function loadAnalyticsFromMySQL(): Promise<any | null> {
  const p = await getMySQLPool();
  if (!p) return null;

  try {
    const [visitorRows]: any = await p.query("SELECT * FROM visitors").catch(() => [null]);
    if (!visitorRows || !Array.isArray(visitorRows)) {
      return null;
    }

    const visitorsMap: Record<string, any> = {};
    visitorRows.forEach((v: any) => {
      let parsedData = {};
      if (v.data) {
        try { parsedData = typeof v.data === "string" ? JSON.parse(v.data) : v.data; } catch (e) {}
      }
      const vId = v.visitor_id || v.visitorId || v.id;
      if (!vId) return;
      visitorsMap[vId] = {
        visitorId: vId,
        ipAddress: v.ip_address || v.ipAddress || "127.0.0.1",
        country: v.country || "India",
        state: v.state || "Telangana",
        city: v.city || "Hyderabad",
        browser: v.browser || "Browser",
        deviceType: v.device_type || v.deviceType || "Desktop",
        os: v.os || "Windows",
        totalSessions: v.total_sessions || v.totalSessions || 1,
        firstVisit: v.first_visit || v.firstVisit || new Date().toISOString(),
        lastActivity: v.last_activity || v.lastActivity || new Date().toISOString(),
        ...parsedData
      };
    });

    const [sessionRows]: any = await p.query("SELECT * FROM visitor_sessions").catch(() => [null]);
    const sessionsMap: Record<string, any> = {};
    if (sessionRows && Array.isArray(sessionRows)) {
      sessionRows.forEach((s: any) => {
        let parsedData = {};
        if (s.data) {
          try { parsedData = typeof s.data === "string" ? JSON.parse(s.data) : s.data; } catch (e) {}
        }
        const sId = s.session_id || s.sessionId || s.id;
        if (!sId) return;
        sessionsMap[sId] = {
          sessionId: sId,
          visitorId: s.visitor_id || s.visitorId,
          startTime: s.start_time || s.startTime || new Date().toISOString(),
          lastActiveTime: s.last_activity || s.lastActiveTime || s.lastActivity || new Date().toISOString(),
          durationSeconds: s.duration_seconds || s.durationSeconds || 1,
          pagesVisited: s.page_views_count || s.pagesVisited || 1,
          device: s.device_type || s.device || "Desktop",
          browser: s.browser || "Browser",
          country: s.country || "India",
          pageViews: [],
          ...parsedData
        };
      });
    }

    const [eventRows]: any = await p.query("SELECT * FROM events").catch(() => [null]);
    const eventsList: any[] = [];
    if (eventRows && Array.isArray(eventRows)) {
      eventRows.forEach((e: any) => {
        let metadata = {};
        if (e.metadata) {
          try { metadata = typeof e.metadata === "string" ? JSON.parse(e.metadata) : e.metadata; } catch (err) {}
        }
        eventsList.push({
          id: e.id,
          eventName: e.event_name || e.eventName || "Event",
          visitorId: e.visitor_id || e.visitorId,
          sessionId: e.session_id || e.sessionId,
          urlPath: e.url_path || e.urlPath || "/",
          pageTitle: e.page_title || e.pageTitle || "LoopCodeLabs",
          timestamp: e.timestamp || new Date().toISOString(),
          metadata
        });
      });
    }

    const [pvRows]: any = await p.query("SELECT * FROM page_views").catch(() => [null]);
    const pageViewsList: any[] = [];
    if (pvRows && Array.isArray(pvRows)) {
      pvRows.forEach((pv: any) => {
        const item = {
          id: pv.id,
          sessionId: pv.session_id || pv.sessionId,
          visitorId: pv.visitor_id || pv.visitorId,
          pageTitle: pv.page_title || pv.pageTitle || "",
          urlPath: pv.url_path || pv.urlPath || "/",
          entryTime: pv.entry_time || pv.entryTime || new Date().toISOString(),
          timeSpentSeconds: pv.time_spent_seconds || pv.timeSpentSeconds || 0
        };
        pageViewsList.push(item);
        if (item.sessionId && sessionsMap[item.sessionId]) {
          if (!Array.isArray(sessionsMap[item.sessionId].pageViews)) {
            sessionsMap[item.sessionId].pageViews = [];
          }
          sessionsMap[item.sessionId].pageViews.push(item);
        }
      });
    }

    const [leadRows]: any = await p.query("SELECT * FROM leads").catch(() => [null]);
    const leadsList: any[] = [];
    if (leadRows && Array.isArray(leadRows)) {
      leadRows.forEach((l: any) => {
        let history = [];
        if (l.browsing_history || l.browsingHistory) {
          try {
            const raw = l.browsing_history || l.browsingHistory;
            history = typeof raw === "string" ? JSON.parse(raw) : raw;
          } catch (e) {}
        }
        let evts = [];
        if (l.events_triggered || l.eventsTriggered) {
          try {
            const raw = l.events_triggered || l.eventsTriggered;
            evts = typeof raw === "string" ? JSON.parse(raw) : raw;
          } catch (e) {}
        }
        leadsList.push({
          id: l.id,
          visitorId: l.visitor_id || l.visitorId,
          sessionId: l.session_id || l.sessionId,
          submittedAt: l.submitted_at || l.submittedAt || new Date().toISOString(),
          name: l.name || "",
          email: l.email || "",
          phone: l.phone || "",
          company: l.company || "",
          requirements: l.requirements || "",
          browsingHistory: history,
          eventsTriggered: evts
        });
      });
    }

    const [clickRows]: any = await p.query("SELECT * FROM click_events").catch(() => [null]);
    const heatmapsList: any[] = [];
    if (clickRows && Array.isArray(clickRows)) {
      clickRows.forEach((c: any) => {
        heatmapsList.push({
          id: c.id,
          urlPath: c.url_path || c.urlPath || "/",
          elementTag: c.element_tag || c.elementTag || "BUTTON",
          elementText: c.element_text || c.elementText || "",
          xRatio: parseFloat(c.x_ratio || c.xRatio || 0),
          yRatio: parseFloat(c.y_ratio || c.yRatio || 0),
          timestamp: c.timestamp || new Date().toISOString()
        });
      });
    }

    // Clean up any lingering full_analytics_data key from website_settings
    await p.query("DELETE FROM website_settings WHERE setting_key = 'full_analytics_data'").catch(() => {});

    return {
      visitors: Object.values(visitorsMap),
      sessions: Object.values(sessionsMap),
      events: eventsList,
      pageViews: pageViewsList,
      leads: leadsList,
      heatmaps: heatmapsList
    };
  } catch (err) {
    console.error("[MySQL] Error loading analytics data:", err);
    return null;
  }
}

let saveAnalyticsQueue: Promise<any> = Promise.resolve();

export function saveAnalyticsToMySQL(analyticsData: any): Promise<boolean> {
  saveAnalyticsQueue = saveAnalyticsQueue.then(() => _executeSaveAnalyticsToMySQL(analyticsData)).catch(() => false);
  return saveAnalyticsQueue;
}

function formatMySQLDateTime(dateStr?: string | number | Date | null): string {
  if (!dateStr) return new Date().toISOString().slice(0, 19).replace('T', ' ');
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return new Date().toISOString().slice(0, 19).replace('T', ' ');
    return d.toISOString().slice(0, 19).replace('T', ' ');
  } catch {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
}

async function ensureAllColumnsExist(p: any) {
  const alterStatements = [
    // visitors columns
    "ALTER TABLE visitors ADD COLUMN ip_address VARCHAR(45)",
    "ALTER TABLE visitors ADD COLUMN country VARCHAR(100)",
    "ALTER TABLE visitors ADD COLUMN state VARCHAR(100)",
    "ALTER TABLE visitors ADD COLUMN city VARCHAR(100)",
    "ALTER TABLE visitors ADD COLUMN browser VARCHAR(50)",
    "ALTER TABLE visitors ADD COLUMN device_type VARCHAR(50)",
    "ALTER TABLE visitors ADD COLUMN os VARCHAR(50)",
    "ALTER TABLE visitors ADD COLUMN total_sessions INT DEFAULT 1",
    "ALTER TABLE visitors ADD COLUMN first_visit VARCHAR(64)",
    "ALTER TABLE visitors ADD COLUMN last_activity VARCHAR(64)",
    "ALTER TABLE visitors ADD COLUMN data JSON",
    "ALTER TABLE visitors ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",

    // visitor_sessions columns
    "ALTER TABLE visitor_sessions ADD COLUMN visitor_id VARCHAR(64)",
    "ALTER TABLE visitor_sessions ADD COLUMN start_time VARCHAR(64)",
    "ALTER TABLE visitor_sessions ADD COLUMN last_activity VARCHAR(64)",
    "ALTER TABLE visitor_sessions ADD COLUMN duration_seconds INT DEFAULT 0",
    "ALTER TABLE visitor_sessions ADD COLUMN page_views_count INT DEFAULT 1",
    "ALTER TABLE visitor_sessions ADD COLUMN device_type VARCHAR(50)",
    "ALTER TABLE visitor_sessions ADD COLUMN browser VARCHAR(50)",
    "ALTER TABLE visitor_sessions ADD COLUMN country VARCHAR(100)",
    "ALTER TABLE visitor_sessions ADD COLUMN data JSON",
    "ALTER TABLE visitor_sessions ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",

    // events columns
    "ALTER TABLE events ADD COLUMN event_name VARCHAR(100)",
    "ALTER TABLE events ADD COLUMN visitor_id VARCHAR(64)",
    "ALTER TABLE events ADD COLUMN session_id VARCHAR(64)",
    "ALTER TABLE events ADD COLUMN url_path VARCHAR(255)",
    "ALTER TABLE events ADD COLUMN page_title VARCHAR(255)",
    "ALTER TABLE events ADD COLUMN timestamp VARCHAR(64)",
    "ALTER TABLE events ADD COLUMN metadata JSON",

    // page_views columns
    "ALTER TABLE page_views ADD COLUMN session_id VARCHAR(64)",
    "ALTER TABLE page_views ADD COLUMN visitor_id VARCHAR(64)",
    "ALTER TABLE page_views ADD COLUMN page_title VARCHAR(255)",
    "ALTER TABLE page_views ADD COLUMN url_path VARCHAR(255)",
    "ALTER TABLE page_views ADD COLUMN entry_time VARCHAR(64)",
    "ALTER TABLE page_views ADD COLUMN time_spent_seconds INT DEFAULT 0"
  ];

  for (const stmt of alterStatements) {
    await p.query(stmt).catch(() => {
      // Ignore duplicate column errors or syntax differences
    });
  }
}

async function _executeSaveAnalyticsToMySQL(analyticsData: any): Promise<boolean> {
  const p = await getMySQLPool();
  if (!p) return false;

  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // 0. Disable foreign key checks temporarily during sync
      await p.query("SET FOREIGN_KEY_CHECKS = 0").catch(() => {});

      // 1. Ensure tables exist
      await p.query(`
        CREATE TABLE IF NOT EXISTS visitors (
          visitor_id VARCHAR(64) PRIMARY KEY,
          ip_address VARCHAR(45),
          country VARCHAR(100),
          state VARCHAR(100),
          city VARCHAR(100),
          browser VARCHAR(50),
          device_type VARCHAR(50),
          os VARCHAR(50),
          total_sessions INT DEFAULT 1,
          first_visit VARCHAR(64),
          last_activity VARCHAR(64),
          data JSON,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `).catch(() => {});

      await p.query(`
        CREATE TABLE IF NOT EXISTS visitor_sessions (
          session_id VARCHAR(64) PRIMARY KEY,
          visitor_id VARCHAR(64),
          start_time VARCHAR(64),
          last_activity VARCHAR(64),
          duration_seconds INT DEFAULT 0,
          page_views_count INT DEFAULT 1,
          device_type VARCHAR(50),
          browser VARCHAR(50),
          country VARCHAR(100),
          data JSON,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `).catch(() => {});

      await p.query(`
        CREATE TABLE IF NOT EXISTS page_views (
          id VARCHAR(64) PRIMARY KEY,
          session_id VARCHAR(64),
          visitor_id VARCHAR(64),
          page_title VARCHAR(255),
          url_path VARCHAR(255),
          entry_time VARCHAR(64),
          time_spent_seconds INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `).catch(() => {});

      await p.query(`
        CREATE TABLE IF NOT EXISTS events (
          id VARCHAR(64) PRIMARY KEY,
          event_name VARCHAR(100),
          visitor_id VARCHAR(64),
          session_id VARCHAR(64),
          url_path VARCHAR(255),
          page_title VARCHAR(255),
          timestamp VARCHAR(64),
          metadata JSON,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `).catch(() => {});

      await p.query(`
        CREATE TABLE IF NOT EXISTS event_types (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL UNIQUE,
          category VARCHAR(50) DEFAULT 'CTA',
          description VARCHAR(255)
        )
      `).catch(() => {});

      await p.query(`
        CREATE TABLE IF NOT EXISTS click_events (
          id VARCHAR(64) PRIMARY KEY,
          url_path VARCHAR(255) NOT NULL,
          element_tag VARCHAR(50) DEFAULT 'BUTTON',
          element_text VARCHAR(100) DEFAULT '',
          x_ratio DECIMAL(5, 4) NOT NULL,
          y_ratio DECIMAL(5, 4) NOT NULL,
          timestamp VARCHAR(64),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `).catch(() => {});

      // 2. Ensure all columns exist on pre-existing tables
      await ensureAllColumnsExist(p);

      // 3. Persist visitors to visitors table
      if (analyticsData.visitors && typeof analyticsData.visitors === "object") {
        const visitorList = Array.isArray(analyticsData.visitors) 
          ? analyticsData.visitors 
          : Object.values(analyticsData.visitors);

        for (const v of visitorList as any[]) {
          if (!v.visitorId) continue;
          await p.query(
            `INSERT INTO visitors (
              visitor_id, ip_address, country, state, city, browser, device_type, os, total_sessions, first_visit, last_activity, data
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              ip_address = VALUES(ip_address),
              country = VALUES(country),
              state = VALUES(state),
              city = VALUES(city),
              browser = VALUES(browser),
              device_type = VALUES(device_type),
              os = VALUES(os),
              total_sessions = VALUES(total_sessions),
              last_activity = VALUES(last_activity),
              data = VALUES(data)`,
            [
              v.visitorId,
              v.ipAddress || "127.0.0.1",
              v.country || null,
              v.state || null,
              v.city || null,
              v.browser || null,
              v.deviceType || v.device || null,
              v.os || null,
              v.totalSessions || 1,
              formatMySQLDateTime(v.firstVisit),
              formatMySQLDateTime(v.lastActivity),
              JSON.stringify(v)
            ]
          ).catch((e: any) => {
            console.error("[MySQL] Error persisting visitor row:", e?.message);
          });
        }
      }

      // 4. Persist visitor sessions to visitor_sessions table
      if (analyticsData.sessions && typeof analyticsData.sessions === "object") {
        const sessionList = Array.isArray(analyticsData.sessions)
          ? analyticsData.sessions
          : Object.values(analyticsData.sessions);

        for (const s of sessionList as any[]) {
          if (!s.sessionId) continue;
          if (s.visitorId) {
            await p.query(
              `INSERT IGNORE INTO visitors (visitor_id, ip_address, browser, device_type, first_visit, last_activity)
               VALUES (?, ?, ?, ?, ?, ?)`,
              [
                s.visitorId,
                "127.0.0.1",
                s.browser || "Browser",
                s.device || s.deviceType || "Desktop",
                formatMySQLDateTime(s.startTime),
                formatMySQLDateTime(s.lastActiveTime || s.lastActivity)
              ]
            ).catch(() => {});
          }

          await p.query(
            `INSERT INTO visitor_sessions (
              session_id, visitor_id, start_time, last_activity, duration_seconds, page_views_count, device_type, browser, country, data
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              last_activity = VALUES(last_activity),
              duration_seconds = VALUES(duration_seconds),
              page_views_count = VALUES(page_views_count),
              device_type = VALUES(device_type),
              browser = VALUES(browser),
              country = VALUES(country),
              data = VALUES(data)`,
            [
              s.sessionId,
              s.visitorId || null,
              formatMySQLDateTime(s.startTime),
              formatMySQLDateTime(s.lastActiveTime || s.lastActivity),
              s.durationSeconds || 0,
              s.pagesVisited || s.pageViewsCount || 1,
              s.device || s.deviceType || null,
              s.browser || null,
              s.country || null,
              JSON.stringify(s)
            ]
          ).catch((e: any) => {
            console.error("[MySQL] Error persisting session row:", e?.message);
          });
        }
      }

      // 5. Persist events to events table
      if (Array.isArray(analyticsData.events)) {
        for (const e of analyticsData.events as any[]) {
          if (!e.id) continue;
          if (e.visitorId) {
            await p.query(
              `INSERT IGNORE INTO visitors (visitor_id, first_visit, last_activity) VALUES (?, ?, ?)`,
              [e.visitorId, formatMySQLDateTime(e.timestamp), formatMySQLDateTime(e.timestamp)]
            ).catch(() => {});
          }
          if (e.sessionId) {
            await p.query(
              `INSERT IGNORE INTO visitor_sessions (session_id, visitor_id, start_time, last_activity) VALUES (?, ?, ?, ?)`,
              [e.sessionId, e.visitorId || null, formatMySQLDateTime(e.timestamp), formatMySQLDateTime(e.timestamp)]
            ).catch(() => {});
          }

          await p.query(
            `INSERT INTO events (
              id, event_name, visitor_id, session_id, url_path, page_title, timestamp, metadata
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              event_name = VALUES(event_name),
              metadata = VALUES(metadata)`,
            [
              e.id,
              e.eventName || "User Event",
              e.visitorId || null,
              e.sessionId || null,
              e.urlPath || "/",
              e.pageTitle || "",
              formatMySQLDateTime(e.timestamp),
              JSON.stringify(e.metadata || {})
            ]
          ).catch((err: any) => {
            console.error("[MySQL] Error persisting event row:", err?.message);
          });

          // Insert or ensure event_types table entry
          const category = e.eventName?.toLowerCase().includes("whatsapp") ? "WhatsApp" : "CTA";
          await p.query(
            `INSERT IGNORE INTO event_types (name, category, description) VALUES (?, ?, ?)`,
            [e.eventName || "User Event", category, "User interaction event"]
          ).catch(() => {});
        }
      }

      // 5b. Persist heatmap points to click_events table
      if (Array.isArray(analyticsData.heatmaps)) {
        for (const clk of analyticsData.heatmaps as any[]) {
          if (!clk.id) continue;
          await p.query(
            `INSERT INTO click_events (
              id, url_path, element_tag, element_text, x_ratio, y_ratio, timestamp
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              element_tag = VALUES(element_tag),
              element_text = VALUES(element_text)`,
            [
              clk.id,
              clk.urlPath || "/",
              clk.elementTag || "BUTTON",
              clk.elementText || "",
              clk.xRatio || 0,
              clk.yRatio || 0,
              formatMySQLDateTime(clk.timestamp)
            ]
          ).catch((err: any) => {
            console.error("[MySQL] Error persisting click_events row:", err?.message);
          });
        }
      }

      // 6. Persist page views to page_views table
      if (Array.isArray(analyticsData.pageViews)) {
        for (const pv of analyticsData.pageViews as any[]) {
          if (!pv.id) continue;
          if (pv.visitorId) {
            await p.query(
              `INSERT IGNORE INTO visitors (visitor_id, first_visit, last_activity) VALUES (?, ?, ?)`,
              [pv.visitorId, formatMySQLDateTime(pv.entryTime), formatMySQLDateTime(pv.entryTime)]
            ).catch(() => {});
          }
          if (pv.sessionId) {
            await p.query(
              `INSERT IGNORE INTO visitor_sessions (session_id, visitor_id, start_time, last_activity) VALUES (?, ?, ?, ?)`,
              [pv.sessionId, pv.visitorId || null, formatMySQLDateTime(pv.entryTime), formatMySQLDateTime(pv.entryTime)]
            ).catch(() => {});
          }

          await p.query(
            `INSERT INTO page_views (
              id, session_id, visitor_id, page_title, url_path, entry_time, time_spent_seconds
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              time_spent_seconds = VALUES(time_spent_seconds)`,
            [
              pv.id,
              pv.sessionId || null,
              pv.visitorId || null,
              pv.pageTitle || "",
              pv.urlPath || "/",
              formatMySQLDateTime(pv.entryTime),
              pv.timeSpentSeconds || 0
            ]
          ).catch((err: any) => {
            console.error("[MySQL] Error persisting page_view row:", err?.message);
          });
        }
      }

      // 7. Clean up any full_analytics_data blob in website_settings table
      await p.query("DELETE FROM website_settings WHERE setting_key = 'full_analytics_data'").catch(() => {});

      await p.query("SET FOREIGN_KEY_CHECKS = 1").catch(() => {});
      return true;
    } catch (err: any) {
      await p.query("SET FOREIGN_KEY_CHECKS = 1").catch(() => {});
      const isDeadlock = err?.code === "ER_LOCK_DEADLOCK" || err?.errno === 1213;
      if (isDeadlock && attempt < maxRetries) {
        await new Promise(res => setTimeout(res, 60 * attempt));
        continue;
      }
      console.error("[MySQL] Error saving analytics data to relational tables:", err);
      return false;
    }
  }
  return false;
}

