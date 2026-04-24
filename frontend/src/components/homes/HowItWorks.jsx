import steps from '../../data/steps';

function HowItWorks() {
  

  return (
    <section className="how-section" id="how">
      <div className="section-inner">
        <div className="section-label light">Cách hoạt động</div>
        <h2 className="section-title light">
          Đặt lịch trong<br/><em>4 bước đơn giản</em>
        </h2>
        <p className="section-sub light">
          Không cần tài khoản phức tạp — chỉ cần vài thao tác là bạn
          đã có lịch hẹn ngay hôm nay.
        </p>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div className="step" key={index}>
              <div className="step-num">{step.num}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default HowItWorks;