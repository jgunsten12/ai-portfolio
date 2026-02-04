"use client";

import { useState, useEffect } from "react";

// Change this to your own secret key
const ADMIN_SECRET = "jackadmin2024";

export function useAdminMode() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check URL for admin parameter
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get("admin");

    if (adminParam === ADMIN_SECRET) {
      // Enable admin mode and save to localStorage
      localStorage.setItem("portfolioAdminMode", "true");
      setIsAdmin(true);
      // Clean up URL
      params.delete("admin");
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    } else if (adminParam === "logout") {
      // Disable admin mode
      localStorage.removeItem("portfolioAdminMode");
      setIsAdmin(false);
      // Clean up URL
      params.delete("admin");
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    } else {
      // Check localStorage for existing admin session
      const storedAdmin = localStorage.getItem("portfolioAdminMode");
      setIsAdmin(storedAdmin === "true");
    }

    setIsLoaded(true);
  }, []);

  return { isAdmin, isLoaded };
}
