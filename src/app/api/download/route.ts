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

    // Find the matching mac zip for the requested arch.
    // arm64 zip name contains "arm64-mac.zip" (e.g., INzone-1.0.0-arm64-mac.zip)
    // x64 zip name is "*-mac.zip" but does NOT contain "arm64" (e.g., INzone-1.0.0-mac.zip)
    const wantArm64 = arch === "arm64";
    const asset = release.assets.find((a) => {
      const isMacZip = a.name.endsWith("-mac.zip");
      const isArm64 = a.name.includes("arm64");
      return isMacZip && isArm64 === wantArm64;
    });

    if (!asset) {
      return new Response(`No build found for arch=${arch}`, { status: 404 });
    }

    // Redirect to the actual download URL
    return Response.redirect(asset.browser_download_url, 302);
  } catch (error) {
    console.error("Download API error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
