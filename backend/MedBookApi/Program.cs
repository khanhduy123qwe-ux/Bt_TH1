using MedBookApi.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Encodings.Web;
using System.Text.Unicode;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Encoder = JavaScriptEncoder.Create(UnicodeRanges.All);
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

ServerVersion serverVersion;

try
{
    serverVersion = ServerVersion.AutoDetect(connectionString);
}
catch
{
    serverVersion = new MySqlServerVersion(new Version(8, 0, 0));
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        connectionString,
        serverVersion,
        mySqlOptions => mySqlOptions.EnableRetryOnFailure()
    ));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

await DbSeeder.SeedAsync(app.Services);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", (IWebHostEnvironment environment) =>
{
    if (environment.IsDevelopment())
    {
        return Results.Redirect("/swagger");
    }

    return Results.Ok(new
    {
        name = "MedBook API",
        status = "Running",
        endpoints = new[] { "/api/doctors", "/api/bookings" }
    });
});

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();
