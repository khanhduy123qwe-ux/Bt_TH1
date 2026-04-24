using MedBookApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MedBookApi.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var logger = scope.ServiceProvider.GetRequiredService<ILoggerFactory>().CreateLogger("DbSeeder");

            try
            {
                await context.Database.MigrateAsync();

                var sampleDoctors = new[]
                {
                    new Doctor
                    {
                        Name = "BS. Nguyễn Minh Tuấn",
                        Specialty = "Tim mạch",
                        Rating = 4.9,
                        Reviews = 128,
                        ImageUrl = string.Empty
                    },
                    new Doctor
                    {
                        Name = "BS. Trần Thị Lan Anh",
                        Specialty = "Da liễu",
                        Rating = 4.8,
                        Reviews = 97,
                        ImageUrl = string.Empty
                    },
                    new Doctor
                    {
                        Name = "BS. Phạm Quốc Hùng",
                        Specialty = "Nhi khoa",
                        Rating = 5.0,
                        Reviews = 204,
                        ImageUrl = string.Empty
                    },
                    new Doctor
                    {
                        Name = "BS. Lê Thị Hương",
                        Specialty = "Thần kinh",
                        Rating = 4.9,
                        Reviews = 156,
                        ImageUrl = string.Empty
                    },
                    new Doctor
                    {
                        Name = "BS. Võ Thanh Bình",
                        Specialty = "Nội tổng quát",
                        Rating = 4.7,
                        Reviews = 89,
                        ImageUrl = string.Empty
                    },
                    new Doctor
                    {
                        Name = "BS. Nguyễn Thị Mai",
                        Specialty = "Sản phụ khoa",
                        Rating = 4.8,
                        Reviews = 112,
                        ImageUrl = string.Empty
                    }
                };

                var existingDoctors = await context.Doctors.ToListAsync();

                if (existingDoctors.Count == 0)
                {
                    context.Doctors.AddRange(sampleDoctors);
                    await context.SaveChangesAsync();
                    return;
                }

                var sampleByLegacyName = new Dictionary<string, Doctor>(StringComparer.OrdinalIgnoreCase)
                {
                    ["BS. Nguyen Minh Tuan"] = sampleDoctors[0],
                    ["BS. Nguyễn minh tuấn"] = sampleDoctors[0],
                    ["BS. Nguyễn Minh Tuấn"] = sampleDoctors[0],
                    ["BS. Tran Thi Lan Anh"] = sampleDoctors[1],
                    ["BS. Trần Thị Lan Anh"] = sampleDoctors[1],
                    ["BS. Pham Quoc Hung"] = sampleDoctors[2],
                    ["BS. Phạm Văn Hùng"] = sampleDoctors[2],
                    ["BS. Phạm Quốc Hùng"] = sampleDoctors[2],
                    ["BS. Le Thi Huong"] = sampleDoctors[3],
                    ["BS. Lê Thị Hương"] = sampleDoctors[3],
                    ["BS. Vo Thanh Binh"] = sampleDoctors[4],
                    ["BS. Võ Thanh Bình"] = sampleDoctors[4],
                    ["BS. Nguyen Thi Mai"] = sampleDoctors[5],
                    ["BS. Nguyễn Thị Mai"] = sampleDoctors[5]
                };

                var hasUpdates = false;

                foreach (var doctor in existingDoctors)
                {
                    if (!sampleByLegacyName.TryGetValue(doctor.Name.Trim(), out var sampleDoctor))
                    {
                        continue;
                    }

                    doctor.Name = sampleDoctor.Name;
                    doctor.Specialty = sampleDoctor.Specialty;
                    doctor.Rating = sampleDoctor.Rating;
                    doctor.Reviews = sampleDoctor.Reviews;

                    if (string.IsNullOrWhiteSpace(doctor.ImageUrl))
                    {
                        doctor.ImageUrl = sampleDoctor.ImageUrl;
                    }

                    hasUpdates = true;
                }

                if (hasUpdates)
                {
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                logger.LogWarning(ex, "Could not seed sample doctors.");
            }
        }
    }
}
