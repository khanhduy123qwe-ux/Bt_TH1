// ContactPage.jsx — Trang liên hệ

function ContactPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Liên hệ với chúng tôi</h1>
        <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
      </div>

      <div className="section-inner">
        <div className="contact-layout">

          {/* CỘT TRÁI: Form liên hệ */}
          <div className="booking-form-box">
            <h2>Gửi tin nhắn</h2>

            <div className="form-group">
              <label>Họ và tên</label>
              <input type="text" placeholder="Nhập họ và tên" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="example@email.com" />
            </div>

            <div className="form-group">
              <label>Chủ đề</label>
              <select>
                <option>Hỏi về dịch vụ</option>
                <option>Góp ý / Phản hồi</option>
                <option>Báo lỗi</option>
                <option>Hợp tác</option>
              </select>
            </div>

            <div className="form-group">
              <label>Nội dung</label>
              <textarea rows="5" placeholder="Nhập nội dung tin nhắn..."></textarea>
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              📨 Gửi tin nhắn
            </button>
          </div>

          {/* CỘT PHẢI: Thông tin liên hệ */}
          <div className="booking-info-box">
            <h3>Thông tin liên hệ</h3>
            <ul className="booking-notes">
              <li>📍 123 Nguyễn Huệ, Q.1, TP.HCM</li>
              <li>📞 Hotline: 1900 1234</li>
              <li>✉️ support@medbook.vn</li>
              <li>🕐 Thứ 2 – Thứ 7: 7:00 – 20:00</li>
              <li>🕐 Chủ nhật: 8:00 – 17:00</li>
            </ul>

            <div className="booking-contact">
              <p>Phản hồi trong vòng</p>
              <p className="hotline">2 giờ làm việc</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
export default ContactPage;
