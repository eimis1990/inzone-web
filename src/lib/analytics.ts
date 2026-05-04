import { track } from "@vercel/analytics";

/**
 * Track custom events in Vercel Analytics
 */

export const trackEvent = {
  // Download button clicks
  downloadAppleSilicon: () => {
    track("download_apple_silicon");
  },

  downloadIntelMac: () => {
    track("download_intel_mac");
  },

  downloadWindows: () => {
    track("download_windows");
  },

  downloadLinux: () => {
    track("download_linux");
  },

  // Ko-fi widget interactions
  kofiWidgetClick: () => {
    track("kofi_widget_click");
  },

  // General CTA interactions
  ctaClick: (location: "hero" | "final") => {
    track("cta_click", { location });
  },
};
