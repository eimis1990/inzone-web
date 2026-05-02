import type { Metadata, Viewport } from "next";
import { Squada_One, Inter, JetBrains_Mono } from "next/font/google";
import KofiWidget from "@/components/KofiWidget";
import "./globals.css";

const squadaOne = Squada_One({
  weight: "400",
  variable: "--font-squada-one",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0C0E12",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "INZONE — Multiple Claude agents. One window.",
  description:
    "A macOS cockpit for orchestrating multiple Claude Agent SDK sessions side-by-side. Multi-pane workspace, Flow pipelines, in-app PR.",
  keywords: [
    "Claude",
    "AI agents",
    "macOS",
    "IDE",
    "Claude Code",
    "AI coding",
    "multi-agent",
    "developer tools",
  ],
  authors: [{ name: "INZONE" }],
  creator: "INZONE",
  publisher: "INZONE",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inzone.app",
    siteName: "INZONE",
    title: "INZONE — Multiple Claude agents. One window.",
    description:
      "A macOS cockpit for orchestrating multiple Claude Agent SDK sessions side-by-side. Multi-pane workspace, Flow pipelines, in-app PR.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "INZONE - Run a fleet of AI agents from one window",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INZONE — Multiple Claude agents. One window.",
    description:
      "A macOS cockpit for orchestrating multiple Claude Agent SDK sessions side-by-side.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${squadaOne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "INZONE",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "macOS",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description:
                "A macOS app for orchestrating multiple Claude Agent SDK sessions in a single window.",
              softwareVersion: "1.0",
              author: {
                "@type": "Organization",
                name: "INZONE",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-bg text-text antialiased">
        {children}
        <KofiWidget />
      </body>
    </html>
  );
}
