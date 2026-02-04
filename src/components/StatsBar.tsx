"use client";

import { profileData } from "@/data/profile";

export default function StatsBar() {
  return (
    <section className="py-8 sm:py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {profileData.stats.map((stat, index) => (
            <div key={index} className="text-center md:text-left">
              <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
