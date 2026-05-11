"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Minimal footer - logo + copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/in-zone-logo.png"
              alt="INZONE"
              width={28}
              height={28}
              className="rounded-[6px]"
            />
            <span className="font-display text-lg text-ink">INZONE</span>
          </div>

          {/* Copyright */}
          <p className="caption text-ink-muted">
            {new Date().getFullYear()} INZONE
          </p>
        </div>
      </div>
    </footer>
  );
}
