/**
 * Tribute type used by the approved tributes data file.
 * Placeholder / demo tribute entries have been removed.
 * See data/approvedTributes.ts for the live moderation workflow.
 */
export interface Tribute {
  id: string;
  name: string;
  relationship?: string;
  message: string;
  initials: string;
}
