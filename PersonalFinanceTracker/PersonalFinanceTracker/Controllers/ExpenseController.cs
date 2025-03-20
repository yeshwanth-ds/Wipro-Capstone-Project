using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonalFinanceTracker.Models;
using PersonalFinanceTracker.Services;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PersonalFinanceTracker.Controllers
{
    [Route("api/expenses")]
    [ApiController]
    [Authorize]
    public class ExpenseController : ControllerBase
    {
        private readonly ExpenseService _expenseService;

        public ExpenseController(ExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        [HttpPost]
        public async Task<IActionResult> AddExpense([FromBody] Expense expense)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");

            expense.UserId = int.Parse(userIdClaim.Value);

            var addedExpense = await _expenseService.AddExpenseAsync(expense);
            if (addedExpense == null)
                return BadRequest("Invalid CategoryId or user not found.");

            return CreatedAtAction(nameof(GetUserExpenses), new { userId = expense.UserId }, addedExpense);
        }

        [HttpGet("my-expenses")]
        public async Task<IActionResult> GetUserExpenses()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");

            int userId = int.Parse(userIdClaim.Value);
            var expenses = await _expenseService.GetUserExpensesAsync(userId);

            if (!expenses.Any())
                return NotFound("No expenses found for this user.");

            return Ok(expenses);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpense(int id, [FromBody] Expense updatedExpense)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");

            int userId = int.Parse(userIdClaim.Value);
            var expense = await _expenseService.UpdateExpenseAsync(userId, id, updatedExpense);

            if (expense == null)
                return NotFound("Expense record not found or access denied.");

            return Ok(expense);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");

            int userId = int.Parse(userIdClaim.Value);
            var result = await _expenseService.DeleteExpenseAsync(userId, id);

            if (!result)
                return NotFound("Expense record not found or access denied.");

            return Ok(new { message = "Expense deleted successfully." });
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetFilteredExpenses([FromQuery] int? categoryId, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");

            int userId = int.Parse(userIdClaim.Value);
            var expenses = await _expenseService.GetFilteredUserExpensesAsync(userId, categoryId, startDate, endDate);

            if (expenses == null || expenses.Count == 0)
                return NotFound("No matching expenses found.");

            return Ok(expenses);
        }
    }
}
