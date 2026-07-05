import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, Loader2, Info } from "lucide-react";
import { signIn, isAuthenticated, isDemoAuth } from "../lib/auth";
import { useToast } from "../components/Toast";

export default function Login() {
  const nav = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState(isDemoAuth ? "admin@sasirangan.local" : "");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const pwRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "Login Admin — Sasirangan";
    // Kalau sudah login, langsung ke admin
    isAuthenticated().then((ok) => ok && nav("/admin", { replace: true }));
  }, [nav]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signIn(email, password);
      toast.success("Berhasil masuk.");
      nav("/admin", { replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal masuk.";
      setError(msg);
      pwRef.current?.focus();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container-app flex min-h-[80dvh] items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Lock className="h-6 w-6" aria-hidden />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold">Login Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Masuk untuk mengelola produk galeri.
          </p>

          {isDemoAuth && (
            <div className="mt-5 flex items-start gap-2 rounded-xl bg-muted p-3 text-sm text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>
                Mode demo aktif (tanpa Supabase). Password:{" "}
                <code className="font-semibold text-foreground">admin123</code>
              </span>
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none transition-colors focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  ref={pwRef}
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "pw-error" : undefined}
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-12 outline-none transition-colors focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-1 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {error && (
                <p
                  id="pw-error"
                  role="alert"
                  className="mt-2 text-sm font-medium text-destructive"
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={busy}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-on-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy && <Loader2 className="h-5 w-5 animate-spin" aria-hidden />}
              {busy ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
