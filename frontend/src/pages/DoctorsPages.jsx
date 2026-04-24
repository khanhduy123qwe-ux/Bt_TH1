

import { useEffect, useState } from 'react';
import { getDoctors } from '../api/doctorApi';
import { Link } from 'react-router-dom';

function DoctorsPages() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (err) {
        console.error(err);
        setError('Không lấy được dữ liệu bác sĩ');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Đội ngũ bác sĩ</h1>
        <p>Chọn bác sĩ phù hợp với nhu cầu của bạn</p>
      </div>

      <div className="section-inner">
        <div className="doctors-grid">
          {doctors.map((doc) => (
            <div className="doctor-card" key={doc.id}>
              <div className="doctor-avatar">
                {doc.imageUrl ? (
                  <img
                    src={doc.imageUrl}
                    alt={doc.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  '👨‍⚕️'
                )}
              </div>

              <div className="doctor-info">
                <h4>{doc.name}</h4>
                <div className="specialty">{doc.specialty}</div>
                <div className="doctor-meta">
                  <span className="rating">★ {doc.rating} ({doc.reviews})</span>
                  <Link to="/booking" className="book-link">Đặt lịch</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorsPages;