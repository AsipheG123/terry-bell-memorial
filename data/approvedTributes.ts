/**
 * Public tribute shape + optional static seed.
 * ─────────────────────────────────────────────────────────────────────────────
 * Live tributes come from Netlify Forms via GET /api/tributes (verified
 * submissions). Remove unwanted entries in the Netlify Forms UI.
 *
 * This array is not used unless NETLIFY_MERGE_STATIC_SEED=true (e.g. legacy
 * rows during migration). Leave empty once everything lives in Netlify.
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

/** Optional static rows when NETLIFY_MERGE_STATIC_SEED is enabled. */
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
