import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StoreNav from '../components/StoreNav'
import { listProducts, formatPrice } from '../lib/products'
import { isSupabaseReady } from '../lib/supabase'
import backgroundImg3 from '../assets/backround3.jpg'
import { CardContainer, CardBody, CardItem } from '../components/ThreeDCard'
import Footer from '../components/Footer'

function CartGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function Store() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const load = () => {
    setStatus('loading')
    listProducts()
      .then((rows) => {
        setProducts(rows)
        setStatus('ready')
      })
      .catch((err) => {
        setError(err.message || 'Gagal memuat produk.')
        setStatus('error')
      })
  }

  const handleCheckout = (p) => {
    const phoneNumber = '6282287930695'
    const message = `Halo Sasira! Saya tertarik untuk memesan produk ini:

Nama: ${p.name}
Kategori: ${p.category || '-'}
Harga: ${formatPrice(p.price)}

Apakah produk ini masih tersedia? Terima kasih!`
    const encodedText = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank')
  }

  useEffect(load, [])

  const filteredProducts = products.filter((p) => {
    const query = searchQuery.toLowerCase()
    return (
      p.name.toLowerCase().includes(query) ||
      (p.category && p.category.toLowerCase().includes(query)) ||
      (p.description && p.description.toLowerCase().includes(query))
    )
  })

  return (
    <div className="store-page" style={{
      background: `
        linear-gradient(180deg, #080908 0%, rgba(8, 9, 8, 0.86) 14%, rgba(8, 9, 8, 0.78) 68%, #080908 100%),
        radial-gradient(circle at 50% 0%, rgba(216, 167, 21, 0.16), transparent 36%),
        url(${backgroundImg3}) center / cover no-repeat,
        #080908
      `
    }}>
      <StoreNav search={searchQuery} onSearchChange={setSearchQuery} />

      <main className="store-main">
        <header className="store-head">
          <p className="eyebrow text-pop">Sasira / 2026</p>
          <h1 className="store-title">FEATURED PRODUCTS</h1>
          <p className="store-sub">Koleksi streetwear sasirangan — pilih yang paling kamu banget.</p>
        </header>

        {status === 'loading' && (
          <div className="store-grid" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="product-card is-skeleton" key={i}>
                <div className="product-media skeleton-box" />
                <div className="product-body">
                  <span className="skeleton-line short" />
                  <span className="skeleton-line" />
                  <span className="skeleton-line med" />
                </div>
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="store-empty" role="alert">
            <h2>Gagal memuat</h2>
            <p>{error}</p>
            <button type="button" className="btn-primary" onClick={load}>
              Coba lagi
            </button>
          </div>
        )}

        {status === 'ready' && products.length === 0 && (
          <div className="store-empty">
            <h2>Belum ada produk</h2>
            <p>
              {isSupabaseReady
                ? 'Produk yang ditambahkan admin akan tampil di sini.'
                : 'Supabase belum dikonfigurasi. Isi .env.local dulu (lihat .env.example).'}
            </p>
            <Link className="btn-ghost" to="/admin/login">
              Masuk admin
            </Link>
          </div>
        )}

        {status === 'ready' && products.length > 0 && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="store-empty">
                <h2>Tidak ada hasil</h2>
                <p>Tidak ada produk yang cocok dengan pencarian "{searchQuery}".</p>
                <button type="button" className="btn-ghost" onClick={() => setSearchQuery('')} style={{ marginTop: '1.5rem' }}>
                  Bersihkan Pencarian
                </button>
              </div>
            ) : (
              <div className="store-grid">
                {filteredProducts.map((p) => (
                  <CardContainer className="product-card" key={p.id}>
                    <CardBody>
                      <div className="product-media" style={{ width: '100%', position: 'relative', transformStyle: 'preserve-3d', overflow: 'visible' }}>
                        {p.badge && (
                          <CardItem translateZ={120} className="product-badge" as="span" style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10 }}>
                            {p.badge}
                          </CardItem>
                        )}
                        {p.image_url ? (
                          <CardItem translateZ={100} as="img" src={p.image_url} alt={p.name} loading="lazy" />
                        ) : (
                          <CardItem translateZ={100} className="product-media-placeholder" aria-hidden="true" style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, #1a1c18, #0d0e0c)', borderRadius: '16px' }}>
                            SASIRA
                          </CardItem>
                        )}
                      </div>
                      <div className="product-body" style={{ transformStyle: 'preserve-3d' }}>
                        {p.category && (
                          <CardItem translateZ={30} className="product-category" as="span">
                            {p.category}
                          </CardItem>
                        )}
                        <CardItem translateZ={50} className="product-name" as="h3">
                          {p.name}
                        </CardItem>
                        {p.description && (
                          <CardItem translateZ={40} as="p" style={{ fontSize: '0.8rem', color: 'var(--smoke)', marginTop: '4px', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {p.description}
                          </CardItem>
                        )}
                        <CardItem translateZ={70} className="product-foot" style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                          <span className="product-price">{formatPrice(p.price)}</span>
                          <button type="button" className="product-cart" aria-label={`Tambah ${p.name} ke keranjang`} onClick={() => handleCheckout(p)}>
                            <CartGlyph />
                          </button>
                        </CardItem>
                      </div>
                    </CardBody>
                  </CardContainer>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Store
