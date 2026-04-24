//SearchCard

function SearchCard() {
  return (
    <div className="search-section" id="search">
      <div className="search-card">
        {/* Dropdown chọn chuyên khoa */}
        <div className="search-field">
          <label>Chuyên khoa</label>
          <select>
            <option>Tất cả chuyên khoa</option>
            <option>Tim mạch</option>
            <option>Da liễu</option>
            <option>Nhi khoa</option>
            <option>Thần kinh</option>
            <option>Nội tổng quát</option>
          </select>
        </div>

        {/* Dropdown chọn địa điểm */}
        <div className="search-field">
          <label>Địa điểm</label>
          <select>
            <option>TP. Hồ Chí Minh</option>
            <option>Hà Nội</option>
            <option>Đà Nẵng</option>
            <option>Cần Thơ</option>
          </select>
        </div>

        {/* Input chọn ngày */}
        <div className="search-field">
          <label>Ngày khám</label>
          <input type="date" />
        </div>

        {/* Nút tìm kiếm */}
        <button className="search-btn">🔍 Tìm kiếm</button>
      </div>
    </div>
  )
}
export default SearchCard;