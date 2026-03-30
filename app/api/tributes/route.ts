/**
 * GET /api/tributes
 *
 * Returns public tributes from Netlify Forms (verified submissions only).
 * Moderation: delete or mark spam in Netlify — removed submissions no longer appear.
 *
 * Environment (set in .env.local and Netlify site env):
 *   NETLIFY_AUTH_TOKEN — Personal access token (User settings → Applications)
 *   NETLIFY_SITE_ID    — Site / API ID (Site configuration → General)
 *   NETLIFY_FORM_ID    — Optional; if omitted, resolves the form named "tribute"
 *
 * Optional:
 *   NETLIFY_MERGE_STATIC_SEED — set to "1" or "true" to append entries from
 *                               data/approvedTributes.ts after Netlify rows (migration only).
 */

import { NextResponse } from "next/server";
import {
  approvedTributes,
  type ApprovedTribute,
} from "@/data/approvedTributes";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const API = "https://api.netlify.com/api/v1";
const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" } as const;

function jsonNoStore(data: unknown) {
  return NextResponse.json(data, { headers: NO_STORE_HEADERS });
}

function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function netlifyHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    "User-Agent": "TerryBellMemorial/1.0",
  };
}

type NetlifyFormMeta = { id: string; name: string };
type NetlifySubmission = {
  id: string;
  created_at?: string;
  name?: string | null;
  body?: string | null;
  summary?: string | null;
  data?: Record<string, string | undefined>;
};

async function resolveFormId(
  token: string,
  siteId: string,
  explicitFormId: string | undefined
): Promise<string | null> {
  if (explicitFormId?.trim()) return explicitFormId.trim();

  const res = await fetch(`${API}/sites/${siteId}/forms`, {
    headers: netlifyHeaders(token),
    cache: "no-store",
  });
  if (!res.ok) {
    console.error(`Netlify list forms failed: ${res.status}`);
    return null;
  }
  const forms = (await res.json()) as NetlifyFormMeta[];
  const tribute = forms.find((f) => f.name === "tribute");
  if (!tribute) {
    console.error('No Netlify form named "tribute" found for this site.');
    return null;
  }
  return tribute.id;
}

async function fetchAllSubmissions(
  token: string,
  formId: string
): Promise<NetlifySubmission[]> {
  const all: NetlifySubmission[] = [];
  let page = 1;
  const perPage = 100;

  for (;;) {
    const url = `${API}/forms/${formId}/submissions?page=${page}&per_page=${perPage}`;
    const res = await fetch(url, {
      headers: netlifyHeaders(token),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`Netlify list submissions failed: ${res.status}`);
      return all;
    }
    const batch = (await res.json()) as NetlifySubmission[];
    all.push(...batch);
    if (batch.length < perPage) break;
    page += 1;
  }
  return all;
}

function submissionToTribute(sub: NetlifySubmission): ApprovedTribute {
  const d = sub.data ?? {};
  const name =
    (typeof d.name === "string" && d.name.trim()) ||
    (typeof sub.name === "string" && sub.name.trim()) ||
    "Anonymous";
  const relationship =
    typeof d.relationship === "string" ? d.relationship.trim() : "";
  const message =
    (typeof d.message === "string" && d.message.trim()) ||
    (typeof sub.body === "string" && sub.body.trim()) ||
    (typeof sub.summary === "string" && sub.summary.trim()) ||
    "";

  const out: ApprovedTribute = {
    id: sub.id,
    name,
    message,
    initials: deriveInitials(name),
  };
  if (relationship) out.relationship = relationship;
  return out;
}

function mergeStaticSeed(): boolean {
  const v = process.env.NETLIFY_MERGE_STATIC_SEED?.toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

export async function GET() {
  const token = process.env.NETLIFY_AUTH_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;

  if (!token || !siteId) {
    console.warn("NETLIFY_AUTH_TOKEN or NETLIFY_SITE_ID missing — returning [].");
    return jsonNoStore([]);
  }

  try {
    const formId = await resolveFormId(
      token,
      siteId,
      process.env.NETLIFY_FORM_ID
    );
    if (!formId) {
      return jsonNoStore([]);
    }

    const submissions = await fetchAllSubmissions(token, formId);
    submissions.sort((a, b) => {
      const ta = a.created_at ? Date.parse(a.created_at) : 0;
      const tb = b.created_at ? Date.parse(b.created_at) : 0;
      return ta - tb;
    });

    let tributes: ApprovedTribute[] = submissions.map(submissionToTribute);

    if (mergeStaticSeed() && approvedTributes.length > 0) {
      tributes = [...tributes, ...approvedTributes];
    }

    return jsonNoStore(tributes);
  } catch (err) {
    console.error("Netlify tributes fetch failed:", err);
    return jsonNoStore([]);
  }
}
