import nodemailer from "nodemailer";

export interface LeadEmailPayload {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  requirements?: string;
  visitorId?: string;
  sessionId?: string;
  submittedAt?: string;
  browsingHistory?: Array<{
    urlPath: string;
    pageTitle: string;
    timeSpentSeconds: number;
    timestamp: string;
  }>;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  reason?: string;
  leadStored: boolean;
}

/**
 * Creates and returns a Nodemailer transporter using environment variables.
 * Uses lazy initialization to prevent startup crashes when keys/credentials are missing.
 */
export function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    },
    tls: {
      rejectUnauthorized: false // Helps avoid SSL certificate issues in dev/proxy environments
    }
  });
}

/**
 * Verifies SMTP connection configuration
 */
export async function verifySmtpConnection(): Promise<{ configured: boolean; ok: boolean; error?: string }> {
  const transporter = getTransporter();
  if (!transporter) {
    return {
      configured: false,
      ok: false,
      error: "SMTP credentials (SMTP_USER & SMTP_PASS) are missing in environment variables."
    };
  }

  try {
    await transporter.verify();
    return { configured: true, ok: true };
  } catch (err: any) {
    console.error("[EmailService] SMTP verification failed:", err.message);
    return { configured: true, ok: false, error: err.message };
  }
}

/**
 * Sends a rich HTML enquiry notification to hello@loopcodelabs.in upon submission
 */
export async function sendEnquiryNotificationEmail(lead: LeadEmailPayload): Promise<SendEmailResult> {
  const notificationRecipient = process.env.NOTIFICATION_EMAIL || "hello@loopcodelabs.in";
  const fromAddress = process.env.SMTP_FROM || `"LoopCodeLabs Enquiry" <${process.env.SMTP_USER || "hello@loopcodelabs.in"}>`;

  const transporter = getTransporter();

  if (!transporter) {
    const warningMsg = `[EmailService] SMTP credentials not set (SMTP_USER / SMTP_PASS). Mail dispatch skipped, but lead enquiry for "${lead.name}" (${lead.email}) is safely stored in database.`;
    console.warn(warningMsg);
    return {
      success: false,
      reason: "SMTP credentials not configured in environment variables. Lead stored in DB.",
      leadStored: true
    };
  }

  const timestampStr = lead.submittedAt
    ? new Date(lead.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST"
    : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST";

  // Build browsing history summary table if available
  let historyHtml = "";
  if (lead.browsingHistory && lead.browsingHistory.length > 0) {
    const rows = lead.browsingHistory
      .slice(0, 5)
      .map(
        (h) => `
        <tr>
          <td style="padding: 6px 12px; border-bottom: 1px solid #1E293B; font-family: monospace; font-size: 12px; color: #38BDF8;">${h.urlPath}</td>
          <td style="padding: 6px 12px; border-bottom: 1px solid #1E293B; font-size: 12px; color: #94A3B8;">${h.pageTitle}</td>
          <td style="padding: 6px 12px; border-bottom: 1px solid #1E293B; font-size: 12px; color: #CBD5E1; text-align: right;">${h.timeSpentSeconds}s</td>
        </tr>`
      )
      .join("");

    historyHtml = `
      <div style="margin-top: 24px; background-color: #0F172A; border: 1px solid #1E293B; border-radius: 8px; padding: 16px;">
        <h4 style="margin: 0 0 12px 0; color: #2BBAA5; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
          📊 Pre-Submission Visitor Journey (${lead.browsingHistory.length} Pages Visited)
        </h4>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid #334155;">
              <th style="padding: 6px 12px; font-size: 11px; color: #64748B; text-transform: uppercase;">Path</th>
              <th style="padding: 6px 12px; font-size: 11px; color: #64748B; text-transform: uppercase;">Page Title</th>
              <th style="padding: 6px 12px; font-size: 11px; color: #64748B; text-transform: uppercase; text-align: right;">Time Spent</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>`;
  }

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Project Enquiry - LoopCodeLabs</title>
  </head>
  <body style="background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F8FAFC; margin: 0; padding: 24px;">
    <div style="max-width: 640px; margin: 0 auto; background-color: #090D16; border: 1px solid #1E293B; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
      
      <!-- Brand Header -->
      <div style="background-color: #0B132B; padding: 24px 32px; border-bottom: 1px solid #1E293B; display: flex; align-items: center; justify-content: space-between;">
        <div style="font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px;">
          <span style="color: #2BBAA5;">&lt;∞&gt;</span> LoopCodeLabs
        </div>
        <div style="font-size: 11px; font-weight: 700; color: #2BBAA5; background-color: rgba(43, 186, 165, 0.1); padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(43, 186, 165, 0.3);">
          NEW ENQUIRY
        </div>
      </div>

      <!-- Main Body -->
      <div style="padding: 32px;">
        <h2 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700; color: #FFFFFF;">
          New Project Enquiry Received 🚀
        </h2>
        <p style="margin: 0 0 24px 0; font-size: 14px; color: #94A3B8;">
          Submitted via website contact form on <strong>${timestampStr}</strong>
        </p>

        <!-- Lead Info Card -->
        <div style="background-color: #0F172A; border: 1px solid #1E293B; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #64748B; width: 120px;">Client Name:</td>
              <td style="padding: 8px 0; font-size: 15px; font-weight: 700; color: #FFFFFF;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #64748B;">Email Address:</td>
              <td style="padding: 8px 0; font-size: 15px; font-weight: 600; color: #38BDF8;">
                <a href="mailto:${lead.email}" style="color: #38BDF8; text-decoration: none;">${lead.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #64748B;">Phone / Mobile:</td>
              <td style="padding: 8px 0; font-size: 14px; color: #CBD5E1;">
                <a href="tel:${lead.phone || ''}" style="color: #2BBAA5; text-decoration: none;">${lead.phone || 'Not provided'}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 13px; color: #64748B;">Project Type:</td>
              <td style="padding: 8px 0; font-size: 14px; color: #F1F5F9; font-weight: 600;">${lead.company || 'General Enquiry'}</td>
            </tr>
          </table>
        </div>

        <!-- Requirements / Message -->
        <div style="background-color: #0F172A; border: 1px solid #1E293B; border-radius: 8px; padding: 20px;">
          <h3 style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #2BBAA5;">
            📝 Requirements & Message
          </h3>
          <div style="font-size: 14px; line-height: 1.6; color: #E2E8F0; white-space: pre-wrap; word-break: break-word;">${lead.requirements || 'No message content provided.'}</div>
        </div>

        ${historyHtml}

        <!-- Quick Reply Action Button -->
        <div style="margin-top: 32px; text-align: center;">
          <a href="mailto:${lead.email}?subject=Re:%20LoopCodeLabs%20Project%20Enquiry%20-%20${encodeURIComponent(lead.name)}" 
             style="display: inline-block; background-color: #2BBAA5; color: #030712; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 6px; text-decoration: none; box-shadow: 0 4px 12px rgba(43, 186, 165, 0.3);">
            Reply to ${lead.name}
          </a>
        </div>

      </div>

      <!-- Footer -->
      <div style="background-color: #0B132B; padding: 16px 32px; border-top: 1px solid #1E293B; text-align: center; font-size: 12px; color: #64748B;">
        LoopCodeLabs Automated Enquiry Notification System &bull; <a href="https://loopcodelabs.in" style="color: #64748B;">loopcodelabs.in</a>
      </div>
    </div>
  </body>
  </html>
  `;

  const textContent = `
New Project Enquiry Received - LoopCodeLabs

Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone || 'Not provided'}
Project Type: ${lead.company || 'General Enquiry'}
Submitted At: ${timestampStr}

Requirements & Message:
${lead.requirements || 'No message provided'}

Visitor ID: ${lead.visitorId || 'N/A'}
Session ID: ${lead.sessionId || 'N/A'}
  `.trim();

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to: notificationRecipient,
      replyTo: lead.email,
      subject: `🚀 New Project Enquiry: ${lead.name} (${lead.company || 'Web App'})`,
      text: textContent,
      html: htmlContent
    });

    console.log(`[EmailService] Enquiry notification email successfully sent to ${notificationRecipient}. MessageID: ${info.messageId}`);
    
    return {
      success: true,
      messageId: info.messageId,
      leadStored: true
    };
  } catch (err: any) {
    console.error(`[EmailService] Failed to send enquiry email via Nodemailer:`, err);
    return {
      success: false,
      error: err.message || "Failed to dispatch email via Nodemailer SMTP",
      leadStored: true
    };
  }
}
