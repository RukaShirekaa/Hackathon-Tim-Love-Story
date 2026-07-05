import { supabase, hasSupabase } from "./supabase";

/*
 * Auth dual-mode:
 *  - Supabase → email/password asli via supabase.auth.
 *  - Demo     → password lokal (VITE_ADMIN_PASSWORD atau default "admin123"),
 *               sesi disimpan di localStorage. Hanya untuk demo, BUKAN produksi.
 */

const LS_SESSION = "sasirangan.admin";
const DEMO_PASSWORD =
  (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) || "admin123";

export async function signIn(email: string, password: string): Promise<void> {
  if (hasSupabase && supabase) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error("Email atau password salah.");
    return;
  }
  // Demo mode: cek password lokal (email diabaikan)
  await new Promise((r) => setTimeout(r, 300));
  if (password !== DEMO_PASSWORD) {
    throw new Error("Password salah. (Demo: coba \"admin123\")");
  }
  localStorage.setItem(LS_SESSION, "1");
}

export async function signOut(): Promise<void> {
  if (hasSupabase && supabase) {
    await supabase.auth.signOut();
    return;
  }
  localStorage.removeItem(LS_SESSION);
}

export async function isAuthenticated(): Promise<boolean> {
  if (hasSupabase && supabase) {
    const { data } = await supabase.auth.getSession();
    return Boolean(data.session);
  }
  return localStorage.getItem(LS_SESSION) === "1";
}

/** True kalau login pakai password demo (untuk tampilkan hint di UI). */
export const isDemoAuth = !hasSupabase;
