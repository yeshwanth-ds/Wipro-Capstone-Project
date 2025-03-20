using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PersonalFinanceTracker.Models
{
    public class Expense
    {
        [Key]
        public int ExpenseId { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; } 

        [Required]
        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;

        public string? Notes { get; set; }

        [JsonIgnore] 
        public virtual User? User { get; set; }

        [JsonIgnore] 
        public virtual Category? Category { get; set; }
    }
}
