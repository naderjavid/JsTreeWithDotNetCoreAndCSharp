using JsTreeWithDotNetCoreAndCSharp.Domain;
using JsTreeWithDotNetCoreAndCSharp.Infrastructure;
using JsTreeWithDotNetCoreAndCSharp.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.VisualBasic;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddDbContext<TreeDB>(opt =>
{
    opt.UseSqlServer(
        config.GetConnectionString("TreeDbConnection")
        );
});
builder.Services.AddTransient<ITreeRepository, TreeRepository>();
builder.Services.AddTransient<TreeManager>();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
