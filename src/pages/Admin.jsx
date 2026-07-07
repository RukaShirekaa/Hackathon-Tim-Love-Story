import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StoreNav from '../components/StoreNav'
import { logout } from '../lib/auth'
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  formatPrice,
} from '../lib/products'
import { isSupabaseReady } from '../lib/supabase'

const BADGES = ['', 'BEST SELLER', 'TRENDING', 'NEW ARRIVAL']
const EMPTY = { name: '', category: '', price: '', badge: '', image_url: '', description: '' }

function Admin() {
  const navigate = useNavigate()
  const fileRef = useRef(null)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState(null) // { kind: 'ok'|'err', text }

  const load = () => {
    setLoading(true)
    listProducts()
      .then(setProducts)
      .catch((err) => flash('err', err.message))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const flash = (kind, text) => {
    setNotice({ kind, text })
    window.setTimeout(() => setNotice(null), 4000)
  }

  const onLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const resetForm = () => {
    setForm(EMPTY)
    setEditingId(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const onEdit = (p) => {
    setEditingId(p.id)
    setForm({
      name: p.name ?? '',
      category: p.category ?? '',
      price: String(p.price ?? ''),
      badge: p.badge ?? '',
      image_url: p.image_url ?? '',
      description: p.description ?? '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file)
      setForm((f) => ({ ...f, image_url: url }))
      flash('ok', 'Gambar terunggah.')
    } catch (err) {
      flash('err', err.message)
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      flash('err', 'Nama produk wajib diisi.')
      return
    }
    const payload = {
      name: form.name.trim(),
      category: form.category.trim() || null,
      price: Number(form.price) || 0,
      badge: form.badge || null,
      image_url: form.image_url || null,
      description: form.description.trim() || null,
    }
    setSaving(true)
    try {
      if (editingId) {
        await updateProduct(editingId, payload)
        flash('ok', 'Produk diperbarui.')
      } else {
        await createProduct(payload)
        flash('ok', 'Produk ditambahkan.')
      }
      resetForm()
      load()
    } catch (err) {
      flash('err', err.message)
    } finally {
      setSaving(false)
    }
  }

  const onDelete = async (p) => {
    if (!window.confirm(`Hapus "${p.name}"? Tindakan ini tidak bisa dibatalkan.`)) return
    try {
      await deleteProduct(p.id)
      flash('ok', 'Produk dihapus.')
      if (editingId === p.id) resetForm()
      load()
    } catch (err) {
      flash('err', err.message)
    }
  }

  return (
    <div className="store-page">
      <StoreNav showAdmin onLogout={onLogout} />

      <main className="admin-main">
        <header className="admin-head">
          <h1 className="admin-title">ADMIN — PRODUK</h1>
          <p className="admin-sub">Tambah, ubah, dan hapus produk yang tampil di Store.</p>
        </header>

        {!isSupabaseReady && (
          <p className="admin-warn" role="alert">
            Supabase belum dikonfigurasi. Isi <code>.env.local</code> lalu restart dev server.
          </p>
        )}

        {notice && (
          <p className={`admin-notice ${notice.kind === 'ok' ? 'is-ok' : 'is-err'}`} role="status" aria-live="polite">
            {notice.text}
          </p>
        )}

        <section className="admin-grid">
          {/* Form */}
          <form className="admin-form" onSubmit={onSubmit}>
            <h2 className="admin-form-title">{editingId ? 'Edit produk' : 'Tambah produk'}</h2>

            <label className="field">
              <span className="field-label">Nama *</span>
              <input value={form.name} onChange={setField('name')} placeholder="Kaos Sasirangan Bold" />
            </label>

            <label className="field">
              <span className="field-label">Kategori</span>
              <input value={form.category} onChange={setField('category')} placeholder="T-Shirt" />
            </label>

            <div className="field-row">
              <label className="field">
                <span className="field-label">Harga (IDR)</span>
                <input type="number" min="0" step="1000" value={form.price} onChange={setField('price')} placeholder="270000" />
              </label>

              <label className="field">
                <span className="field-label">Badge</span>
                <select value={form.badge} onChange={setField('badge')}>
                  {BADGES.map((b) => (
                    <option key={b || 'none'} value={b}>
                      {b || '— tanpa badge —'}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="field">
              <span className="field-label">Gambar</span>
              <div className="upload-row">
                <div className="upload-preview" aria-hidden="true">
                  {form.image_url ? <img src={form.image_url} alt="" /> : <span>No image</span>}
                </div>
                <div className="upload-controls">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={onFile}
                    disabled={uploading || !isSupabaseReady}
                  />
                  {uploading && <span className="upload-status">Mengunggah…</span>}
                </div>
              </div>
            </div>

            <label className="field">
              <span className="field-label">Deskripsi</span>
              <textarea
                value={form.description}
                onChange={setField('description')}
                placeholder="Detail produk..."
                rows={3}
                style={{
                  width: '100%',
                  background: '#141613',
                  border: '1px solid var(--line)',
                  borderRadius: '8px',
                  color: 'var(--ink)',
                  padding: '0.5rem 0.8rem',
                  fontFamily: 'var(--font-sans)',
                  resize: 'vertical'
                }}
              />
            </label>

            <div className="admin-form-actions">
              <button type="submit" className="btn-primary" disabled={saving || uploading}>
                {saving ? 'Menyimpan…' : editingId ? 'Simpan perubahan' : 'Tambah produk'}
              </button>
              {editingId && (
                <button type="button" className="btn-ghost" onClick={resetForm}>
                  Batal
                </button>
              )}
            </div>
          </form>

          {/* List */}
          <div className="admin-list">
            <h2 className="admin-form-title">Daftar produk ({products.length})</h2>

            {loading ? (
              <p className="admin-muted">Memuat…</p>
            ) : products.length === 0 ? (
              <p className="admin-muted">Belum ada produk. Tambahkan lewat form di samping.</p>
            ) : (
              <ul className="admin-items">
                {products.map((p) => (
                  <li className="admin-item" key={p.id}>
                    <div className="admin-item-thumb" aria-hidden="true">
                      {p.image_url ? <img src={p.image_url} alt="" /> : <span>—</span>}
                    </div>
                    <div className="admin-item-info">
                      <strong>{p.name}</strong>
                      <span className="admin-item-meta">
                        {[p.category, p.badge].filter(Boolean).join(' · ') || '—'}
                      </span>
                      <span className="admin-item-price">{formatPrice(p.price)}</span>
                      {p.description && (
                        <p style={{ fontSize: '0.72rem', color: 'var(--smoke)', marginTop: '4px', maxWidth: '300px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {p.description}
                        </p>
                      )}
                    </div>
                    <div className="admin-item-actions">
                      <button type="button" className="btn-mini" onClick={() => onEdit(p)}>
                        Edit
                      </button>
                      <button type="button" className="btn-mini is-danger" onClick={() => onDelete(p)}>
                        Hapus
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Admin
