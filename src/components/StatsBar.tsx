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
      {/* Section Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Fluent In
        </h2>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />
        
        {/* Scrolling container */}
        <div className="flex animate-scroll">
          {/* Render 4 sets for seamless infinite loop */}
          {[0, 1, 2, 3].map((setIndex) => (
            <div key={setIndex} className="flex shrink-0">
              {technologies.map((tech, index) => (
                <div
                  key={`${setIndex}-${index}`}
                  className="flex items-center mx-4 sm:mx-8"
                >
                  <span className="text-sm sm:text-base font-medium text-gray-700 whitespace-nowrap">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
