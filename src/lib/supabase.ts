import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = (import.meta as any).env?.VITE_SUPABASE_URL as string | undefined;
const anonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True when both env vars are set — cloud backend is active */
export const isCloudConfigured = Boolean(url && anonKey && url.startsWith('http'));

export const supabase: SupabaseClient | null = isCloudConfigured
  ? createClient(url!, anonKey!)
  : null;

export type SitePayload = {
  version: string;
  updatedAt: string;
  cases: unknown[];
  timelineEvents: unknown[];
  networkNodes: unknown[];
  networkEdges: unknown[];
  evidence: unknown[];
  articles: unknown[];
  submissions: unknown[];
  comments: unknown[];
  settings: unknown;
};

const ROW_ID = 'main';

/** Load the shared site payload from Supabase. Returns null if missing or offline. */
export async function loadSitePayload(): Promise<SitePayload | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('site_data')
    .select('payload')
    .eq('id', ROW_ID)
    .maybeSingle();

  if (error) {
    console.warn('[cloud] load failed:', error.message);
    return null;
  }
  return (data?.payload as SitePayload) || null;
}

/** Upsert the full site payload to Supabase. */
export async function saveSitePayload(payload: SitePayload): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) return { ok: false, error: 'Cloud not configured' };

  const { error } = await supabase.from('site_data').upsert(
    {
      id: ROW_ID,
      payload,
      updated_at: new Date().toISOString()
    },
    { onConflict: 'id' }
  );

  if (error) {
    console.warn('[cloud] save failed:', error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
