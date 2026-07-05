import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True saat env Supabase terisi. Kalau false, app jalan mode demo (localStorage). */
export const hasSupabase = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = hasSupabase
  ? createClient(url as string, anonKey as string)
  : null;

/** Nama bucket storage untuk foto produk. */
export const STORAGE_BUCKET = "product-images";
