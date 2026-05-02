"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Platform = "apple-silicon" | "intel" | "other";

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

function GitHubLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.278 9.521 21.017C9.521 20.782 9.513 20.139 9.508 19.288C6.726 19.891 6.139 17.813 6.139 17.813C5.685 16.651 5.029 16.349 5.029 16.349C4.121 15.724 5.098 15.737 5.098 15.737C6.101 15.807 6.629 16.766 6.629 16.766C7.521 18.293 8.97 17.852 9.539 17.6C9.631 16.944 9.889 16.504 10.175 16.26C7.955 16.013 5.62 15.139 5.62 11.317C5.62 10.222 6.01 9.326 6.649 8.625C6.546 8.378 6.203 7.356 6.747 5.987C6.747 5.987 7.587 5.723 9.497 7.005C10.295 6.788 11.15 6.68 12 6.676C12.85 6.68 13.705 6.788 14.505 7.005C16.413 5.723 17.251 5.987 17.251 5.987C17.797 7.356 17.454 8.378 17.351 8.625C17.992 9.326 18.378 10.222 18.378 11.317C18.378 15.149 16.039 16.01 13.813 16.251C14.172 16.555 14.492 17.153 14.492 18.066C14.492 19.381 14.48 20.436 14.48 21.017C14.48 21.281 14.659 21.586 15.167 21.488C19.138 20.163 22 16.416 22 12C22 6.477 17.523 2 12 2Z" />
    </svg>
  );
}

export default function DownloadButton() {
  const [platform, setPlatform] = useState<Platform>("apple-silicon");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("mac")) {
      // Check for Apple Silicon indicators
      // Note: This is a simplified check; actual detection may vary
      if (
        userAgent.includes("arm") ||
        navigator.platform === "MacIntel" // Modern browsers on M1+ still report MacIntel
      ) {
        setPlatform("apple-silicon");
      } else {
        setPlatform("apple-silicon"); // Default to Apple Silicon for newer Macs
      }
    } else {
      setPlatform("other");
    }
  }, []);

  const downloadLabel =
    platform === "other"
      ? "macOS only — view source on GitHub"
      : platform === "intel"
        ? "Download for Intel Mac"
        : "Download for Apple Silicon";

  const downloadHref =
    platform === "other"
      ? "https://github.com/eimis1990/inzone"
      : platform === "intel"
        ? "/downloads/INZONE-intel.dmg"
        : "/downloads/INZONE-arm64.dmg";

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <motion.a
        href={downloadHref}
        className="btn-press inline-flex items-center gap-2.5 px-6 py-3.5 bg-accent text-accent-on font-semibold rounded-lg transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AppleLogo className="w-5 h-5" />
        <span>{downloadLabel}</span>
      </motion.a>

      <motion.a
        href="https://github.com/eimis1990/inzone"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-3 text-text-dim hover:text-text transition-colors group"
        whileHover={{ x: 4 }}
      >
        <GitHubLogo className="w-5 h-5" />
        <span>View on GitHub</span>
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </motion.a>
    </div>
  );
}
