using System.Collections.Concurrent;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Net.Mail;
using System.Text.Encodings.Web;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSiteOrigin", policy =>
    {
        var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() 
                             ?? new[] { "http://localhost:4200", "https://portfolio-sks-seven.vercel.app" };
        policy.WithOrigins(allowedOrigins)
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowSiteOrigin");

// In-memory rate limiting: 5 requests per IP per hour
var rateLimitTracker = new ConcurrentDictionary<string, List<DateTime>>();

app.MapPost("/api/contact", async (ContactRequest request, HttpContext context, IConfiguration config) =>
{
    // 1. Silent Honeypot rejection
    if (!string.IsNullOrWhiteSpace(request.Website))
    {
        // Bot detected, silently acknowledge with 200 OK
        return Results.Ok(new { success = true, message = "Message accepted." });
    }

    // 2. Server-side validation
    if (string.IsNullOrWhiteSpace(request.Name) ||
        string.IsNullOrWhiteSpace(request.Email) ||
        string.IsNullOrWhiteSpace(request.Message))
    {
        return Results.BadRequest(new { success = false, error = "Name, email, and message are required." });
    }

    if (!new EmailAddressAttribute().IsValid(request.Email))
    {
        return Results.BadRequest(new { success = false, error = "A valid email address is required." });
    }

    if (request.Message.Trim().Length < 10)
    {
        return Results.BadRequest(new { success = false, error = "Message must be at least 10 characters." });
    }

    // 3. IP Rate Limiting (5 requests per IP per hour)
    var clientIp = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
    var now = DateTime.UtcNow;
    var timestamps = rateLimitTracker.GetOrAdd(clientIp, _ => new List<DateTime>());

    lock (timestamps)
    {
        timestamps.RemoveAll(t => t < now.AddHours(-1));
        if (timestamps.Count >= 5)
        {
            return Results.StatusCode(StatusCodes.Status429TooManyRequests);
        }
        timestamps.Add(now);
    }

    // 4. Input sanitization
    var cleanName = HtmlEncoder.Default.Encode(request.Name.Trim());
    var cleanEmail = HtmlEncoder.Default.Encode(request.Email.Trim());
    var cleanMessage = HtmlEncoder.Default.Encode(request.Message.Trim());

    // 5. Send Email through configured provider
    try
    {
        var smtpHost = config["Smtp:Host"];
        var ownerEmail = config["Smtp:OwnerEmail"] ?? "sk72574401@gmail.com";

        if (!string.IsNullOrWhiteSpace(smtpHost))
        {
            var smtpPort = int.Parse(config["Smtp:Port"] ?? "587");
            var smtpUser = config["Smtp:Username"];
            var smtpPass = config["Smtp:Password"];

            using var client = new SmtpClient(smtpHost, smtpPort)
            {
                Credentials = new NetworkCredential(smtpUser, smtpPass),
                EnableSsl = true
            };

            var mail = new MailMessage
            {
                From = new MailAddress(smtpUser ?? ownerEmail, "Portfolio Contact Form"),
                Subject = $"New Portfolio Inquiry from {cleanName}",
                Body = $"Name: {cleanName}\nEmail: {cleanEmail}\n\nMessage:\n{cleanMessage}",
                IsBodyHtml = false
            };
            mail.To.Add(ownerEmail);
            mail.ReplyToList.Add(new MailAddress(request.Email));

            await client.SendMailAsync(mail);
        }
        else
        {
            // Logging when SMTP host is not yet configured
            Console.WriteLine($"[Contact Form] From: {cleanName} ({cleanEmail}) -> {cleanMessage}");
        }

        return Results.Ok(new { success = true, message = "Message delivered successfully." });
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"[Contact API Error]: {ex.Message}");
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    }
});

app.Run();

public record ContactRequest(
    string Name,
    string Email,
    string Message,
    string? Website
);

