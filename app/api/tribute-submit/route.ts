/**
 * POST /api/tribute-submit
 *
 * Forwards multipart form data to the Netlify-hosted form handler so local
 * `next dev` works (POST to /netlify-forms.html returns 405 on Next static files).
 *
 * NETLIFY_TRIBUTE_POST_URL — full URL (required for local dev), e.g.
 *   https://your-site.netlify.app/netlify-forms.html
 * If unset, uses Netlify build env URL or DEPLOY_PRIME_URL + /netlify-forms.html.
 */

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function resolveUpstreamFormUrl(): string | null {
  const explicit = process.env.NETLIFY_TRIBUTE_POST_URL?.trim();
  if (explicit) return explicit;

  const base =
    process.env.URL?.trim() || process.env.DEPLOY_PRIME_URL?.trim();
  if (!base) return null;

  const origin = base.replace(/\/$/, "");
  return `${origin}/netlify-forms.html`;
}

export async function POST(request: Request) {
  const upstream = resolveUpstreamFormUrl();
  if (!upstream) {
    return NextResponse.json(
      {
        error:
          "Tribute form proxy not configured. Set NETLIFY_TRIBUTE_POST_URL in .env.local (full URL to netlify-forms.html on your deployed site).",
      },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Expected multipart form data." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(upstream, {
      method: "POST",
      body: formData,
    });

    return new NextResponse(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("tribute-submit proxy failed:", err);
    return NextResponse.json(
      { error: "Failed to reach Netlify form endpoint." },
      { status: 502 }
    );
  }
}
