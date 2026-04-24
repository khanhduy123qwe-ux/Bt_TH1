import { useEffect, useMemo, useState } from 'react';
import { createBooking } from '../api/bookingApi';
import { getDoctors } from '../api/doctorApi';

const INITIAL_FORM = {
  fullName: '',
  phoneNumber: '',
  doctorId: '',
  specialty: '',
  appointmentDate: '',
  appointmentTime: '08:00',
  symptoms: '',
};

function BookingPage() {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [doctorError, setDoctorError] = useState('');

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const specialties = useMemo(() => {
    const values = doctors.map((doctor) => doctor.specialty).filter(Boolean);
    return [...new Set(values)];
  }, [doctors]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        console.error(error);
        setDoctorError('Không thể tải danh sách bác sĩ.');
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

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
      specialty: selectedDoctor?.specialty ?? '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitMessage('');
    setSubmitError('');

    if (!formData.doctorId) {
      setSubmitError('Vui lòng chọn bác sĩ.');
      return;
    }

    setIsSubmitting(true);

    try {
      await createBooking({
        ...formData,
        doctorId: Number(formData.doctorId),
      });

      setSubmitMessage('Đặt lịch thành công. Chúng tôi sẽ liên hệ xác nhận sớm.');
      setFormData(INITIAL_FORM);
    } catch (error) {
      console.error(error);
      setSubmitError('Đặt lịch thất bại. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Đặt lịch khám</h1>
        <p>Điền thông tin bên dưới để đặt lịch khám</p>
      </div>

      <div className="section-inner">
        <div className="booking-layout">
          <form className="booking-form-box" onSubmit={handleSubmit}>
            <h2>Thông tin đặt lịch</h2>

            <div className="form-group">
              <label htmlFor="fullName">Họ và tên</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Nhập họ và tên của bạn"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Số điện thoại</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Nhập số điện thoại"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="doctorId">Chọn bác sĩ</label>
              <select
                id="doctorId"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleDoctorChange}
                required
                disabled={loadingDoctors || Boolean(doctorError)}
              >
                <option value="">-- Chọn bác sĩ --</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
              {doctorError ? <p>{doctorError}</p> : null}
            </div>

            <div className="form-group">
              <label htmlFor="specialty">Chuyên khoa</label>
              <select
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                required
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
                  min={today}
                  required
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
                placeholder="Mô tả triệu chứng của bạn..."
                value={formData.symptoms}
                onChange={handleInputChange}
              />
            </div>

            {submitError ? <p>{submitError}</p> : null}
            {submitMessage ? <p>{submitMessage}</p> : null}

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={isSubmitting || loadingDoctors || Boolean(doctorError)}
            >
              {isSubmitting ? 'Đang gửi...' : 'Xác nhận đặt lịch'}
            </button>
          </form>

          <div className="booking-info-box">
            <h3>Lưu ý khi đặt lịch</h3>
            <ul className="booking-notes">
              <li>Mang theo CMND/CCCD khi đến khám</li>
              <li>Đến trước giờ hẹn 15 phút</li>
              <li>Mang theo đơn thuốc cũ nếu có</li>
              <li>Sẽ có SMS xác nhận sau khi đặt lịch</li>
              <li>Có thể hủy/đổi lịch trước 24 giờ</li>
            </ul>

            <div className="booking-contact">
              <p>Cần hỗ trợ?</p>
              <p className="hotline">1900 1234</p>
              <p>Thứ 2 - Thứ 7, 7:00 - 20:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
