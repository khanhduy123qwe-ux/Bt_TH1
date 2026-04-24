import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBooking, getBookings, updateBooking } from '../api/bookingApi';
import { getDoctors } from '../api/doctorApi';
import { logout } from '../utils/auth';

const EMPTY_FORM = {
  id: '',
  fullName: '',
  phoneNumber: '',
  doctorId: '',
  specialty: '',
  appointmentDate: '',
  appointmentTime: '08:00',
  symptoms: '',
  createdAt: '',
};

const formatDateForInput = (value) => {
  if (!value) {
    return '';
  }

  return new Date(value).toISOString().split('T')[0];
};

function ManageBookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const specialties = useMemo(() => {
    const values = doctors.map((doctor) => doctor.specialty).filter(Boolean);
    return [...new Set(values)];
  }, [doctors]);

  const selectedBooking = bookings.find((booking) => booking.id === Number(formData.id));

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const [bookingData, doctorData] = await Promise.all([getBookings(), getDoctors()]);
      setBookings(bookingData);
      setDoctors(doctorData);
    } catch (err) {
      console.error(err);
      setError('Không thể tải dữ liệu quản lý.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSelectBooking = (booking) => {
    setMessage('');
    setError('');
    setFormData({
      id: booking.id,
      fullName: booking.fullName,
      phoneNumber: booking.phoneNumber,
      doctorId: String(booking.doctorId),
      specialty: booking.specialty,
      appointmentDate: formatDateForInput(booking.appointmentDate),
      appointmentTime: booking.appointmentTime,
      symptoms: booking.symptoms ?? '',
      createdAt: booking.createdAt,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDoctorChange = (event) => {
    const doctorId = event.target.value;
    const selectedDoctor = doctors.find((doctor) => String(doctor.id) === doctorId);

    setFormData((prev) => ({
      ...prev,
      doctorId,
      specialty: selectedDoctor?.specialty ?? prev.specialty,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!formData.id) {
      setError('Vui lòng chọn một lịch hẹn để sửa.');
      return;
    }

    try {
      await updateBooking(formData.id, {
        id: Number(formData.id),
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        doctorId: Number(formData.doctorId),
        specialty: formData.specialty,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        symptoms: formData.symptoms,
        createdAt: formData.createdAt || selectedBooking?.createdAt || new Date().toISOString(),
      });

      setMessage('Cập nhật lịch hẹn thành công.');
      await loadData();
    } catch (err) {
      console.error(err);
      setError('Cập nhật thất bại. Vui lòng thử lại.');
    }
  };

  const handleDelete = async (bookingId) => {
    const confirmed = window.confirm('Bạn có chắc muốn xóa lịch hẹn này?');

    if (!confirmed) {
      return;
    }

    setMessage('');
    setError('');

    try {
      await deleteBooking(bookingId);
      setMessage('Đã xóa lịch hẹn.');
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));

      if (Number(formData.id) === bookingId) {
        setFormData(EMPTY_FORM);
      }
    } catch (err) {
      console.error(err);
      setError('Xóa lịch hẹn thất bại.');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header admin-header">
        <div>
          <h1>Quản lý lịch hẹn</h1>
          <p>Xem, chỉnh sửa và xóa các thông tin đặt lịch đã lưu trong database.</p>
        </div>
        <button type="button" className="btn-secondary" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>

      <div className="section-inner admin-layout">
        <div className="booking-form-box">
          <h2>Danh sách lịch hẹn</h2>

          {loading ? <p>Đang tải dữ liệu...</p> : null}
          {error ? <p className="form-error">{error}</p> : null}
          {message ? <p className="form-success">{message}</p> : null}

          <div className="bookings-table-wrap">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Khách hàng</th>
                  <th>Bác sĩ</th>
                  <th>Ngày</th>
                  <th>Giờ</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const doctor = doctors.find((item) => item.id === booking.doctorId);
                  const isActive = Number(formData.id) === booking.id;

                  return (
                    <tr key={booking.id} className={isActive ? 'active-row' : ''}>
                      <td>
                        <strong>{booking.fullName}</strong>
                        <span>{booking.phoneNumber}</span>
                      </td>
                      <td>{doctor?.name ?? `Bác sĩ #${booking.doctorId}`}</td>
                      <td>{formatDateForInput(booking.appointmentDate)}</td>
                      <td>{booking.appointmentTime}</td>
                      <td>
                        <div className="table-actions">
                          <button type="button" onClick={() => handleSelectBooking(booking)}>
                            Sửa
                          </button>
                          <button type="button" className="danger-action" onClick={() => handleDelete(booking.id)}>
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {!loading && bookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-table">
                      Chưa có lịch hẹn nào.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <form className="booking-form-box" onSubmit={handleSubmit}>
          <h2>Sửa lịch hẹn</h2>

          <div className="form-group">
            <label htmlFor="fullName">Họ và tên</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              disabled={!formData.id}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Số điện thoại</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              disabled={!formData.id}
            />
          </div>

          <div className="form-group">
            <label htmlFor="doctorId">Bác sĩ</label>
            <select
              id="doctorId"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleDoctorChange}
              required
              disabled={!formData.id}
            >
              <option value="">-- Chọn bác sĩ --</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="specialty">Chuyên khoa</label>
            <select
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleInputChange}
              required
              disabled={!formData.id}
            >
              <option value="">-- Chọn chuyên khoa --</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="appointmentDate">Ngày khám</label>
              <input
                id="appointmentDate"
                name="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                required
                disabled={!formData.id}
              />
            </div>

            <div className="form-group">
              <label htmlFor="appointmentTime">Giờ khám</label>
              <select
                id="appointmentTime"
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleInputChange}
                required
                disabled={!formData.id}
              >
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="symptoms">Triệu chứng / Ghi chú</label>
            <textarea
              id="symptoms"
              name="symptoms"
              rows="4"
              value={formData.symptoms}
              onChange={handleInputChange}
              disabled={!formData.id}
            />
          </div>

          <button type="submit" className="btn-primary auth-submit" disabled={!formData.id}>
            Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );
}

export default ManageBookingsPage;
