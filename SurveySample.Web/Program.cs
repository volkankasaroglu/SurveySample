using Microsoft.EntityFrameworkCore;
using SurveySample.Domain.Services;
using SurveySample.Infrastructure;
using SurveySample.Infrastructure.Services;
using AutoMapper;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using SurveySample.Web.Middlewares;

namespace SurveySample.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            // Add services to the container.

            //builder.Services.AddControllersWithViews();

            var services = builder.Services;

            services.AddDbContext<AppDbContext>(options =>
                    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            services.AddControllers();
            services.ConfigureSwagger();

            services.AddScoped<ISurveyService, SurveyService>();
            services.AddScoped<IQuestionService, QuestionService>();
            services.AddScoped<IQuestionOptionService, QuestionOptionService>();

            var mapperConfig = new MapperConfiguration(cfg => cfg.AddProfile(new MapperProfile()));
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            var app = builder.Build();


            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
            }

            app.UseAPISwagger();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = Path.Join(app.Environment.ContentRootPath, "client");

                if (app.Environment.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });


            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");

            app.MapFallbackToFile("index.html");

            app.Run();
        }
    }
}