
import './App.css'

//  1. NAVBAR 
// Component thanh điều hướng phía trên cùng trang
function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo bên trái */}
      <a href="#" className="nav-logo">
        {/* Icon cho trang */}
        <div className="nav-logo-icon">
          <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        MedBook
      </a>

      {/* Các link điều hướng ở giữa */}
      <ul className="nav-links">
        <li><a href="#features">Tính năng</a></li>
        <li><a href="#doctors">Bác sĩ</a></li>
        <li><a href="#how">Cách dùng</a></li>
        <li><a href="#">Liên hệ</a></li>
      </ul>

      {/* Nút đặt lịch bên phải */}
      <a href="#search" className="btn-primary nav-cta">Đặt lịch ngay</a>
    </nav>
  )
}

//  2. HERO SECTION 
// Phần banner lớn đầu trang
function Hero() {
  return (
    <section className="hero" id="home">
      {/* Nền trang trí (dot grid) */}
      <div className="hero-bg"></div>
      <div className="hero-dots"></div>

      {/* Nội dung chính */}
      <div className="hero-content">
        {/* Badge nhỏ phía trên tiêu đề */}
        <div className="hero-badge">
          <span className="dot"></span>
          Đã có hơn 50,000 bệnh nhân tin dùng
        </div>

        {/* Tiêu đề lớn */}
        <h1>
          Chăm sóc sức khỏe<br/>
          thật <em>đơn giản</em> & tiện lợi
        </h1>

        {/* Mô tả ngắn */}
        <p>
          Đặt lịch khám với hơn 200 bác sĩ chuyên khoa hàng đầu.
          Nhanh chóng, minh bạch, không phải chờ đợi.
        </p>

        {/* 2 nút bấm */}
        <div className="hero-actions">
          <a href="#search" className="btn-primary">📅 Đặt lịch khám</a>
          <a href="#doctors" className="btn-secondary">🔍 Tìm bác sĩ</a>
        </div>
      </div>

      {/* Form tìm kiếm */}
      <SearchCard />

      {/* Các con số thống kê */}
      <StatsStrip />
    </section>
  )
}

//  3. SEARCH CARD 
// Form tìm kiếm bác sĩ / lịch khám
function SearchCard() {
  return (
    <div className="search-section" id="search">
      <div className="search-card">
        {/* Dropdown chọn chuyên khoa */}
        <div className="search-field">
          <label>Chuyên khoa</label>
          <select>
            <option>Tất cả chuyên khoa</option>
            <option>Tim mạch</option>
            <option>Da liễu</option>
            <option>Nhi khoa</option>
            <option>Thần kinh</option>
            <option>Nội tổng quát</option>
          </select>
        </div>

        {/* Dropdown chọn địa điểm */}
        <div className="search-field">
          <label>Địa điểm</label>
          <select>
            <option>TP. Hồ Chí Minh</option>
            <option>Hà Nội</option>
            <option>Đà Nẵng</option>
            <option>Cần Thơ</option>
          </select>
        </div>

        {/* Input chọn ngày */}
        <div className="search-field">
          <label>Ngày khám</label>
          <input type="date" />
        </div>

        {/* Nút tìm kiếm */}
        <button className="search-btn">🔍 Tìm kiếm</button>
      </div>
    </div>
  )
}

//  4. STATS STRIP
// Dải thống kê: số bác sĩ, bệnh nhân, v.v.
function StatsStrip() {
  // Dữ liệu thống kê — bạn có thể thay đổi con số ở đây
  const stats = [
    { num: '200+', label: 'Bác sĩ chuyên khoa' },
    { num: '50K+', label: 'Bệnh nhân hài lòng' },
    { num: '30+',  label: 'Chuyên khoa khác nhau' },
    { num: '4.9★', label: 'Đánh giá trung bình' },
  ]

  return (
    <div className="stats-strip">
      {/* .map() = lặp qua mảng stats, tạo ra 1 phần tử cho mỗi item */}
      {stats.map((item, index) => (
        <div className="stat" key={index}>
          <div className="stat-num">{item.num}</div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

//  5. FEATURES SECTION 
// Phần giới thiệu các tính năng nổi bật
function Features() {
  // Dữ liệu tính năng — thêm/xoá/sửa tại đây
  const features = [
    {
      icon: '📅',
      title: 'Đặt lịch tức thì',
      desc: 'Chọn bác sĩ, chọn giờ trống và xác nhận trong vòng 60 giây. Không cần gọi điện, không cần chờ đợi.',
    },
    {
      icon: '📋',
      title: 'Hồ sơ sức khỏe điện tử',
      desc: 'Lưu trữ toàn bộ lịch sử khám, đơn thuốc và kết quả xét nghiệm an toàn trên nền tảng đám mây.',
    },
    {
      icon: '🔔',
      title: 'Nhắc nhở thông minh',
      desc: 'Nhận thông báo qua SMS và email trước giờ hẹn. Dễ dàng đổi lịch hoặc hủy khi có việc đột xuất.',
    },
    {
      icon: '🎥',
      title: 'Tư vấn trực tuyến',
      desc: 'Khám từ xa qua video call với bác sĩ có kinh nghiệm. Tiết kiệm thời gian đi lại.',
    },
    {
      icon: '⭐',
      title: 'Đánh giá bác sĩ',
      desc: 'Xem nhận xét thật từ bệnh nhân đã khám. Chọn đúng bác sĩ phù hợp với nhu cầu của bạn.',
    },
    {
      icon: '💳',
      title: 'Thanh toán dễ dàng',
      desc: 'Hỗ trợ nhiều phương thức: ví điện tử, thẻ ngân hàng, tiền mặt tại quầy. An toàn và minh bạch.',
    },
  ]

  return (
    <section className="features-section" id="features">
      <div className="section-inner">
        {/* Tiêu đề section */}
        <div className="section-label">Tính năng</div>
        <h2 className="section-title">
          Mọi thứ bạn cần<br/>trong <em>một nơi duy nhất</em>
        </h2>
        <p className="section-sub">
          Từ đặt lịch đến theo dõi hồ sơ sức khỏe — MedBook giúp bạn
          quản lý việc khám chữa bệnh dễ dàng hơn bao giờ hết.
        </p>

        {/* Grid 3 cột các card tính năng */}
        <div className="features-grid">
          {features.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

//  6. DOCTORS SECTION 
// Danh sách bác sĩ nổi bật
function Doctors() {
  // Dữ liệu bác sĩ — thêm/sửa tại đây
  const doctors = [
    { emoji: '👨‍⚕️', name: 'BS. Nguyễn Minh Tuấn', specialty: 'Tim mạch',    rating: '4.9', reviews: 128 },
    { emoji: '👩‍⚕️', name: 'BS. Trần Thị Lan Anh',  specialty: 'Da liễu',    rating: '4.8', reviews: 97  },
    { emoji: '👨‍⚕️', name: 'BS. Phạm Quốc Hùng',   specialty: 'Nhi khoa',   rating: '5.0', reviews: 204 },
    { emoji: '👩‍⚕️', name: 'BS. Lê Thị Hương',      specialty: 'Thần kinh',  rating: '4.9', reviews: 156 },
  ]

  return (
    <section className="doctors-section" id="doctors">
      <div className="section-inner">
        {/* Header: tiêu đề + nút xem tất cả */}
        <div className="doctors-header">
          <div>
            <div className="section-label">Đội ngũ bác sĩ</div>
            <h2 className="section-title">
              Gặp gỡ các <em>chuyên gia</em><br/>hàng đầu
            </h2>
          </div>
          <a href="#" className="btn-secondary">Xem tất cả →</a>
        </div>

        {/* Grid 4 cột các card bác sĩ */}
        <div className="doctors-grid">
          {doctors.map((doc, index) => (
            <div className="doctor-card" key={index}>
              {/* Ảnh đại diện (dùng emoji tạm) */}
              <div className="doctor-avatar">{doc.emoji}</div>
              <div className="doctor-info">
                <h4>{doc.name}</h4>
                <div className="specialty">{doc.specialty}</div>
                <div className="doctor-meta">
                  <span className="rating">★ {doc.rating} ({doc.reviews})</span>
                  <a href="#" className="book-link">Đặt lịch</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

//  7. HOW IT WORKS 
// Các bước sử dụng dịch vụ
function HowItWorks() {
  const steps = [
    { num: '1', title: 'Chọn chuyên khoa',    desc: 'Tìm kiếm theo triệu chứng hoặc chuyên khoa bạn cần khám.' },
    { num: '2', title: 'Chọn bác sĩ',         desc: 'Xem hồ sơ, đánh giá và chọn bác sĩ phù hợp nhất với bạn.' },
    { num: '3', title: 'Chọn ngày giờ',        desc: 'Xem lịch trống theo thời gian thực và đặt khung giờ thuận tiện.' },
    { num: '4', title: 'Xác nhận & đến khám', desc: 'Nhận xác nhận qua SMS. Đến đúng giờ và tận hưởng trải nghiệm nhanh.' },
  ]

  return (
    <section className="how-section" id="how">
      <div className="section-inner">
        <div className="section-label light">Cách hoạt động</div>
        <h2 className="section-title light">
          Đặt lịch trong<br/><em>4 bước đơn giản</em>
        </h2>
        <p className="section-sub light">
          Không cần tài khoản phức tạp — chỉ cần vài thao tác là bạn
          đã có lịch hẹn ngay hôm nay.
        </p>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div className="step" key={index}>
              <div className="step-num">{step.num}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

//  8. CTA SECTION 
// Banner kêu gọi đặt lịch ở cuối trang
function CallToAction() {
  return (
    <section className="cta-section">
      <div className="section-inner" style={{ textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>Bắt đầu ngay</div>
        <h2 className="section-title">
          Sức khỏe của bạn<br/>không nên chờ đợi
        </h2>
        <p className="section-sub" style={{ margin: '0 auto 2.5rem' }}>
          Đặt lịch khám ngay hôm nay — miễn phí, không mất phí dịch vụ.
        </p>
        <a href="#search" className="btn-primary btn-large">
          Đặt lịch ngay — miễn phí
        </a>
      </div>
    </section>
  )
}

//  9. FOOTER 
function Footer() {
  return (
    <footer className="footer">
      <span className="footer-logo">MedBook</span>
      <div className="footer-links">
        <a href="#">Về chúng tôi</a>
        <a href="#">Điều khoản</a>
        <a href="#">Quyền riêng tư</a>
        <a href="#">Liên hệ</a>
      </div>
      <span>© 2025 MedBook. All rights reserved.</span>
    </footer>
  )
}

//  10. APP 
// Component chính, gộp tất cả các phần lại
// React render từ trên xuống dưới theo thứ tự này
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Doctors />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </>
  )
}

export default App
