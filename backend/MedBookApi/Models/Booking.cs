namespace MedBookApi.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public int DoctorId { get; set; }
        public string Specialty { get; set; } = string.Empty;
        public DateTime AppointmentDate { get; set; }
        public string AppointmentTime { get; set; } = string.Empty;
        public string Symptoms { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
