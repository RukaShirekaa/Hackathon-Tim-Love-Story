import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// The whole app is client-only, so a missing config must not crash the bundle —
// pages check `isSupabaseReady` and render a friendly setup message instead.
export const isSupabaseReady = Boolean(url && key)

if (!isSupabaseReady) {
  console.warn(
    '[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. ' +
      'Copy .env.example to .env.local and fill them in. Store/Admin data features are disabled until then.',
  )
}

export const supabase = isSupabaseReady ? createClient(url, key) : null
