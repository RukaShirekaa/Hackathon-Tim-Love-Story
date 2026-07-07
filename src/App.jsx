import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Store from './pages/Store'
import AdminLogin from './pages/AdminLogin'
import Admin from './pages/Admin'
import RequireAdmin from './components/RequireAdmin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <Admin />
          </RequireAdmin>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
