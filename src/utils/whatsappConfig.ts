export interface BusinessHoursConfig {
  start: string; // "09:00"
  end: string;   // "19:00"
  days: number[]; // 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri
  timezone: string; // "Asia/Kolkata"
}

export interface WhatsAppConfigType {
  phone: string;
  businessName: string;
  responseTime: string;
  offlineMessage: string;
  businessHours: BusinessHoursConfig;
  servicesList: string[];
}

export const WhatsAppConfig: WhatsAppConfigType = {
  phone: "916305178805",
  businessName: "LoopCodeLabs",
  responseTime: "Typically replies within 15 minutes",
  offlineMessage: "We'll reply during business hours.",
  businessHours: {
    start: "09:00",
    end: "19:00",
    days: [1, 2, 3, 4, 5], // Monday through Friday
    timezone: "Asia/Kolkata"
  },
  servicesList: [
    "Website Development",
    "AI Applications",
    "Business Automation",
    "Mobile Apps",
    "SEO & Digital Solutions"
  ]
};
