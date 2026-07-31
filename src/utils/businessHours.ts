import { WhatsAppConfig, WhatsAppConfigType } from "./whatsappConfig";

export interface BusinessStatus {
  isOnline: boolean;
  statusText: string;
  subtext: string;
  badgeColor: string;
}

export function getBusinessStatus(config: WhatsAppConfigType = WhatsAppConfig): BusinessStatus {
  try {
    // Determine current time in the target timezone (e.g., Asia/Kolkata)
    const now = new Date();
    
    // Format current date in target timezone
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: config.businessHours.timezone || "Asia/Kolkata",
      hour12: false,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit"
    });

    const parts = formatter.formatToParts(now);
    let weekdayStr = "";
    let hourNum = 0;
    let minuteNum = 0;

    for (const part of parts) {
      if (part.type === "weekday") weekdayStr = part.value;
      if (part.type === "hour") hourNum = parseInt(part.value, 10);
      if (part.type === "minute") minuteNum = parseInt(part.value, 10);
    }

    // Map weekday string to 1-7 (Mon=1, Tue=2 ... Sun=7)
    const dayMap: Record<string, number> = {
      Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7
    };
    const currentDay = dayMap[weekdayStr] || now.getDay() || 7;

    // Parse config start and end hours
    const [startHour, startMin] = config.businessHours.start.split(":").map(Number);
    const [endHour, endMin] = config.businessHours.end.split(":").map(Number);

    const isWorkingDay = config.businessHours.days.includes(currentDay);
    
    const currentTotalMinutes = hourNum * 60 + minuteNum;
    const startTotalMinutes = startHour * 60 + startMin;
    const endTotalMinutes = endHour * 60 + endMin;

    const isWorkingHours = currentTotalMinutes >= startTotalMinutes && currentTotalMinutes < endTotalMinutes;

    if (isWorkingDay && isWorkingHours) {
      return {
        isOnline: true,
        statusText: "🟢 Online",
        subtext: config.responseTime,
        badgeColor: "bg-emerald-500"
      };
    } else {
      return {
        isOnline: false,
        statusText: "🔴 Offline",
        subtext: config.offlineMessage,
        badgeColor: "bg-rose-500"
      };
    }
  } catch (err) {
    // Fallback if timezone formatting fails
    const localHour = new Date().getHours();
    const localDay = new Date().getDay();
    const isOnline = localDay >= 1 && localDay <= 5 && localHour >= 9 && localHour < 19;

    return {
      isOnline,
      statusText: isOnline ? "🟢 Online" : "🔴 Offline",
      subtext: isOnline ? config.responseTime : config.offlineMessage,
      badgeColor: isOnline ? "bg-emerald-500" : "bg-rose-500"
    };
  }
}
