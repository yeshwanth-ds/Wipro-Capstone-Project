using System;
using System.ComponentModel.DataAnnotations;

namespace PersonalFinanceTracker.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

       
        [Required]
        [Range(0, double.MaxValue)]
        public decimal TotalIncome { get; set; } = 0;

        [Required]
        [Range(0, double.MaxValue)]
        public decimal TotalExpense { get; set; } = 0;

        public decimal CurrentBalance => TotalIncome - TotalExpense;
    }
}
