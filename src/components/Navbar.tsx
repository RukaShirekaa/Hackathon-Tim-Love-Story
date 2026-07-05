import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Home, Images, Info, Menu, Moon, PackageSearch, Scissors, Sparkles, Sun, X } from "lucide-react";
import { useTheme } from "../lib/useTheme";

const LINKS = [
  { to: "/", label: "Beranda", icon: Home, end: true, type: "route" },
  { to: "/#kenapa", label: "Tentang", icon: Info, type: "anchor" },
  { to: "/#proses", label: "Proses", icon: Scissors, type: "anchor" },
  { to: "/galeri", label: "Galeri", icon: Images, type: "route" },
  { to: "/#koleksi", label: "Koleksi", icon: PackageSearch, type: "anchor" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 32);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const quietLink = scrolled
    ? "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
    : "text-white/62 hover:bg-white/10 hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "top-4 px-3" : "top-0 px-0"
      }`}
    >
      <nav
        className={`nav-shell mx-auto flex items-center justify-between px-4 backdrop-blur-xl transition-all duration-500 sm:px-6 ${
          scrolled
            ? "h-16 max-w-6xl rounded-2xl border border-border/70 bg-background/88 shadow-[0_18px_70px_-28px_rgb(var(--foreground)/0.42)]"
            : "h-20 max-w-none border border-transparent bg-transparent shadow-none"
        }`}
      >
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-foreground text-background shadow-soft transition-transform duration-500 group-hover:scale-105">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(var(--accent)/0.95),transparent_35%),radial-gradient(circle_at_80%_80%,rgb(var(--primary)/0.9),transparent_45%)]" />
            <Sparkles className="relative h-5 w-5 transition-transform duration-500 group-hover:rotate-12" aria-hidden />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className={`block font-display text-lg font-black leading-none tracking-tight ${scrolled ? "text-foreground" : "text-white"}`}>
              Sasirangan
            </span>
            <span className={`mt-1 block text-[11px] font-bold uppercase tracking-wide ${scrolled ? "text-muted-foreground" : "text-white/55"}`}>
              Banjar Gallery
            </span>
          </span>
        </Link>

        <div
          className={`hidden items-center gap-2 rounded-2xl p-1.5 transition-all duration-500 md:flex ${
            scrolled
              ? "border border-border/65 bg-card/70 shadow-soft"
              : "border border-transparent bg-transparent shadow-none"
          }`}
        >
          {LINKS.map((link) => {
            const Icon = link.icon;
            if (link.type === "anchor") {
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-pill group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-xl px-4 text-sm font-bold transition-all duration-300 ${quietLink}`}
                >
                  <Icon className="relative z-10 h-4 w-4" aria-hidden />
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            }

            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `nav-pill group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-xl px-4 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-foreground text-background shadow-soft"
                      : quietLink
                  }`
                }
              >
                <Icon className="relative z-10 h-4 w-4" aria-hidden />
                <span className="relative z-10">{link.label}</span>
              </NavLink>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeButton theme={theme} toggle={toggle} scrolled={scrolled} />
          <button
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-card/70 text-foreground shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted md:hidden"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-3 mt-3 overflow-hidden rounded-2xl border border-border/75 bg-background/94 p-2 shadow-card backdrop-blur-xl md:hidden">
          <div className="grid gap-1">
            {LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="group flex min-h-12 items-center gap-3 rounded-xl px-4 text-sm font-bold text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

function ThemeButton({ theme, toggle, scrolled }: { theme: string; toggle: () => void; scrolled: boolean }) {
  return (
    <button
      onClick={toggle}
      className={`group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-0.5 ${
        scrolled
          ? "border-border/70 bg-card/70 text-foreground hover:bg-muted"
          : "border-white/12 bg-white/8 text-white hover:bg-white/12"
      }`}
      aria-label={theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
    >
      <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-accent/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
      {theme === "dark" ? (
        <Sun className="relative h-4 w-4 text-accent" aria-hidden />
      ) : (
        <Moon className="relative h-4 w-4 text-primary" aria-hidden />
      )}
    </button>
  );
}
