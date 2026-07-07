import { supabase, isSupabaseReady } from './supabase'

const TABLE = 'products'
const BUCKET = 'product-images'

function assertReady() {
  if (!isSupabaseReady) {
    throw new Error('Supabase belum dikonfigurasi. Isi .env.local dulu (lihat .env.example).')
  }
}

// Read — returns [] when Supabase isn't configured so the Store still renders.
export async function listProducts() {
  if (!isSupabaseReady) return []
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function createProduct(fields) {
  assertReady()
  const { data, error } = await supabase.from(TABLE).insert(fields).select().single()
  if (error) throw error
  return data
}

export async function updateProduct(id, fields) {
  assertReady()
  const { data, error } = await supabase
    .from(TABLE)
    .update(fields)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteProduct(id) {
  assertReady()
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}

// Upload an image file to the public bucket, return its public URL.
export async function uploadImage(file) {
  assertReady()
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  // Vite forbids Date.now()/Math.random() in some sandboxes, but this is app
  // runtime (not a workflow) so they're fine here for a unique object key.
  const path = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

// Locale-aware price formatting. Prices are stored as plain numbers (IDR).
export function formatPrice(value) {
  const n = Number(value) || 0
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)
}
