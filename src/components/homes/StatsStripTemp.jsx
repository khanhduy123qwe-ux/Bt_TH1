//  4. STATS STRIP
// Dải thống kê: số bác sĩ, bệnh nhân, v.v.
function StatsStrip() {
  // Dữ liệu thống kê — bạn có thể thay đổi con số ở đây
  const stats = [
    { num: '200+', label: 'Bác sĩ chuyên khoa' },
    { num: '50K+', label: 'Bệnh nhân hài lòng' },
    { num: '30+',  label: 'Chuyên khoa khác nhau' },
    { num: '4.9★', label: 'Đánh giá trung bình' },
  ]

  return (
    <div className="stats-strip">
      {/* .map() = lặp qua mảng stats, tạo ra 1 phần tử cho mỗi item */}
      {stats.map((item, index) => (
        <div className="stat" key={index}>
          <div className="stat-num">{item.num}</div>
          <div className="stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
export default StatsStrip;