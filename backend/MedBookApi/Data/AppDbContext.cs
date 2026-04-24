using MedBookApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MedBookApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasCharSet("utf8mb4");
            modelBuilder.UseCollation("utf8mb4_unicode_ci");
        }
    }
}
