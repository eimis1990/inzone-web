"use client";

import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Download", href: "#" },
    { label: "Changelog", href: "/changelog" },
    { label: "Roadmap", href: "/roadmap" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Getting started", href: "/docs/getting-started" },
    { label: "Voice setup", href: "/docs/voice" },
  ],
  Community: [
    { label: "GitHub", href: "https://github.com/eimis1990/inzone" },
    { label: "Issues", href: "https://github.com/eimis1990/inzone/issues" },
    { label: "Discussions", href: "https://github.com/eimis1990/inzone/discussions" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "License", href: "/license" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elev/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-text mb-4 text-sm">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-dim hover:text-text transition-colors text-sm link-underline"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-text-dim hover:text-text transition-colors text-sm link-underline"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="font-display text-accent-on text-sm font-bold">
                IZ
              </span>
            </div>
            <span className="font-display text-xl text-text">INZONE</span>
          </div>

          {/* Copyright */}
          <p className="text-muted text-sm text-center md:text-right">
            MIT License · Built with Claude · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
