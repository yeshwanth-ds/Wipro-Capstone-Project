using Microsoft.EntityFrameworkCore;
using PersonalFinanceTracker.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PersonalFinanceTracker.Services
{
    public class IncomeService
    {
        private readonly AppDbContext _context;

        public IncomeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Income>> GetUserIncomeAsync(int userId)
        {
            return await _context.Incomes
                .Where(i => i.UserId == userId)
                .ToListAsync() ?? new List<Income>(); 
        }

        public async Task<Income?> AddIncomeAsync(Income income) 
        {
            var user = await _context.Users.FindAsync(income.UserId);
            if (user == null) return null;

            user.TotalIncome += income.Amount;
            income.Date = DateTime.UtcNow;

            _context.Incomes.Add(income);
            await _context.SaveChangesAsync();
            return income;
        }

        public async Task<Income?> UpdateIncomeAsync(int userId, int id, Income updatedIncome) 
        {
            var existingIncome = await _context.Incomes.FindAsync(id);
            if (existingIncome == null || existingIncome.UserId != userId)
                return null;

            var user = await _context.Users.FindAsync(userId);
            if (user == null) return null;

            user.TotalIncome -= existingIncome.Amount;
            user.TotalIncome += updatedIncome.Amount;

            existingIncome.Amount = updatedIncome.Amount;
            existingIncome.Type = updatedIncome.Type;
            existingIncome.Notes = updatedIncome.Notes;

            await _context.SaveChangesAsync();
            return existingIncome;
        }

        public async Task<bool> DeleteIncomeAsync(int userId, int id)
        {
            var income = await _context.Incomes.FindAsync(id);
            if (income == null || income.UserId != userId)
                return false;

            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            user.TotalIncome -= income.Amount;

            _context.Incomes.Remove(income);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
