import { NextResponse } from "next/server";

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
}

export async function GET() {
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
      return NextResponse.json(
        { error: "Failed to fetch version information" },
        { status: 502 }
      );
    }

    const release: GitHubRelease = await response.json();

    // Remove 'v' prefix if present (e.g., "v1.0.1" -> "1.0.1")
    const version = release.tag_name.replace(/^v/, "");

    return NextResponse.json({
      version,
      tag: release.tag_name,
      name: release.name,
      publishedAt: release.published_at,
    });
  } catch (error) {
    console.error("Version API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
