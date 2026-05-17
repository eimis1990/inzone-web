import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Squada_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

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

const squadaOne = Squada_One({
  variable: "--font-squada-one",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "INZONE — The Multi-Agent Workspace",
  description:
    "Delegate, don't micromanage. INZONE is a sequential agent pipeline environment with worktrees, layout panes, and built-in visual diff reviews.",
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
    title: "INZONE — The Multi-Agent Workspace",
    description:
      "Delegate, don't micromanage. INZONE is a sequential agent pipeline environment with worktrees, layout panes, and built-in visual diff reviews.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "INZONE - The Multi-Agent Workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INZONE — The Multi-Agent Workspace",
    description:
      "Delegate, don't micromanage. INZONE is a sequential agent pipeline environment with worktrees, layout panes, and built-in visual diff reviews.",
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
      className={`dark ${inter.variable} ${jetbrainsMono.variable} ${squadaOne.variable}`}
      suppressHydrationWarning
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
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
