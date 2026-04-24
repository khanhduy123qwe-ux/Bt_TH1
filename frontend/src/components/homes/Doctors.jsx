import doctors from '../../data/doctors';
import { Link } from 'react-router-dom';

function Doctors() {
  return (
    <section className="doctors-section" id="doctors">
      <div className="section-inner">
        <div className="doctors-header">
          <div>
            <div className="section-label">Bác sĩ</div>
            <h2 className="section-title">
              
              Đội ngũ bác sĩ chuyên nghiệp
              <br />
              <em>uy tín và tận tâm</em>
            </h2>
          </div>
          <Link to="/doctors" className="btn-secondary">
            Xem tất cả
          </Link>
        </div>

        <div className="doctors-grid">
          {doctors.slice(0, 4).map((doc, index) => (
            <div className="doctor-card" key={index}>
              <div className="doctor-avatar">{doc.emoji}</div>
              <div className="doctor-info">
                <h4>{doc.name}</h4>
                <div className="specialty">{doc.specialty}</div>
                <div className="doctor-meta">
                  <span className="rating">★ {doc.rating} ({doc.reviews})</span>
                  <Link to="/booking" className="book-link">
                    Đặt lịch
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Doctors;
