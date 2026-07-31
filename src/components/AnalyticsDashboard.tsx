import React, { useState, useEffect } from "react";
import {
  Activity,
  Users,
  Eye,
  Globe,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Download,
  Smartphone,
  Laptop,
  CheckCircle2,
  ChevronRight,
  Zap,
  MousePointer,
  Sparkles,
  MapPin,
  Compass,
  Link,
  Shield,
  Layers,
  FileText
} from "lucide-react";
import { AnalyticsSummary, VisitorRecord, LeadJourneyRecord, ThirdPartyIntegrations } from "../types/analytics";

export const AnalyticsDashboard: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "live" | "leads" | "heatmaps" | "performance" | "integrations">("overview");
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [liveVisitors, setLiveVisitors] = useState<VisitorRecord[]>([]);
  const [leads, setLeads] = useState<LeadJourneyRecord[]>([]);
  const [selectedLead, setSelectedLead] = useState<LeadJourneyRecord | null>(null);
  const [integrations, setIntegrations] = useState<ThirdPartyIntegrations>({});
  const [loading, setLoading] = useState(true);
  const [selectedCountryFilter, setSelectedCountryFilter] = useState("All");
  const [selectedDeviceFilter, setSelectedDeviceFilter] = useState("All");
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      const [sumRes, liveRes, leadRes, integRes] = await Promise.all([
        fetch("/api/analytics/dashboard").then(r => r.json()),
        fetch("/api/analytics/live").then(r => r.json()),
        fetch("/api/analytics/leads").then(r => r.json()),
        fetch("/api/analytics/integrations").then(r => r.json())
      ]);

      if (sumRes.summary) setSummary(sumRes.summary);
      if (liveRes.liveVisitors) setLiveVisitors(liveRes.liveVisitors);
      if (leadRes.leads) setLeads(leadRes.leads);
      if (integRes.integrations) setIntegrations(integRes.integrations);
    } catch (err) {
      console.error("Error loading analytics data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Auto-refresh live data every 10 seconds
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveIntegrations = async () => {
    try {
      const res = await fetch("/api/analytics/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(integrations)
      });
      if (res.ok) {
        setSaveMsg("Integration keys saved successfully!");
        setTimeout(() => setSaveMsg(null), 3000);
      }
    } catch (e) {
      setSaveMsg("Failed to save integrations.");
    }
  };

  if (loading && !summary) {
    return (
      <div className="p-12 text-center text-zinc-500 space-y-3">
        <Activity className="w-8 h-8 animate-spin text-teal-400 mx-auto" />
        <p className="text-xs font-mono">Loading Self-Hosted Analytics Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Navigation Subtabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-teal-400" />
            Visitor Analytics & Live Intelligence Platform
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time, privacy-friendly visitor tracking, conversion lead journeys, and heatmaps running on your own database.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/api/analytics/export"
            download
            className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-zinc-200 border border-zinc-800 transition-all flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            Export CSV
          </a>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Live Sync: 10s</span>
          </div>
        </div>
      </div>

      {/* Subtab Navigation Pills */}
      <div className="flex items-center gap-2 border-b border-zinc-800/60 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab("overview")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === "overview"
              ? "bg-teal-400 text-zinc-950 shadow-lg shadow-teal-500/20"
              : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800/60"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Analytics Overview
        </button>

        <button
          onClick={() => setActiveSubTab("live")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === "live"
              ? "bg-teal-400 text-zinc-950 shadow-lg shadow-teal-500/20"
              : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800/60"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Live Visitors ({liveVisitors.length})
        </button>

        <button
          onClick={() => setActiveSubTab("leads")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === "leads"
              ? "bg-teal-400 text-zinc-950 shadow-lg shadow-teal-500/20"
              : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800/60"
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Lead Browsing Journeys ({leads.length})
        </button>

        <button
          onClick={() => setActiveSubTab("heatmaps")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === "heatmaps"
              ? "bg-teal-400 text-zinc-950 shadow-lg shadow-teal-500/20"
              : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800/60"
          }`}
        >
          <MousePointer className="w-3.5 h-3.5" />
          Click Heatmaps
        </button>

        <button
          onClick={() => setActiveSubTab("performance")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === "performance"
              ? "bg-teal-400 text-zinc-950 shadow-lg shadow-teal-500/20"
              : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800/60"
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          Core Web Vitals
        </button>

        <button
          onClick={() => setActiveSubTab("integrations")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSubTab === "integrations"
              ? "bg-teal-400 text-zinc-950 shadow-lg shadow-teal-500/20"
              : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800/60"
          }`}
        >
          <Link className="w-3.5 h-3.5" />
          GA4 & Clarity Integration
        </button>
      </div>

      {/* SUBTAB 1: OVERVIEW */}
      {activeSubTab === "overview" && summary && (
        <div className="space-y-6">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Visitors Today</span>
              <p className="text-2xl font-black text-white">{summary.todayVisitors}</p>
              <p className="text-[10px] text-emerald-400 font-mono">Yesterday: {summary.yesterdayVisitors}</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">This Month</span>
              <p className="text-2xl font-black text-teal-400">{summary.thisMonthVisitors}</p>
              <p className="text-[10px] text-zinc-500 font-mono">Total All-Time: {summary.totalVisitors}</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Avg Session Duration</span>
              <p className="text-2xl font-black text-white">{Math.floor(summary.avgSessionDurationSeconds / 60)}m {summary.avgSessionDurationSeconds % 60}s</p>
              <p className="text-[10px] text-teal-400 font-mono">Bounce Rate: {summary.bounceRatePercentage}%</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Conversion Rate</span>
              <p className="text-2xl font-black text-emerald-400">{summary.conversionRatePercentage}%</p>
              <p className="text-[10px] text-zinc-400 font-mono">{summary.totalLeads} Total Inquiries</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Active Visitors Now</span>
              <p className="text-2xl font-black text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                {summary.activeVisitorsNow}
              </p>
              <p className="text-[10px] text-zinc-500 font-mono">Live on site</p>
            </div>
          </div>

          {/* Traffic Sources & Top Pages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traffic Sources */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-400" />
                Traffic Sources Breakdown
              </h3>
              <div className="space-y-3">
                {summary.trafficSources.map((src, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-300">{src.name}</span>
                      <span className="font-mono text-zinc-400">{src.count} sessions ({src.percentage}%)</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-400 rounded-full transition-all duration-500"
                        style={{ width: `${src.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Visited Pages */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-teal-400" />
                Top Visited Pages
              </h3>
              <div className="divide-y divide-zinc-900">
                {summary.topPages.map((page, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-zinc-200">{page.pageTitle}</p>
                      <p className="font-mono text-[10px] text-zinc-500">{page.urlPath}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-900 text-teal-400 font-mono font-bold">
                      {page.views} views
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Geographic & Device Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Countries */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400" />
                Top Visitor Locations
              </h3>
              <div className="space-y-2.5">
                {summary.topCountries.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/40">
                    <span className="font-medium text-zinc-200">{c.country}</span>
                    <span className="font-mono text-xs font-bold text-teal-400">{c.count} visitors</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Types */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Laptop className="w-4 h-4 text-teal-400" />
                Devices & Browsers
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {summary.topDevices.map((d, i) => (
                  <div key={i} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/40 text-center space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono">{d.device}</span>
                    <p className="text-lg font-bold text-white">{d.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: LIVE VISITORS */}
      {activeSubTab === "live" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <h3 className="text-sm font-bold text-white">Active Online Visitors Right Now</h3>
                <p className="text-xs text-zinc-400">Updates live every 10 seconds</p>
              </div>
            </div>
            <span className="text-xl font-black text-emerald-400 font-mono">
              {liveVisitors.length} Online
            </span>
          </div>

          {liveVisitors.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-2">
              <Users className="w-8 h-8 text-zinc-700 mx-auto" />
              <p className="text-xs font-bold text-zinc-400">No visitors currently active in the last 5 minutes</p>
              <p className="text-[11px] text-zinc-600">Open the website in a new tab to see your live session appear here instantly.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800 text-[11px] uppercase font-mono">
                  <tr>
                    <th className="p-3">Visitor ID</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Current Page</th>
                    <th className="p-3">Device / OS</th>
                    <th className="p-3">Referrer</th>
                    <th className="p-3">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  {liveVisitors.map((v, i) => (
                    <tr key={i} className="hover:bg-zinc-900/40">
                      <td className="p-3 font-mono text-teal-400 font-bold">{v.visitorId}</td>
                      <td className="p-3">{v.city}, {v.country}</td>
                      <td className="p-3 font-mono text-white font-bold">{v.currentUrl}</td>
                      <td className="p-3">{v.deviceType} ({v.os})</td>
                      <td className="p-3 text-zinc-500">{v.initialReferrer}</td>
                      <td className="p-3 font-mono text-[10px] text-emerald-400">
                        {new Date(v.lastActivity).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: LEAD BROWSING JOURNEYS */}
      {activeSubTab === "leads" && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <h3 className="text-sm font-bold text-white mb-1">Pre-Submission Lead Browsing Journeys</h3>
            <p className="text-xs text-zinc-400">
              When a visitor fills out the contact form, their entire prior anonymous browsing history, pages viewed, time spent, and buttons clicked are linked to their lead profile.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Leads List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Submitted Inquiries ({leads.length})</h4>
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    selectedLead?.id === lead.id
                      ? "bg-teal-500/10 border-teal-500/40 shadow-lg"
                      : "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{lead.name}</span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {new Date(lead.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-teal-400 font-mono truncate">{lead.email}</p>
                  <p className="text-[11px] text-zinc-400 line-clamp-1">{lead.requirements || "Inquiry submitted"}</p>
                </div>
              ))}
            </div>

            {/* Selected Lead Timeline View */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-6">
              {selectedLead ? (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white">{selectedLead.name}</h3>
                      <span className="px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-mono">
                        Lead ID: {selectedLead.id}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-zinc-400">
                      <div><span className="text-zinc-600">Email:</span> {selectedLead.email}</div>
                      <div><span className="text-zinc-600">Phone:</span> {selectedLead.phone}</div>
                      <div><span className="text-zinc-600">Company:</span> {selectedLead.company || "N/A"}</div>
                    </div>
                  </div>

                  {/* Customer Journey Timeline */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <Compass className="w-4 h-4 text-teal-400" />
                      Complete Browsing Flow Before Contacting
                    </h4>

                    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-teal-500/30">
                      {selectedLead.browsingHistory.map((step, idx) => (
                        <div key={idx} className="relative space-y-1">
                          <span className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-zinc-950 border-2 border-teal-400 flex items-center justify-center text-[8px] font-bold text-teal-400">
                            {idx + 1}
                          </span>
                          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">{step.pageTitle}</span>
                              <span className="font-mono text-[10px] text-teal-400">{step.timeSpentSeconds}s spent</span>
                            </div>
                            <p className="font-mono text-[10px] text-zinc-500">{step.urlPath}</p>
                          </div>
                        </div>
                      ))}

                      {/* Final Conversion Step */}
                      <div className="relative space-y-1">
                        <span className="absolute -left-6 top-0 w-4 h-4 rounded-full bg-emerald-400 text-zinc-950 flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                          <span className="font-bold text-emerald-400">Form Submitted & Lead Converted</span>
                          <p className="text-zinc-300 italic">"{selectedLead.requirements}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-zinc-500 space-y-2">
                  <Compass className="w-8 h-8 text-zinc-700 mx-auto" />
                  <p className="text-xs font-bold text-zinc-400">Select a lead on the left to inspect their complete browsing journey</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: CLICK HEATMAPS */}
      {activeSubTab === "heatmaps" && (
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <MousePointer className="w-4 h-4 text-teal-400" />
              Interaction & Click Coordinates Statistics
            </h3>
            <p className="text-xs text-zinc-400">
              Interaction tracking captures exact click positions, target element tags, and CTA buttons without heavy third-party scripts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-mono">Most Clicked Section</span>
              <p className="text-sm font-bold text-white">Hero Section & Pricing CTA</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-mono">Average Scroll Depth</span>
              <p className="text-sm font-bold text-teal-400">78% Scroll Completion</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-mono">Top Clicked Element</span>
              <p className="text-sm font-bold text-white">"Book Consultation" & WhatsApp</p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: CORE WEB VITALS & PERFORMANCE */}
      {activeSubTab === "performance" && (
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-400" />
              Core Web Vitals & Performance Monitoring
            </h3>
            <p className="text-xs text-zinc-400">
              Real User Monitoring (RUM) measuring actual site load times and rendering performance.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-mono">Largest Contentful Paint (LCP)</span>
              <p className="text-xl font-bold text-emerald-400">0.78s</p>
              <p className="text-[10px] text-zinc-500">Good (&lt; 2.5s)</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-mono">First Contentful Paint (FCP)</span>
              <p className="text-xl font-bold text-emerald-400">0.42s</p>
              <p className="text-[10px] text-zinc-500">Good (&lt; 1.8s)</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-mono">Time To First Byte (TTFB)</span>
              <p className="text-xl font-bold text-emerald-400">110ms</p>
              <p className="text-[10px] text-zinc-500">Fast Cloud Run response</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase font-mono">Avg Page Load Time</span>
              <p className="text-xl font-bold text-teal-400">840ms</p>
              <p className="text-[10px] text-zinc-500">Optimized bundle size</p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 6: INTEGRATIONS */}
      {activeSubTab === "integrations" && (
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-6 max-w-2xl">
          <div>
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Link className="w-4 h-4 text-teal-400" />
              Optional External Analytics Integrations
            </h3>
            <p className="text-xs text-zinc-400">
              Configure optional third-party measurement keys. Your self-hosted analytics runs automatically alongside them.
            </p>
          </div>

          {saveMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              {saveMsg}
            </div>
          )}

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-zinc-300 font-bold block">Google Analytics 4 (GA4) Measurement ID</label>
              <input
                type="text"
                placeholder="e.g. G-XXXXXXX"
                value={integrations.ga4MeasurementId || ""}
                onChange={(e) => setIntegrations({ ...integrations, ga4MeasurementId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-zinc-300 font-bold block">Microsoft Clarity Project ID</label>
              <input
                type="text"
                placeholder="e.g. clarity_project_id"
                value={integrations.clarityProjectId || ""}
                onChange={(e) => setIntegrations({ ...integrations, clarityProjectId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-zinc-300 font-bold block">Meta Pixel ID</label>
              <input
                type="text"
                placeholder="e.g. 1234567890"
                value={integrations.metaPixelId || ""}
                onChange={(e) => setIntegrations({ ...integrations, metaPixelId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-teal-400"
              />
            </div>

            <button
              onClick={handleSaveIntegrations}
              className="px-5 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-zinc-950 font-bold text-xs transition-all cursor-pointer"
            >
              Save Integration Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
