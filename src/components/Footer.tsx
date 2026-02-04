"use client";

import { profileData } from "@/data/profile";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-gray-500 order-2 md:order-1">
            &copy; {currentYear} {profileData.name}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6 order-1 md:order-2">
            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              LinkedIn
            </a>
            {profileData.githubUrl && (
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                GitHub
              </a>
            )}
            {profileData.email && (
              <a
                href={`mailto:${profileData.email}`}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Email
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
