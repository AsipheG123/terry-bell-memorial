/**
 * APPROVED PUBLIC TRIBUTES
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the only file that controls what appears publicly on the site under
 * "Approved Tributes". The workflow is:
 *
 *   1. A visitor submits a tribute via the form on the Public Tributes page.
 *   2. Netlify captures the submission and forwards it by email / Zapier.
 *   3. The family or moderator reviews the submission.
 *   4. If approved, the tribute is manually added to this array below.
 *   5. The site is rebuilt and redeployed — the tribute then appears publicly.
 *
 * DO NOT populate this file with demo or placeholder data.
 * Only add real, reviewed, family-approved tributes here.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface ApprovedTribute {
  id: string;
  name: string;
  relationship?: string;
  message: string;
  /** Initials derived from name — used for the avatar circle */
  initials: string;
}

/**
 * Add approved tributes to this array.
 * Leave empty until real submissions have been reviewed and approved.
 */
export const approvedTributes: ApprovedTribute[] = [
  {
    id: "1",
    name: "Hon Justice Dumisa Buhle Ntsebeza",
    relationship: "Comrade",
    message: "Uwile umth'omkhulu! The RSA Community and society at large, has lost Terry-- and his wife, Barbara before him. Where comes such another as Terry Bell? I see no one on the horizon, especially as the RSA is going through a lot of turmoil -- a lot of Unfinished Business!",
    initials: "DN",
  },
  {
    id: "2",
    name: "Palesa M",
    relationship: "Friend",
    message: "We will miss Terry so much. A real force of nature.",
    initials: "PM",
  },
  {
    id: "3",
    name: "Yvonne Morudu",
    relationship: "Friend",
    message: "I remember Terry as a friend, I met him and Babra as a friend of my sister Palesa Morudu. They supported me when my daughter passed away. I have never seen such beautiful loving kind hearted couple like Terry and Babra may their powerful spirit rest in power",
    initials: "YM",
  },
  {
    id: "4",
    name: "Sherry Mclean",
    relationship: "Friend",
    message: "Dearest Terry It is difficult to find the right words to capture the scope of wealth that you brought to our lives. Your energy, intellectual stimulation, commitment to jistice, fun, kindness and love enriched our family's life and mine. What a rich life you had I met Terry and Barbara when they visited Dublin in the mid '80s in preparation for my going to join Marius and Fritz at SOMAFCO and we remained close ever since. We raise a glass to you singing 'The Auld Triangle' and send much love and strength to all the family. Will miss you very much. Hamba khahle dear brother Sherry",
    initials: "SM",
  }
]
