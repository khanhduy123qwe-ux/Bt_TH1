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
export default CallToAction;