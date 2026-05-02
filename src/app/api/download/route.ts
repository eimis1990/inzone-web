import { NextRequest } from "next/server";

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  assets: GitHubAsset[];
  tag_name: string;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const arch = url.searchParams.get("arch") ?? "arm64";

  try {
    const response = await fetch(
      "https://api.github.com/repos/eimis1990/inzone/releases/latest",
      {
        next: { revalidate: 600 }, // cache 10 min on Vercel edge
        headers: {
          Accept: "application/vnd.github.v3+json",
          // Add User-Agent to avoid GitHub API rate limiting
          "User-Agent": "INZONE-Website",
        },
      }
    );

    if (!response.ok) {
      console.error("GitHub API error:", response.status, response.statusText);
      return new Response("Failed to fetch release information", {
        status: 502,
      });
    }

    const release: GitHubRelease = await response.json();

    if (!release.assets || release.assets.length === 0) {
      return new Response("No assets found in latest release", { status: 404 });
    }

    // Find the right DMG based on architecture
    // arm64 builds typically have -arm64.dmg suffix
    // x64/Intel builds typically have just .dmg or -x64.dmg
    let asset: GitHubAsset | undefined;

    if (arch === "arm64") {
      // Look for arm64-specific DMG first
      asset = release.assets.find(
        (a) => a.name.endsWith("-arm64.dmg") || a.name.includes("arm64")
      );
    } else {
      // For x64/Intel, look for x64 specific or generic DMG (not arm64)
      asset = release.assets.find(
        (a) =>
          (a.name.endsWith(".dmg") || a.name.endsWith("-x64.dmg")) &&
          !a.name.includes("arm64")
      );
    }

    // Fallback: if no arch-specific DMG found, try to find any DMG
    if (!asset) {
      asset = release.assets.find((a) => a.name.endsWith(".dmg"));
    }

    if (!asset) {
      return new Response(`No DMG found for architecture: ${arch}`, {
        status: 404,
      });
    }

    // Redirect to the actual download URL
    return Response.redirect(asset.browser_download_url, 302);
  } catch (error) {
    console.error("Download API error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
