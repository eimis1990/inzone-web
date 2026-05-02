"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elev/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/in-zone-logo.png"
              alt="INZONE"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-display text-xl text-text">INZONE</span>
          </div>

          {/* Copyright */}
          <p className="text-muted text-sm text-center md:text-right">
            {new Date().getFullYear()} INZONE
          </p>
        </div>
      </div>
    </footer>
  );
}
