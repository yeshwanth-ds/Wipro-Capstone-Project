using Microsoft.EntityFrameworkCore;
using PersonalFinanceTracker.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Expense> Expenses { get; set; }
    public DbSet<Income> Incomes { get; set; }
    public DbSet<Category> Categories { get; set; }
   

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Ensure Category Names are Unique
        modelBuilder.Entity<Category>()
            .HasIndex(c => c.Name)
            .IsUnique();

        base.OnModelCreating(modelBuilder);

        // Configure TotalIncome and TotalExpense with precision and scale
        modelBuilder.Entity<User>()
            .Property(u => u.TotalIncome)
            .HasColumnType("decimal(18, 2)");  

        modelBuilder.Entity<User>()
            .Property(u => u.TotalExpense)
            .HasColumnType("decimal(18, 2)");

        modelBuilder.Entity<Expense>()
         .Property(e => e.Amount)
         .HasColumnType("decimal(18, 2)");

        modelBuilder.Entity<Income>()
            .Property(i => i.Amount)
            .HasColumnType("decimal(18, 2)");
    }
}
