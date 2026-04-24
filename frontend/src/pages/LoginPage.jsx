import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_PASSWORD, ADMIN_USERNAME, login } from '../utils/auth';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!login(username.trim(), password)) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng.');
      return;
    }

    navigate('/admin/bookings');
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Đăng nhập quản trị</h1>
        <p>Đăng nhập để xem, sửa và xóa các lịch hẹn đã được đặt.</p>
      </div>

      <div className="section-inner auth-layout">
        <form className="booking-form-box auth-box" onSubmit={handleSubmit}>
          <h2>Tài khoản quản trị</h2>

          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {error ? <p className="form-error">{error}</p> : null}

          <button type="submit" className="btn-primary auth-submit">
            Đăng nhập
          </button>

          <div className="login-hint">
            <span>Tài khoản demo: {ADMIN_USERNAME}</span>
            <span>Mật khẩu: {ADMIN_PASSWORD}</span>
          </div>
        </form>

        <div className="booking-info-box auth-side">
          <h3>Quản lý lịch hẹn</h3>
          <ul className="booking-notes">
            <li>Xem toàn bộ thông tin đặt lịch từ database.</li>
            <li>Sửa lịch hẹn bằng API PUT.</li>
            <li>Xóa lịch hẹn bằng API DELETE.</li>
          </ul>
          <Link to="/booking" className="btn-secondary">
            Quay lại đặt lịch
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
