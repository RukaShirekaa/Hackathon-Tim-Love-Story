import { Navigate, useLocation } from 'react-router-dom'
import { isAdmin } from '../lib/auth'

// Route guard — bounces to the login page when the session flag isn't set.
function RequireAdmin({ children }) {
  const location = useLocation()
  if (!isAdmin()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }
  return children
}

export default RequireAdmin
