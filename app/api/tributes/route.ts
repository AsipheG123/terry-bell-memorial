/**
 * GET /api/tributes
 *
 * Returns approved tributes for the public memorial site.
 * Primary source: Airtable (rows where Status = "Approved").
 * Fallback:       data/approvedTributes.ts (used when Airtable env vars are
 *                 not yet set, or when Airtable returns an error / empty set).
 *
 * Required environment variables (set in .env.local and in Netlify site settings):
 *   AIRTABLE_API_KEY    — your Airtable personal access token
 *   AIRTABLE_BASE_ID    — the base ID, e.g. appXXXXXXXXXXXXXX
 *   AIRTABLE_TABLE_NAME — the table name, e.g. "Tributes"
 *
 * Expected Airtable field names (case-sensitive):
 *   Name         (text)
 *   Relationship (text, optional)
 *   Message      (long text)
 *   Status       (single select — must be "Approved" to appear publicly)
 *   Initials     (text, optional — derived from Name if blank)
 */

import { NextResponse } from "next/server";
import { approvedTributes } from "@/data/approvedTributes";

// Cache Airtable responses for 60 seconds so the page stays snappy
export const revalidate = 60;

function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export async function GET() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  // ── Env vars not configured yet — use local fallback ─────────────────────
  if (!apiKey || !baseId || !tableName) {
    return NextResponse.json(approvedTributes);
  }

  try {
    const filter = encodeURIComponent(`{Status}="Approved"`);
    const sort = "sort%5B0%5D%5Bfield%5D=Created&sort%5B0%5D%5Bdirection%5D=asc";
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?filterByFormula=${filter}&${sort}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Airtable responded with ${res.status}`);
      return NextResponse.json(approvedTributes);
    }

    const data = await res.json();
    const records: unknown[] = data.records ?? [];

    const tributes = records.map((rec: unknown) => {
      const r = rec as { id: string; fields: Record<string, string> };
      const name: string = r.fields.Name || "Anonymous";
      return {
        id: r.id,
        name,
        relationship: r.fields.Relationship || "",
        message: r.fields.Message || "",
        initials:
          r.fields.Initials?.trim() ? r.fields.Initials.trim() : deriveInitials(name),
      };
    });

    // ── Airtable returned nothing — fall back to local approved list ──────
    if (tributes.length === 0) {
      return NextResponse.json(approvedTributes);
    }

    return NextResponse.json(tributes);
  } catch (err) {
    console.error("Airtable fetch failed:", err);
    return NextResponse.json(approvedTributes);
  }
}
