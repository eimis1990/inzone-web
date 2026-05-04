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
  const os = url.searchParams.get("os") ?? "mac"; // 'mac' | 'win' | 'linux'
  const arch = url.searchParams.get("arch") ?? "arm64"; // 'arm64' | 'x64' | 'amd64'

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

    // Find the matching asset based on OS and architecture
    let asset: GitHubAsset | undefined;

    if (os === "mac") {
      // Mac: *-mac.zip
      // arm64 zip name contains "arm64-mac.zip" (e.g., INzone-1.0.0-arm64-mac.zip)
      // x64 zip name is "*-mac.zip" but does NOT contain "arm64" (e.g., INzone-1.0.0-mac.zip)
      const wantArm64 = arch === "arm64";
      asset = release.assets.find((a) => {
        const isMacZip = a.name.endsWith("-mac.zip");
        const isArm64 = a.name.includes("arm64");
        return isMacZip && isArm64 === wantArm64;
      });
    } else if (os === "win") {
      // Windows: Prefer *Setup*.exe (installer), fallback to *.exe (portable)
      const setupExe = release.assets.find(
        (a) => a.name.includes("Setup") && a.name.endsWith(".exe")
      );
      const portableExe = release.assets.find(
        (a) => !a.name.includes("Setup") && a.name.endsWith(".exe")
      );
      asset = setupExe || portableExe;
    } else if (os === "linux") {
      // Linux: Prefer *.AppImage, fallback to *.deb
      // Also handle arch if provided (amd64)
      const appImage = release.assets.find((a) => a.name.endsWith(".AppImage"));
      const deb = release.assets.find((a) => a.name.endsWith(".deb"));
      asset = appImage || deb;
    }

    if (!asset) {
      return new Response(`No build found for os=${os}, arch=${arch}`, {
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
