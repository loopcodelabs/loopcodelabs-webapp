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

export interface BrandedEmailOptions {
  to: string;
  subject: string;
  title: string;
  subtitle?: string;
  badgeText?: string;
  preheaderText?: string;
  contentHtml: string;
  ctaText?: string;
  ctaUrl?: string;
  replyTo?: string;
}

/**
 * Creates and returns a Nodemailer transporter using environment variables.
 * Uses lazy initialization to prevent startup crashes when credentials are missing.
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
      rejectUnauthorized: false
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
 * Core HTML Email Layout Generator for loopCode Labs.
 * Produces client-compatible, dark-mode optimized HTML with emerald teal brand aesthetics.
 */
export function renderBrandedEmailTemplate(options: {
  title: string;
  subtitle?: string;
  badgeText?: string;
  preheaderText?: string;
  contentHtml: string;
  ctaText?: string;
  ctaUrl?: string;
}): string {
  const {
    title,
    subtitle = "Custom Software, Web Apps & AI Engineering",
    badgeText = "LOOPCODE LABS",
    preheaderText = "loopCode Labs - Software Development & AI Solutions",
    contentHtml,
    ctaText,
    ctaUrl
  } = options;

  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${title} - loopCode Labs</title>
  <style type="text/css">
    /* Reset & Client-Specific Overrides */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    
    /* Dark Mode Optimization */
    @media (prefers-color-scheme: dark) {
      body { background-color: #030712 !important; }
      .email-container { background-color: #090D16 !important; border-color: #1E293B !important; }
      .card-box { background-color: #0F172A !important; border-color: #1E293B !important; }
    }
  </style>
</head>
<body style="background-color: #030712; margin: 0; padding: 24px 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F8FAFC;">
  
  <!-- Preheader text for email inbox previews -->
  <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #030712; opacity: 0;">
    ${preheaderText} &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
    <tr>
      <td align="center">
        
        <!-- Main Email Container -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 640px; background-color: #090D16; border: 1px solid #1E293B; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.7);">
          
          <!-- BRAND HEADER -->
          <tr>
            <td style="background-color: #0B132B; padding: 24px 32px; border-bottom: 1px solid #1E293B;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <!-- Logo & Company Name (Matching Navbar exactly) -->
                  <td align="left" style="vertical-align: middle;">
                    <a href="https://loopcodelabs.in" target="_blank" style="text-decoration: none; display: inline-block;">
                      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                        <tr>
                          <!-- Brand Badge SVG from Navbar (< ♾️ >) -->
                          <td style="vertical-align: middle; padding-right: 10px;">
                            <svg viewBox="0 0 100 36" width="48" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block;">
                              <path d="M 19 10 L 7 18 L 19 26" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M 50 18 C 54 13, 58 9, 63 9 C 69 9, 73 13, 73 18 C 73 23, 69 27, 63 27 C 58 27, 54 23, 50 18 C 46 23, 42 27, 37 27 C 31 27, 27 23, 27 18 C 27 13, 31 9, 37 9 C 42 9, 46 13, 50 18 Z" stroke="#2BBAA5" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M 81 10 L 93 18 L 81 26" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </td>
                          <!-- Brand Name Typography (loopCode in white, Labs in emerald) -->
                          <td style="vertical-align: middle; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 19px; letter-spacing: -0.4px; line-height: 1;">
                            <span style="font-weight: 800; color: #FFFFFF;">loopCode</span> <span style="font-weight: 600; color: #2BBAA5;">Labs</span>
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                  <!-- Category Badge -->
                  <td align="right">
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; color: #2BBAA5; background-color: rgba(43, 186, 165, 0.12); padding: 5px 12px; border-radius: 20px; border: 1px solid rgba(43, 186, 165, 0.3); text-transform: uppercase; letter-spacing: 0.8px;">
                      ${badgeText}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO & CONTENT SECTION -->
          <tr>
            <td style="padding: 32px 32px 24px 32px;">
              
              <!-- Title -->
              <h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700; color: #FFFFFF; line-height: 1.3;">
                ${title}
              </h1>
              
              <!-- Subtitle -->
              ${
                subtitle
                  ? `<p style="margin: 0 0 24px 0; font-size: 14px; color: #94A3B8; line-height: 1.5;">${subtitle}</p>`
                  : `<div style="height: 16px;"></div>`
              }

              <!-- Dynamic Body Content -->
              <div style="font-size: 15px; line-height: 1.6; color: #CBD5E1;">
                ${contentHtml}
              </div>

              <!-- CTA Button (Optional) -->
              ${
                ctaText && ctaUrl
                  ? `
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px;">
                  <tr>
                    <td align="center">
                      <a href="${ctaUrl}" target="_blank" style="display: inline-block; background-color: #2BBAA5; color: #030712; font-weight: 700; font-size: 14px; padding: 14px 32px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 14px rgba(43, 186, 165, 0.35); text-align: center;">
                        ${ctaText}
                      </a>
                    </td>
                  </tr>
                </table>
                `
                  : ""
              }

            </td>
          </tr>

          <!-- BRAND FOOTER -->
          <tr>
            <td style="background-color: #060A12; padding: 24px 32px; border-top: 1px solid #1E293B; text-align: center;">
              
              <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #E2E8F0;">
                loopCode Labs Engineering Studio
              </p>
              
              <p style="margin: 0 0 16px 0; font-size: 12px; color: #64748B; line-height: 1.5;">
                Building Scalable Web Applications, Enterprise SaaS & Custom AI Systems
              </p>

              <!-- Footer Links -->
              <p style="margin: 0 0 16px 0; font-size: 12px; color: #94A3B8;">
                <a href="https://loopcodelabs.in" target="_blank" style="color: #2BBAA5; text-decoration: none; margin: 0 8px;">Website</a> &bull;
                <a href="mailto:hello@loopcodelabs.in" style="color: #2BBAA5; text-decoration: none; margin: 0 8px;">hello@loopcodelabs.in</a> &bull;
                <a href="https://loopcodelabs.in/#contact" target="_blank" style="color: #2BBAA5; text-decoration: none; margin: 0 8px;">Contact Us</a>
              </p>

              <div style="border-top: 1px solid #131C2E; margin: 16px 0;"></div>

              <p style="margin: 0; font-size: 11px; color: #475569; line-height: 1.4;">
                &copy; ${currentYear} loopCode Labs. All rights reserved.<br />
                This email was sent by <strong>hello@loopcodelabs.in</strong>. If you did not request this communication, please disregard.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

/**
 * Sends a branded enquiry notification email to hello@loopcodelabs.in (internal team notification).
 */
export async function sendEnquiryNotificationEmail(lead: LeadEmailPayload): Promise<SendEmailResult> {
  const notificationRecipient = process.env.NOTIFICATION_EMAIL || "hello@loopcodelabs.in";
  const fromAddress = process.env.SMTP_FROM || `"loopCode Labs Enquiry" <${process.env.SMTP_USER || "hello@loopcodelabs.in"}>`;

  const transporter = getTransporter();

  if (!transporter) {
    console.warn(`[EmailService] SMTP credentials not set. Internal notification skipped for "${lead.name}".`);
    return {
      success: false,
      reason: "SMTP credentials not configured in environment variables. Lead safely saved in database.",
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
          <td style="padding: 8px 12px; border-bottom: 1px solid #1E293B; font-family: monospace; font-size: 12px; color: #38BDF8;">${h.urlPath}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #1E293B; font-size: 12px; color: #94A3B8;">${h.pageTitle}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #1E293B; font-size: 12px; color: #CBD5E1; text-align: right;">${h.timeSpentSeconds}s</td>
        </tr>`
      )
      .join("");

    historyHtml = `
      <div style="margin-top: 24px; background-color: #0F172A; border: 1px solid #1E293B; border-radius: 8px; padding: 16px;" class="card-box">
        <h4 style="margin: 0 0 12px 0; color: #2BBAA5; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
          📊 Pre-Submission Journey (${lead.browsingHistory.length} Pages Visited)
        </h4>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid #334155;">
              <th style="padding: 6px 12px; font-size: 11px; color: #64748B; text-transform: uppercase;">Path</th>
              <th style="padding: 6px 12px; font-size: 11px; color: #64748B; text-transform: uppercase;">Page Title</th>
              <th style="padding: 6px 12px; font-size: 11px; color: #64748B; text-transform: uppercase; text-align: right;">Duration</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>`;
  }

  const contentHtml = `
    <!-- Lead Overview Card -->
    <div style="background-color: #0F172A; border: 1px solid #1E293B; border-radius: 8px; padding: 20px; margin-bottom: 20px;" class="card-box">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
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
          <td style="padding: 8px 0; font-size: 13px; color: #64748B;">Phone Number:</td>
          <td style="padding: 8px 0; font-size: 14px; color: #CBD5E1;">
            <a href="tel:${lead.phone || ''}" style="color: #2BBAA5; text-decoration: none;">${lead.phone || 'Not provided'}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 13px; color: #64748B;">Project Type:</td>
          <td style="padding: 8px 0; font-size: 14px; color: #F1F5F9; font-weight: 600;">${lead.company || 'General Project Enquiry'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 13px; color: #64748B;">Submitted At:</td>
          <td style="padding: 8px 0; font-size: 13px; color: #94A3B8;">${timestampStr}</td>
        </tr>
      </table>
    </div>

    <!-- Requirements Card -->
    <div style="background-color: #0F172A; border: 1px solid #1E293B; border-radius: 8px; padding: 20px;" class="card-box">
      <h3 style="margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #2BBAA5; font-weight: 700;">
        📝 Project Scope & Message
      </h3>
      <div style="font-size: 14px; line-height: 1.6; color: #E2E8F0; white-space: pre-wrap; word-break: break-word;">${lead.requirements || 'No message content provided.'}</div>
    </div>

    ${historyHtml}
  `;

  const htmlEmail = renderBrandedEmailTemplate({
    title: `New Project Enquiry from ${lead.name}`,
    subtitle: `Received via website contact form on ${timestampStr}`,
    badgeText: "NEW ENQUIRY",
    preheaderText: `New project enquiry from ${lead.name} (${lead.email})`,
    contentHtml,
    ctaText: `Reply to ${lead.name}`,
    ctaUrl: `mailto:${lead.email}?subject=Re:%20loopCode%20Labs%20Project%20Enquiry%20-%20${encodeURIComponent(lead.name)}`
  });

  const textEmail = `
New Project Enquiry Received - loopCode Labs

Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone || 'Not provided'}
Project Type: ${lead.company || 'General Enquiry'}
Submitted At: ${timestampStr}

Message:
${lead.requirements || 'No message provided'}
  `.trim();

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to: notificationRecipient,
      replyTo: lead.email,
      subject: `🚀 New Project Enquiry: ${lead.name} (${lead.company || 'Web App'})`,
      text: textEmail,
      html: htmlEmail
    });

    console.log(`[EmailService] Internal enquiry email successfully sent to ${notificationRecipient}. MessageID: ${info.messageId}`);
    return { success: true, messageId: info.messageId, leadStored: true };
  } catch (err: any) {
    console.error(`[EmailService] Internal enquiry email failed:`, err);
    return { success: false, error: err.message, leadStored: true };
  }
}

/**
 * Sends a customer auto-acknowledgement email from hello@loopcodelabs.in to the client.
 */
export async function sendCustomerConfirmationEmail(lead: LeadEmailPayload): Promise<SendEmailResult> {
  const fromAddress = process.env.SMTP_FROM || `"loopCode Labs" <${process.env.SMTP_USER || "hello@loopcodelabs.in"}>`;
  const transporter = getTransporter();

  if (!transporter) {
    return {
      success: false,
      reason: "SMTP credentials not configured. Customer confirmation email skipped.",
      leadStored: true
    };
  }

  const contentHtml = `
    <p style="margin: 0 0 16px 0; font-size: 16px; color: #FFFFFF; font-weight: 600;">
      Hi ${lead.name},
    </p>

    <p style="margin: 0 0 20px 0; color: #CBD5E1; font-size: 15px; line-height: 1.6;">
      Thank you for reaching out to <strong>loopCode Labs</strong>! We have received your project details and our engineering team is already reviewing your requirements.
    </p>

    <!-- Submitted Details Summary -->
    <div style="background-color: #0F172A; border: 1px solid #1E293B; border-radius: 8px; padding: 20px; margin-bottom: 24px;" class="card-box">
      <h3 style="margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #2BBAA5; font-weight: 700;">
        📋 Summary of Your Submission
      </h3>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #64748B; width: 120px;">Project Type:</td>
          <td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #FFFFFF;">${lead.company || 'Custom Development'}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #64748B;">Contact Email:</td>
          <td style="padding: 6px 0; font-size: 14px; color: #38BDF8;">${lead.email}</td>
        </tr>
        ${
          lead.phone
            ? `<tr>
                <td style="padding: 6px 0; font-size: 13px; color: #64748B;">Phone:</td>
                <td style="padding: 6px 0; font-size: 14px; color: #CBD5E1;">${lead.phone}</td>
               </tr>`
            : ""
        }
      </table>
      ${
        lead.requirements
          ? `
        <div style="border-top: 1px solid #1E293B; margin-top: 12px; padding-top: 12px; font-size: 13px; color: #94A3B8; line-height: 1.5; white-space: pre-wrap;">
          "${lead.requirements}"
        </div>`
          : ""
      }
    </div>

    <!-- Next Steps Cards -->
    <div style="background-color: rgba(43, 186, 165, 0.05); border: 1px solid rgba(43, 186, 165, 0.2); border-radius: 8px; padding: 20px; margin-bottom: 24px;">
      <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #2BBAA5;">
        ⚡ What happens next?
      </h4>
      <ol style="margin: 0; padding-left: 20px; font-size: 14px; color: #CBD5E1; line-height: 1.7;">
        <li>Our technical architect will analyze your project scope.</li>
        <li>We will schedule a discovery session or send a detailed technical estimation within <strong>24 hours</strong>.</li>
      </ol>
    </div>

    <p style="margin: 0; color: #94A3B8; font-size: 14px; line-height: 1.5;">
      If you have additional files or urgent details to share, simply reply directly to this email.
    </p>
  `;

  const htmlEmail = renderBrandedEmailTemplate({
    title: "We've Received Your Project Enquiry",
    subtitle: "Thank you for getting in touch with loopCode Labs",
    badgeText: "CONFIRMATION RECEIPT",
    preheaderText: `Hi ${lead.name}, we have received your project enquiry and our team will get back to you shortly.`,
    contentHtml,
    ctaText: "Explore loopCode Labs Services",
    ctaUrl: "https://loopcodelabs.in/#services"
  });

  const textEmail = `
Hi ${lead.name},

Thank you for reaching out to loopCode Labs! We have received your project enquiry and our team is already reviewing your requirements.

We will get back to you within 24 hours with next steps.

Best regards,
loopCode Labs Engineering Team
hello@loopcodelabs.in
https://loopcodelabs.in
  `.trim();

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to: lead.email,
      replyTo: "hello@loopcodelabs.in",
      subject: `We've received your enquiry - loopCode Labs`,
      text: textEmail,
      html: htmlEmail
    });

    console.log(`[EmailService] Customer confirmation email sent to ${lead.email}. MessageID: ${info.messageId}`);
    return { success: true, messageId: info.messageId, leadStored: true };
  } catch (err: any) {
    console.error(`[EmailService] Customer confirmation email failed:`, err);
    return { success: false, error: err.message, leadStored: true };
  }
}

/**
 * Utility to send any generic branded email from hello@loopcodelabs.in
 */
export async function sendBrandedEmail(options: BrandedEmailOptions): Promise<SendEmailResult> {
  const fromAddress = process.env.SMTP_FROM || `"loopCode Labs" <${process.env.SMTP_USER || "hello@loopcodelabs.in"}>`;
  const transporter = getTransporter();

  if (!transporter) {
    return {
      success: false,
      reason: "SMTP credentials missing in environment variables.",
      leadStored: false
    };
  }

  const htmlContent = renderBrandedEmailTemplate({
    title: options.title,
    subtitle: options.subtitle,
    badgeText: options.badgeText || "LOOPCODE LABS",
    preheaderText: options.preheaderText || options.title,
    contentHtml: options.contentHtml,
    ctaText: options.ctaText,
    ctaUrl: options.ctaUrl
  });

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to: options.to,
      replyTo: options.replyTo || "hello@loopcodelabs.in",
      subject: options.subject,
      html: htmlContent
    });

    return { success: true, messageId: info.messageId, leadStored: false };
  } catch (err: any) {
    return { success: false, error: err.message, leadStored: false };
  }
}
