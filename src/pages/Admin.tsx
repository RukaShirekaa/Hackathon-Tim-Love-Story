import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, LogOut, PackageOpen, Loader2 } from "lucide-react";
import type { Product, ProductInput } from "../lib/types";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../lib/db";
import { signOut, isDemoAuth } from "../lib/auth";
import { formatPrice } from "../lib/format";
import { useToast } from "../components/Toast";
import ProductForm from "../components/ProductForm";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Admin() {
  const nav = useNavigate();
  const toast = useToast();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [toDelete, setToDelete] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    document.title = "Dashboard Admin - Sasirangan";
    load();
  }, []);

  function load() {
    getProducts()
      .then(setProducts)
      .catch(() => {
        setProducts([]);
        toast.error("Gagal memuat produk.");
      });
  }

  async function onLogout() {
    await signOut();
    toast.success("Berhasil keluar.");
    nav("/login", { replace: true });
  }

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }
  function openEdit(p: Product) {
    setEditing(p);
    setFormOpen(true);
  }

  async function onSubmit(input: ProductInput) {
    try {
      if (editing) {
        await updateProduct(editing.id, input);
        toast.success("Produk diperbarui.");
      } else {
        await createProduct(input);
        toast.success("Produk ditambahkan.");
      }
      setFormOpen(false);
      setEditing(null);
      load();
    } catch {
      toast.error("Gagal menyimpan produk.");
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteProduct(toDelete.id);
      toast.success("Produk dihapus.");
      setToDelete(null);
      load();
    } catch {
      toast.error("Gagal menghapus produk.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="container-app py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Dashboard Admin
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Kelola produk galeri.{" "}
            {isDemoAuth && (
              <span className="text-primary">Mode demo - data tersimpan di browser ini.</span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openCreate}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-4 font-semibold text-on-primary transition-opacity hover:opacity-90"
          >
            <Plus className="h-5 w-5" aria-hidden /> Tambah Produk
          </button>
          {/* Logout dipisah jauh dari aksi utama */}
          <button
            onClick={onLogout}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-border px-4 font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-5 w-5" aria-hidden /> Keluar
          </button>
        </div>
      </div>

      <div className="mt-8">
        {products === null ? (
          <div className="flex min-h-[40dvh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Memuat" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border py-20 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <PackageOpen className="h-7 w-7" aria-hidden />
            </div>
            <h2 className="mt-4 font-display text-xl font-bold">Belum ada produk</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Klik "Tambah Produk" untuk mengunggah produk pertama.
            </p>
            <button
              onClick={openCreate}
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-4 font-semibold text-on-primary"
            >
              <Plus className="h-5 w-5" aria-hidden /> Tambah Produk
            </button>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <li
                key={p.id}
                className="flex gap-4 rounded-2xl border border-border bg-card p-3 shadow-soft"
              >
                <img
                  src={p.imageUrl}
                  alt=""
                  onError={(event) => { event.currentTarget.src = "/images/sasirangan-teal.svg"; }}
                  className="h-24 w-20 shrink-0 rounded-xl object-cover"
                  aria-hidden
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start gap-2">
                    <h3 className="flex-1 truncate font-display font-bold">{p.name}</h3>
                    {p.isFeatured && (
                      <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-on-accent">
                        Unggulan
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{p.category}</p>
                  <p className="mt-0.5 text-sm font-semibold text-primary [font-variant-numeric:tabular-nums]">
                    {formatPrice(p.price)}
                  </p>
                  <div className="mt-auto flex gap-1 pt-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <Pencil className="h-4 w-4" aria-hidden /> Edit
                    </button>
                    <button
                      onClick={() => setToDelete(p)}
                      className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden /> Hapus
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {formOpen && (
        <ProductForm
          initial={editing}
          onSubmit={onSubmit}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Hapus produk?"
          message={`"${toDelete.name}" akan dihapus permanen. Tindakan ini tidak bisa dibatalkan.`}
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  );
}
