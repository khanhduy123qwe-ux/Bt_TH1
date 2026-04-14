// BookingPage.jsx — Trang đặt lịch khám
import doctors from '../data/doctors';

function BookingPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Đặt lịch khám</h1>
        <p>Điền thông tin bên dưới để đặt lịch khám</p>
      </div>

      <div className="section-inner">
        <div className="booking-layout">

          {/* CỘT TRÁI: Form đặt lịch */}
          <div className="booking-form-box">
            <h2>Thông tin đặt lịch</h2>

            <div className="form-group">
              <label>Họ và tên</label>
              <input type="text" placeholder="Nhập họ và tên của bạn" />
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input type="tel" placeholder="Nhập số điện thoại" />
            </div>

            <div className="form-group">
              <label>Chọn bác sĩ</label>
              <select>
                <option value="">-- Chọn bác sĩ --</option>
                {/* Lấy danh sách bác sĩ từ data/doctors.js */}
                {doctors.map((doc, index) => (
                  <option key={index} value={doc.name}>
                    {doc.name} — {doc.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
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

            <div className="form-row">
              <div className="form-group">
                <label>Ngày khám</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Giờ khám</label>
                <select>
                  <option>08:00</option>
                  <option>09:00</option>
                  <option>10:00</option>
                  <option>14:00</option>
                  <option>15:00</option>
                  <option>16:00</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Triệu chứng / Ghi chú</label>
              <textarea rows="4" placeholder="Mô tả triệu chứng của bạn..."></textarea>
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              ✅ Xác nhận đặt lịch
            </button>
          </div>

          {/* CỘT PHẢI: Hướng dẫn */}
          <div className="booking-info-box">
            <h3>Lưu ý khi đặt lịch</h3>
            <ul className="booking-notes">
              <li>📋 Mang theo CMND/CCCD khi đến khám</li>
              <li>⏰ Đến trước giờ hẹn 15 phút</li>
              <li>💊 Mang theo đơn thuốc cũ (nếu có)</li>
              <li>📞 Sẽ có SMS xác nhận sau khi đặt lịch</li>
              <li>🔄 Có thể hủy/đổi lịch trước 24 giờ</li>
            </ul>

            <div className="booking-contact">
              <p>Cần hỗ trợ?</p>
              <p className="hotline">📞 1900 1234</p>
              <p>Thứ 2 – Thứ 7, 7:00 – 20:00</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
export default BookingPage;
