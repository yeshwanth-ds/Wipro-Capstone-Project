using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonalFinanceTracker.Models;
using PersonalFinanceTracker.Services;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PersonalFinanceTracker.Controllers
{
    [Route("api/income")]
    [ApiController]
    [Authorize]
    public class IncomeController : ControllerBase
    {
        private readonly IncomeService _incomeService;

        public IncomeController(IncomeService incomeService)
        {
            _incomeService = incomeService;
        }

        [HttpGet("my-income")]
        public async Task<IActionResult> GetLoggedInUserIncome()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");

            int userId = int.Parse(userIdClaim.Value);
            var incomes = await _incomeService.GetUserIncomeAsync(userId);

            if (incomes == null || incomes.Count == 0)
                return NotFound("No income records found for this user.");

            return Ok(incomes);
        }

        [HttpPost]
        public async Task<IActionResult> AddIncome([FromBody] Income income)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");

            income.UserId = int.Parse(userIdClaim.Value);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdIncome = await _incomeService.AddIncomeAsync(income);
            if (createdIncome == null)
                return NotFound("User not found.");

            return CreatedAtAction(nameof(GetLoggedInUserIncome), new { userId = createdIncome.UserId }, createdIncome);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIncome(int id, [FromBody] Income updatedIncome)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");

            int userId = int.Parse(userIdClaim.Value);
            var updatedRecord = await _incomeService.UpdateIncomeAsync(userId, id, updatedIncome);

            if (updatedRecord == null)
                return NotFound("Income record not found or access denied.");

            return Ok(updatedRecord);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncome(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");

            int userId = int.Parse(userIdClaim.Value);
            var deleted = await _incomeService.DeleteIncomeAsync(userId, id);

            if (!deleted)
                return NotFound("Income record not found or access denied.");

            return Ok(new { message = "Income deleted successfully." });
        }
    }
}
