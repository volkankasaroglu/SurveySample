using Microsoft.OpenApi.Models;

namespace SurveySample.Web.Middlewares
{
    public static class SwaggerMiddleware
    {
        public static void ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SurveySample API Document", Version = "V1" });

                var securityScheme = new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    },
                    Description = "Bearer XXXXXXXXXXXXXXXXXX",
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Scheme = "Bearer"
                };
                c.AddSecurityDefinition("Bearer", securityScheme);
                c.AddSecurityRequirement(new OpenApiSecurityRequirement() {
                    { securityScheme, new string[]{ } }
                });
                c.CustomSchemaIds(type => type.ToString());
            });
        }

        public static void UseAPISwagger(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint(url: "/swagger/v1/swagger.json", name: "SurveySampleBackend");
            });
        }
    }

}
