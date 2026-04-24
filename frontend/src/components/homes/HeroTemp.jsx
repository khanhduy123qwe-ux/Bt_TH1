import SearchCard from './SearchCardTemp';
import StatsStrip from './StatsStripTemp';

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg"></div>
      <div className="hero-dots"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot"></span>
          Đã có hơn 50,000 bệnh nhân tin dùng
        </div>

        <h1>
          Chăm sóc sức khỏe<br/>
          thật <em>đơn giản</em> & tiện lợi
        </h1>

        <p>
          Đặt lịch khám với hơn 200 bác sĩ chuyên khoa hàng đầu.
          Nhanh chóng, minh bạch, không phải chờ đợi.
        </p>

        <div className="hero-actions">
          <a href="#search" className="btn-primary">📅 Đặt lịch khám</a>
          <a href="#doctors" className="btn-secondary">🔍 Tìm bác sĩ</a>
        </div>
      </div>

      <SearchCard />
      <StatsStrip />
    </section>
  )
}
export default Hero;
