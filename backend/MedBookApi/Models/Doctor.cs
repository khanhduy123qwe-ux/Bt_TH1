namespace MedBookApi.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Specialty { get; set; } = string.Empty;
        public double Rating { get; set; }
        public int Reviews { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }
}