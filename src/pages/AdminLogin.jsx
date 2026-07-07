import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StoreNav from '../components/StoreNav'
import { login } from '../lib/auth'

function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    const success = await login(password)
    if (success) {
      navigate('/admin', { replace: true })
    } else {
      setError('Password salah. Coba lagi.')
    }
  }

  return (
    <div className="store-page">
      <StoreNav />

      <main className="admin-auth">
        <form className="admin-auth-card" onSubmit={onSubmit}>
          <h1 className="admin-auth-title">ADMIN LOGIN</h1>
          <p className="admin-auth-sub">Khusus pengelola. Masukkan password untuk lanjut.</p>

          <label className="field">
            <span className="field-label">Password</span>
            <div className="field-password">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                autoComplete="current-password"
                autoFocus
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="field-toggle"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          {error && (
            <p className="field-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary btn-block">
            Masuk
          </button>
        </form>
      </main>
    </div>
  )
}

export default AdminLogin
