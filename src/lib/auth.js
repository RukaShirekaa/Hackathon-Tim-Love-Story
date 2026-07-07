// Demo-grade shared-password gate. NOT real security (the password is compared
// client-side), but it keeps the admin UI behind a step. Upgrade path: Supabase Auth.
const KEY = 'sasira-admin'

export function isAdmin() {
  return sessionStorage.getItem(KEY) === '1'
}

export async function login(password) {
  // Hash user input using Web Crypto API (SHA-256)
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  // Hardcoded SHA-256 hash of 'sasira2026'
  const expectedHash = 'a9fc9c165b02e5e143af597925c3f5147bbfc7c468864eede36ae5ef7d349d66'

  if (hashHex === expectedHash) {
    sessionStorage.setItem(KEY, '1')
    return true
  }
  return false
}

export function logout() {
  sessionStorage.removeItem(KEY)
}
