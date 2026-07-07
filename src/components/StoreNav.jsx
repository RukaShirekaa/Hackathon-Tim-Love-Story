import { Link, NavLink } from 'react-router-dom'
import sasiraLogo from '../assets/sasira_logo.webp'

// Compact top bar for the Store / Admin routes (the landing page has its own nav).
function StoreNav({ showAdmin = false, onLogout, search, onSearchChange }) {
  return (
    <header className="store-nav">
      {/* SVG Gooey Filter definitions */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="gooey-nav-search">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="store-nav-inner">
        <Link className="store-nav-brand" to="/" aria-label="Sasira home">
          <img src={sasiraLogo} alt="Sasira" />
        </Link>

        {onSearchChange !== undefined && (
          <div className="store-search-wrap" style={{ filter: 'url(#gooey-nav-search)' }}>
            <div className="store-search-blob" />
            <input
              type="text"
              className="store-search-input"
              placeholder="Search..."
              value={search || ''}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <span className="store-search-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
          </div>
        )}

        <nav className="store-nav-links" aria-label="Store">
          <NavLink className="store-nav-link" to="/" end>
            Home
          </NavLink>
          <NavLink className="store-nav-link" to="/store">
            Store
          </NavLink>
          {showAdmin && (
            <button type="button" className="store-nav-link store-nav-logout" onClick={onLogout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

export default StoreNav
