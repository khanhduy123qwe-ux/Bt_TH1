import {doctors} from '../data/doctors';
import { Link } from 'react-router-dom';

function DoctorsPages() {
  return (
    <div className="page-wrapper">
      {/* Tiêu đề trang */}
      <div className="page-header">
        <h1>Đội ngũ bác sĩ</h1>
        <p>Chọn bác sĩ phù hợp với nhu cầu của bạn</p>
      </div>

      {/* Lưới danh sách bác sĩ */}
      <div className="section-inner">
        <div className="doctors-grid">
          {doctors.map((doc, index) => (
            <div className="doctor-card" key={index}>
              <div className="doctor-avatar">{doc.emoji}</div>
              <div className="doctor-info">
                <h4>{doc.name}</h4>
                <div className="specialty">{doc.specialty}</div>
                <div className="doctor-meta">
                  <span className="rating">★ {doc.rating} ({doc.reviews})</span>
                  {/* Link to="/booking" để chuyển sang trang đặt lịch */}
                  <Link to="/booking" className="book-link">Đặt lịch</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default DoctorsPages;
