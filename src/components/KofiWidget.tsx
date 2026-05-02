"use client";

import Script from "next/script";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function KofiWidget() {
  useEffect(() => {
    // Track Ko-fi widget interactions when the floating button is clicked
    const handleKofiClick = () => {
      trackEvent.kofiWidgetClick();
    };

    // Add listener with a delay to ensure Ko-fi widget is loaded
    const timer = setTimeout(() => {
      const kofiButton = document.querySelector('[id^="kofi-floating-chat"]');
      if (kofiButton) {
        kofiButton.addEventListener("click", handleKofiClick);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      const kofiButton = document.querySelector('[id^="kofi-floating-chat"]');
      if (kofiButton) {
        kofiButton.removeEventListener("click", handleKofiClick);
      }
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
