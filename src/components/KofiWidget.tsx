"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export default function KofiWidget() {
  const isHoveringKofi = useRef(false);

  useEffect(() => {
    // Track Ko-fi clicks using window blur detection
    // When user clicks inside an iframe, the main window loses focus
    const handleWindowBlur = () => {
      if (isHoveringKofi.current) {
        trackEvent.kofiWidgetClick();
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[id^="kofi-floating-chat"]')) {
        isHoveringKofi.current = true;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[id^="kofi-floating-chat"]')) {
        isHoveringKofi.current = false;
      }
    };

    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        div[id^="kofi-floating-chat"] {
          bottom: 20px !important;
          right: 20px !important;
          left: auto !important;
        }
      `}</style>
      <Script
        src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          // @ts-expect-error - Ko-fi widget global
          window.kofiWidgetOverlay?.draw("eimantaskudarauskas", {
            type: "floating-chat",
            "floating-chat.donateButton.text": "Support me",
            "floating-chat.donateButton.background-color": "#E4D947",
            "floating-chat.donateButton.text-color": "#0C0E12",
          });
        }}
      />
    </>
  );
}
