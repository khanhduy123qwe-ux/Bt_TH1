using MedBookApi.Data;
using MedBookApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedBookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            return await _context.Bookings
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
                return NotFound(new { message = "Không tìm thấy lịch hẹn" });

            return booking;
        }

        [HttpPost]
        public async Task<ActionResult<Booking>> CreateBooking(Booking booking)
        {
            var doctorExists = await _context.Doctors.AnyAsync(d => d.Id == booking.DoctorId);

            if (!doctorExists)
                return BadRequest(new { message = "Bác sĩ không hợp lệ" });

            booking.CreatedAt = DateTime.UtcNow;
            booking.AppointmentDate = booking.AppointmentDate.Date;

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, booking);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBooking(int id, Booking booking)
        {
            if (id != booking.Id)
                return BadRequest(new { message = "Id không khớp" });

            var doctorExists = await _context.Doctors.AnyAsync(d => d.Id == booking.DoctorId);

            if (!doctorExists)
                return BadRequest(new { message = "Bác sĩ không hợp lệ" });

            booking.AppointmentDate = booking.AppointmentDate.Date;

            _context.Entry(booking).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
                return NotFound(new { message = "Không tìm thấy lịch hẹn" });

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
