import type { MetadataRoute } from "next";

const SITE_URL = "https://inzone.app";

// Single-page marketing site today. Section anchors live inside `/` and don't
// need separate sitemap entries — but listing the canonical homepage with
// `changeFrequency: weekly` keeps crawlers re-checking after copy refreshes.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
