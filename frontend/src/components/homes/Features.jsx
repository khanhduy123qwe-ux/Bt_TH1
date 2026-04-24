//  5. FEATURES SECTION 
// Phần giới thiệu các tính năng nổi bật
import features from '../../data/features';
function Features() {
  
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
export default Features;

