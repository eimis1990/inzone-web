"use client";

import { useEffect, useState } from "react";

export type Platform = "mac" | "windows" | "linux";

export function usePlatform() {
  const [platform, setPlatform] = useState<Platform>("mac");
  const [isAppleSilicon, setIsAppleSilicon] = useState(true);

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Win")) {
      setPlatform("windows");
    } else if (userAgent.includes("Linux")) {
      setPlatform("linux");
    } else if (userAgent.includes("Mac")) {
      setPlatform("mac");

      // Attempt to detect Apple Silicon
      // Note: This is imperfect - Safari on Apple Silicon often reports as Intel
      // We default to Apple Silicon since most new Macs are M-series
      const isLikelyAppleSilicon =
        /Macintosh.*Apple/i.test(userAgent) ||
        // @ts-expect-error - userAgentData is not in all browsers
        navigator.userAgentData?.platform === "macOS";

      setIsAppleSilicon(isLikelyAppleSilicon);
    }
  }, []);

  return { platform, isAppleSilicon };
}
