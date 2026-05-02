"use client";

import Script from "next/script";

export default function KofiWidget() {
  return (
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
  );
}
