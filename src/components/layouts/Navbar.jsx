// Navbar.jsx — Thanh menu điều hướng
// Dùng <Link> của React Router thay vì <a href> để chuyển trang không reload
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo — bấm vào về trang chủ */}
      <Link to="/" className="nav-logo">
        <div className="nav-logo-icon">
          <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        MedBook
      </Link>

      {/* Các link điều hướng — to="/..." để chuyển trang */}
      <ul className="nav-links">
        <li><Link to="/">Trang chủ</Link></li>
        <li><Link to="/doctors">Bác sĩ</Link></li>
        <li><Link to="/booking">Đặt lịch</Link></li>
        <li><Link to="/contact">Liên hệ</Link></li>
      </ul>

      {/* Nút đặt lịch */}
      <Link to="/booking" className="btn-primary nav-cta">Đặt lịch ngay</Link>
    </nav>
  )
}
export default Navbar;
