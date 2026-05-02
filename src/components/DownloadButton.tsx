"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

type Platform = "mac" | "other";

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
    </svg>
  );
}

function ChipIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  );
}

export default function DownloadButton() {
  const [platform, setPlatform] = useState<Platform>("mac");
  const [isAppleSilicon, setIsAppleSilicon] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent;

    // Check if macOS
    if (!userAgent.includes("Mac")) {
      setPlatform("other");
      return;
    }

    // Attempt to detect Apple Silicon
    // Note: This is imperfect - Safari on Apple Silicon often reports as Intel
    // We default to Apple Silicon since most new Macs are M-series
    const isLikelyAppleSilicon =
      /Macintosh.*Apple/i.test(userAgent) ||
      // @ts-expect-error - userAgentData is not in all browsers
      navigator.userAgentData?.platform === "macOS";

    setIsAppleSilicon(isLikelyAppleSilicon);
  }, []);

  // Non-macOS users
  if (platform === "other") {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-bg-elev-2 text-text-dim font-semibold rounded-lg border border-border">
          <AppleLogo className="w-5 h-5" />
          <span>macOS only</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      {/* Apple Silicon - Primary */}
      <motion.a
        href="/api/download?arch=arm64"
        onClick={() => trackEvent.downloadAppleSilicon()}
        className={`btn-press inline-flex items-center gap-2.5 px-6 py-3.5 font-semibold rounded-lg transition-all ${
          isAppleSilicon
            ? "bg-accent text-accent-on hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
            : "bg-bg-elev text-text border border-border hover:border-accent/50"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AppleLogo className="w-5 h-5" />
        <span>Download for Apple Silicon</span>
      </motion.a>

      {/* Intel Mac - Secondary */}
      <motion.a
        href="/api/download?arch=x64"
        onClick={() => trackEvent.downloadIntelMac()}
        className={`btn-press inline-flex items-center gap-2.5 px-6 py-3.5 font-semibold rounded-lg transition-all ${
          !isAppleSilicon
            ? "bg-accent text-accent-on hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
            : "bg-bg-elev text-text border border-border hover:border-accent/50"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ChipIcon className="w-5 h-5" />
        <span>Download for Intel Mac</span>
      </motion.a>
    </div>
  );
}
