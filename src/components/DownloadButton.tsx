"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { usePlatform } from "@/lib/usePlatform";

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

function WindowsLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 5.45V10.8H10.2V4.2L3 5.45ZM10.2 19.8L3 18.55V13.2H10.2V19.8ZM11.4 19.95L21 21.45V13.2H11.4V19.95ZM21 2.55L11.4 4.05V10.8H21V2.55Z" />
    </svg>
  );
}

function LinuxLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.738-.348 2.656.145 1.701.945 3.094 2.09 4.143.665.61 1.453 1.043 2.317 1.197 1.726.305 3.567-.38 5.019-1.487.575-.439 1.124-.984 1.668-1.581.543.597 1.092 1.142 1.668 1.581 1.452 1.107 3.293 1.792 5.019 1.487.864-.154 1.652-.587 2.317-1.197 1.145-1.049 1.945-2.442 2.09-4.143.062-.918-.07-1.816-.348-2.656-.589-1.771-1.831-3.47-2.716-4.521-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.056-5.965-3.17-6.298-.165-.013-.325-.021-.48-.021zm-5.783 13.659c-.038.06-.08.118-.127.174-.09.106-.194.208-.314.307-.12.099-.259.19-.417.272-.158.082-.338.146-.539.19-.201.044-.426.066-.675.066-.249 0-.474-.022-.675-.066-.201-.044-.381-.108-.539-.19-.158-.082-.297-.173-.417-.272-.12-.099-.224-.201-.314-.307-.047-.056-.089-.114-.127-.174.038-.06.08-.118.127-.174.09-.106.194-.208.314-.307.12-.099.259-.19.417-.272.158-.082.338-.146.539-.19.201-.044.426-.066.675-.066.249 0 .474.022.675.066.201.044.381.108.539.19.158.082.297.173.417.272.12.099.224.201.314.307.047.056.089.114.127.174zm11.559 0c-.038.06-.08.118-.127.174-.09.106-.194.208-.314.307-.12.099-.259.19-.417.272-.158.082-.338.146-.539.19-.201.044-.426.066-.675.066-.249 0-.474-.022-.675-.066-.201-.044-.381-.108-.539-.19-.158-.082-.297-.173-.417-.272-.12-.099-.224-.201-.314-.307-.047-.056-.089-.114-.127-.174.038-.06.08-.118.127-.174.09-.106.194-.208.314-.307.12-.099.259-.19.417-.272.158-.082.338-.146.539-.19.201-.044.426-.066.675-.066.249 0 .474.022.675.066.201.044.381.108.539.19.158.082.297.173.417.272.12.099.224.201.314.307.047.056.089.114.127.174z" />
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
  const { platform, isAppleSilicon } = usePlatform();
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    // Fetch version on mount
    fetch("/api/version")
      .then((res) => res.json())
      .then((data) => {
        if (data.version) {
          setVersion(data.version);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch version:", err);
      });
  }, []);

  // Windows users
  if (platform === "windows") {
    return (
      <div className="flex flex-col gap-4 max-w-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <motion.a
            href="/api/download?os=win"
            onClick={() => trackEvent.downloadWindows()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-neutral-900 dark:bg-[#fff] text-neutral-50 dark:text-[#0d0d0d] hover:bg-neutral-800 dark:hover:bg-[#ccc] px-8 py-4 font-black text-xs uppercase tracking-widest transition-all transform hover:-translate-y-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <WindowsLogo className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span>Download for Windows</span>
              {version && (
                <span className="text-xs opacity-70">v{version}</span>
              )}
            </div>
          </motion.a>
        </div>

        {/* Windows SmartScreen Warning */}
        <motion.div
          className="relative px-4 py-3.5 rounded-[20px] bg-yellow-500/10 border border-yellow-500/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg
                className="w-5 h-5 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="flex-1 space-y-1.5">
              <h3 className="body-sm font-semibold text-yellow-600">
                Windows SmartScreen Warning Expected
              </h3>
              <p className="body-sm text-ink-muted leading-relaxed">
                Windows will show a "Windows protected your PC" warning because
                INzone is{" "}
                <a
                  href="https://github.com/inzoneapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-accent transition-colors"
                >
                  open-source
                </a>{" "}
                and we don't purchase an Extended Validation (EV) Code Signing
                Certificate ($300-500/year). This warning appears for new,
                unrecognized applications.
              </p>
              <p className="body-sm text-yellow-700 font-medium">
                To install: Click "More info" → "Run anyway"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Linux users
  if (platform === "linux") {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <motion.a
          href="/api/download?os=linux"
          onClick={() => trackEvent.downloadLinux()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-neutral-900 dark:bg-[#fff] text-neutral-50 dark:text-[#0d0d0d] hover:bg-neutral-800 dark:hover:bg-[#ccc] px-8 py-4 font-black text-xs uppercase tracking-widest transition-all transform hover:-translate-y-1"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <LinuxLogo className="w-5 h-5" />
          <div className="flex flex-col items-start">
            <span>Download for Linux</span>
            {version && (
              <span className="text-xs opacity-70">v{version}</span>
            )}
          </div>
        </motion.a>
      </div>
    );
  }

  // macOS users - show both Apple Silicon and Intel options
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      {/* Apple Silicon - Primary */}
      <motion.a
        href="/api/download?os=mac&arch=arm64"
        onClick={() => trackEvent.downloadAppleSilicon()}
        className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 font-black text-xs uppercase tracking-widest transition-all transform hover:-translate-y-1 ${
          isAppleSilicon
            ? "bg-neutral-900 dark:bg-[#fff] text-neutral-50 dark:text-[#0d0d0d] hover:bg-neutral-800 dark:hover:bg-[#ccc]"
            : "border border-neutral-300 dark:border-[#444] bg-neutral-100 dark:bg-[#222] text-neutral-900 dark:text-[#fff] hover:bg-neutral-200 dark:hover:bg-[#333]"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        <AppleLogo className="w-5 h-5" />
        <div className="flex flex-col items-start">
          <span>Download for Apple Silicon</span>
          {version && (
            <span className="text-xs opacity-70">v{version}</span>
          )}
        </div>
      </motion.a>

      {/* Intel Mac - Secondary */}
      <motion.a
        href="/api/download?os=mac&arch=x64"
        onClick={() => trackEvent.downloadIntelMac()}
        className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 font-black text-xs uppercase tracking-widest transition-all transform hover:-translate-y-1 ${
          !isAppleSilicon
            ? "bg-neutral-900 dark:bg-[#fff] text-neutral-50 dark:text-[#0d0d0d] hover:bg-neutral-800 dark:hover:bg-[#ccc]"
            : "border border-neutral-300 dark:border-[#444] bg-neutral-100 dark:bg-[#222] text-neutral-900 dark:text-[#fff] hover:bg-neutral-200 dark:hover:bg-[#333]"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        <ChipIcon className="w-5 h-5" />
        <div className="flex flex-col items-start">
          <span>Download for Intel Mac</span>
          {version && (
            <span className="text-xs opacity-70">v{version}</span>
          )}
        </div>
      </motion.a>
    </div>
  );
}
