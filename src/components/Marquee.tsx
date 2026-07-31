export default function Marquee() {
  const services = [
    "Website Development",
    "Mobile App Development",
    "UI/UX Design",
    "Branding & Strategy",
    "SEO Services",
    "Digital Marketing",
    "Paid Advertising",
    "Email Marketing",
    "Lead Generation Automation",
    "Marketing Automation",
    "AI Automation Solutions",
    "CRM & Workflow Automation",
    "AI Chatbots & Virtual Assistants",
    "AI Voice Agents",
    "Document Processing Automation",
    "AI Business Consulting",
    "Custom AI Applications",
    "AI Analytics & Business Intelligence",
    "Enterprise AI Integration",
    "AI Product Development",
  ];

  return (
    <section className="py-8 bg-transparent overflow-hidden relative select-none">
      <div className="flex overflow-hidden whitespace-nowrap">
        {/* Infinite loop tracks */}
        <div className="animate-marquee flex items-center gap-8 text-2xl md:text-3xl font-black tracking-tight text-zinc-800 uppercase">
          {[...Array(4)].map((_, listIdx) => (
            <div key={listIdx} className="flex items-center gap-8 pr-8">
              {services.map((item, itemIdx) => (
                <div key={itemIdx} className="flex items-center gap-8 shrink-0">
                  <span className="hover:text-white transition-colors duration-300">{item}</span>
                  <span className="text-accent font-light">+</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
