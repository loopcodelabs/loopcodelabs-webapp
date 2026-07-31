export interface VisitorRecord {
  visitorId: string;
  firstVisit: string;
  lastActivity: string;
  ipAddress: string;
  country: string;
  state: string;
  city: string;
  timeZone: string;
  browser: string;
  browserVersion: string;
  deviceType: "Desktop" | "Mobile" | "Tablet";
  os: string;
  screenResolution: string;
  language: string;
  initialReferrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  landingPage: string;
  currentUrl: string;
  exitPage: string;
  totalSessions: number;
}

export interface SessionRecord {
  sessionId: string;
  visitorId: string;
  startTime: string;
  lastActiveTime: string;
  endTime?: string;
  durationSeconds: number;
  pagesVisited: number;
  landingPage: string;
  exitPage: string;
  trafficSource: "Organic Search" | "Direct" | "Social Media" | "Referral" | "Paid Campaign";
  referrer: string;
  device: string;
  browser: string;
  country: string;
  city: string;
  bounce: boolean;
  pageViews: PageViewRecord[];
}

export interface PageViewRecord {
  id: string;
  sessionId: string;
  visitorId: string;
  pageTitle: string;
  urlPath: string;
  entryTime: string;
  exitTime?: string;
  timeSpentSeconds: number;
  scrollPercentage: number;
  clicksCount: number;
}

export interface EventRecord {
  id: string;
  eventName: string; // e.g. "Hero CTA Click", "WhatsApp Button", "Contact Form Submit", "FAQ Expansion", "Pricing View"
  timestamp: string;
  urlPath: string;
  pageTitle: string;
  visitorId: string;
  sessionId: string;
  metadata?: Record<string, any>;
}

export interface ClickHeatmapPoint {
  id: string;
  urlPath: string;
  elementTag: string;
  elementText: string;
  xRatio: number; // 0 to 1 percentage relative to viewport
  yRatio: number;
  timestamp: string;
}

export interface PerformanceLog {
  id: string;
  pageUrl: string;
  timestamp: string;
  pageLoadTimeMs: number;
  fcpMs: number;
  lcpMs: number;
  ttfbMs: number;
}

export interface LeadJourneyRecord {
  id: string;
  visitorId: string;
  sessionId: string;
  submittedAt: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  requirements?: string;
  browsingHistory: {
    urlPath: string;
    pageTitle: string;
    timeSpentSeconds: number;
    timestamp: string;
  }[];
  eventsTriggered: string[];
}

export interface AnalyticsSummary {
  todayVisitors: number;
  yesterdayVisitors: number;
  thisMonthVisitors: number;
  totalVisitors: number;
  activeVisitorsNow: number;
  returningVisitors: number;
  avgSessionDurationSeconds: number;
  bounceRatePercentage: number;
  conversionRatePercentage: number;
  totalLeads: number;
  consultationRequests: number;
  trafficSources: { name: string; count: number; percentage: number }[];
  topCountries: { country: string; count: number }[];
  topPages: { urlPath: string; pageTitle: string; views: number }[];
  topDevices: { device: string; count: number }[];
  topBrowsers: { browser: string; count: number }[];
  hourlyGraph: { hour: string; count: number }[];
  dailyGraph: { date: string; visitors: number; pageViews: number }[];
}

export interface ThirdPartyIntegrations {
  ga4MeasurementId?: string;
  clarityProjectId?: string;
  metaPixelId?: string;
  searchConsoleToken?: string;
}
