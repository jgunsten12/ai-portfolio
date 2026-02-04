"use client";

const technologies = [
  "ChatGPT",
  "Claude",
  "Google Gemini",
  "Replit",
  "Lovable",
  "Airtable",
  "Cursor",
  "n8n",
  "Zapier",
  "v0",
  "Clay",
  "Apify",
];

export default function StatsBar() {
  return (
    <section className="py-6 sm:py-8 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />
        
        {/* Scrolling container */}
        <div className="flex animate-scroll">
          {/* First set */}
          <div className="flex shrink-0">
            {technologies.map((tech, index) => (
              <div
                key={`first-${index}`}
                className="flex items-center mx-4 sm:mx-8"
              >
                <span className="text-sm sm:text-base font-medium text-gray-700 whitespace-nowrap">
                  {tech}
                </span>
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex shrink-0">
            {technologies.map((tech, index) => (
              <div
                key={`second-${index}`}
                className="flex items-center mx-4 sm:mx-8"
              >
                <span className="text-sm sm:text-base font-medium text-gray-700 whitespace-nowrap">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
