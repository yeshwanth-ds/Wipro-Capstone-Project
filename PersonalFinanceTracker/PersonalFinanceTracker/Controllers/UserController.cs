using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonalFinanceTracker.Models;
using PersonalFinanceTracker.Services;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PersonalFinanceTracker.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Name) || string.IsNullOrWhiteSpace(user.Email) || string.IsNullOrWhiteSpace(user.PasswordHash))
                return BadRequest("Invalid user data.");

            if (await _userService.IsEmailExists(user.Email))
                return BadRequest("Email already exists.");

            await _userService.RegisterUser(user);
            return Ok(new { message = "User registered successfully!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Dictionary<string, string> loginRequest)
        {
            if (!loginRequest.ContainsKey("Email") || !loginRequest.ContainsKey("PasswordHash") ||
                string.IsNullOrWhiteSpace(loginRequest["Email"]) || string.IsNullOrWhiteSpace(loginRequest["PasswordHash"]))
            {
                return BadRequest("Invalid credentials.");
            }

            string email = loginRequest["Email"];
            string password = loginRequest["PasswordHash"];

            var user = await _userService.AuthenticateUser(email, password);
            if (user == null)
                return Unauthorized("Invalid credentials.");

            var token = _userService.GenerateJwtToken(user);


            return Ok(new { token });
        }

        [HttpGet("total-income")]
        [Authorize]
        public async Task<IActionResult> GetTotalIncome()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");

            int userId = int.Parse(userIdClaim.Value);
            var totalIncome = await _userService.GetTotalIncome(userId);

            return Ok(new { TotalIncome = totalIncome });
        }

        [HttpGet("total-expense")]
        [Authorize]
        public async Task<IActionResult> GetTotalExpense()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");

            int userId = int.Parse(userIdClaim.Value);
            var totalExpense = await _userService.GetTotalExpense(userId);

            return Ok(new { TotalExpense = totalExpense });
        }

        [HttpGet("current-balance")]
        [Authorize]
        public async Task<IActionResult> GetCurrentBalance()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User ID not found in token.");

            int userId = int.Parse(userIdClaim.Value);
            var balance = await _userService.GetCurrentBalance(userId);

            return Ok(new { CurrentBalance = balance });
        }
    }
}
