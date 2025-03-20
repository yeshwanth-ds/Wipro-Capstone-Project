using Microsoft.EntityFrameworkCore;
using PersonalFinanceTracker.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PersonalFinanceTracker.Services
{
    public class ExpenseService
    {
        private readonly AppDbContext _context;

        public ExpenseService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<dynamic>> GetUserExpensesAsync(int userId)
        {
            var expenses = await _context.Expenses
                .Where(e => e.UserId == userId)
                .Include(e => e.Category)
                .Select(e => new
                {
                    e.ExpenseId,
                    e.UserId,
                    e.CategoryId,
                    CategoryName = e.Category != null ? e.Category.Name : "Unknown",
                    e.Amount,
                    e.Date,
                    e.Notes
                })
                .ToListAsync();

            return expenses.Cast<dynamic>().ToList();
        }


        public async Task<Expense?> AddExpenseAsync(Expense expense)
        {
            var categoryExists = await _context.Categories.AnyAsync(c => c.CategoryId == expense.CategoryId);
            if (!categoryExists)
            {
                return null;
            }

            var user = await _context.Users.FindAsync(expense.UserId);
            if (user != null)
            {
                user.TotalExpense += expense.Amount;
            }

            expense.Date = DateTime.UtcNow;
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();

            return expense;
        }

        public async Task<Expense?> UpdateExpenseAsync(int userId, int id, Expense updatedExpense)
        {
            var existingExpense = await _context.Expenses.FindAsync(id);
            if (existingExpense == null || existingExpense.UserId != userId)
                return null;

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return null;

            user.TotalExpense -= existingExpense.Amount;
            user.TotalExpense += updatedExpense.Amount;

            existingExpense.Amount = updatedExpense.Amount;
            existingExpense.CategoryId = updatedExpense.CategoryId;
            existingExpense.Notes = updatedExpense.Notes;

            await _context.SaveChangesAsync();
            return existingExpense;
        }

        public async Task<bool> DeleteExpenseAsync(int userId, int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null || expense.UserId != userId)
                return false;

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return false;

            user.TotalExpense -= expense.Amount;

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<dynamic>> GetFilteredUserExpensesAsync(int userId, int? categoryId, DateTime? startDate, DateTime? endDate)
        {
            var query = _context.Expenses
                .Where(e => e.UserId == userId)
                .Include(e => e.Category)
                .AsQueryable();

            if (categoryId.HasValue)
            {
                query = query.Where(e => e.CategoryId == categoryId.Value);
            }

            if (startDate.HasValue)
            {
                query = query.Where(e => e.Date >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(e => e.Date <= endDate.Value);
            }

            var expenses = await query.Select(e => new
            {
                e.ExpenseId,
                e.UserId,
                e.CategoryId,
                CategoryName = e.Category != null ? e.Category.Name : "Unknown",
                e.Amount,
                e.Date,
                e.Notes
            }).ToListAsync();

            return expenses.Cast<dynamic>().ToList();
        }

    }
}
