
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';

import HomePage from './pages/HomePage';
import DoctorsPages from './pages/DoctorsPages';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import ManageBookingsPage from './pages/ManageBookingsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    // BrowserRouter bọc ngoài cùng để toàn bộ app dùng được routing
    <BrowserRouter>
      {/* Navbar luôn hiển thị ở mọi trang */}
      <Navbar />

      {/* Routes: React sẽ hiển thị trang nào khớp với URL hiện tại */}
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/doctors"  element={<DoctorsPages />} />
        <Route path="/booking"  element={<BookingPage />} />
        <Route path="/contact"  element={<ContactPage />} />
        <Route path="/login"    element={<LoginPage />} />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute>
              <ManageBookingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Footer luôn hiển thị ở mọi trang */}
      <Footer />
    </BrowserRouter>
  )
}

export default App
