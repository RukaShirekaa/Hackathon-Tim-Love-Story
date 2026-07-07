import { Link } from 'react-router-dom'
import sasiraLogo from '../assets/sasira_logo.webp'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img src={sasiraLogo} alt="Sasira" className="footer-logo" />
            <h2 className="footer-title">SASIRA</h2>
          </div>
          <p className="footer-tagline">TRADITION REBORN. STREETWEAR EVOLVED.</p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h3 className="footer-col-title">Explore</h3>
            <ul className="footer-col-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/store">Store</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Socials</h3>
            <ul className="footer-col-links">
              <li><a href="https://instagram.com/hidayathul_fikri" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://tiktok.com/@barzzly" target="_blank" rel="noopener noreferrer">TikTok</a></li>
              <li><a href="https://wa.me/6282287930695" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">© 2026 SASIRA APPAREL. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  )
}

export default Footer
