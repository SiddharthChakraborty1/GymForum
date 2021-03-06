using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymForum_API.Models;

namespace GymForum_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly GymForumContext _context;

        public UsersController(GymForumContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblUser>>> GetTblUsers()
        {
            return await _context.TblUsers.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblUser>> GetTblUser(int id)
        {
            var tblUser = await _context.TblUsers.FindAsync(id);

            if (tblUser == null)
            {
                return NotFound();
            }

            return tblUser;
        }

        // GET: api/Users/email
        [HttpGet("email/{email}")]
        public async Task<ActionResult<TblUser>> GetUserByEmail(string email)
        {
            bool userPresent = false;
            TblUser registeredUser = null;
            List<TblUser> userList = new List<TblUser>();
            var users = await _context.TblUsers.ToListAsync();
            users.ForEach(user =>
            {
                if (user.UserEmail == email)
                {
                    userPresent = true;
                    registeredUser = user;
                }


            });

            if(userPresent)
            {
                return registeredUser;
                
            }
            else
            {
                TblUser nonRegisterdUser = new TblUser()
                {
                    UserId = -1,
                    UserName = "null",
                    UserEmail = "null",
                    UserPassword = "null",
                    UserDesignation = "null",
                    UserExperience = -1
                };
                return nonRegisterdUser;
            }

        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblUser(int id, TblUser tblUser)
        {
            if (id != tblUser.UserId)
            {
                return BadRequest();
            }

            _context.Entry(tblUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TblUser>> PostTblUser(TblUser tblUser)
        {
            _context.TblUsers.Add(tblUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblUser", new { id = tblUser.UserId }, tblUser);
        }

        //POST : api/Users/email
        [HttpPost("email/{email}")]
        public async Task<ActionResult<TblUser>> RegisterUserWithEmail(TblUser tblUser, string email)
        {
            bool userPresent = false;
            List<TblUser> userList = new List<TblUser>();
            var users = await _context.TblUsers.ToListAsync();
            users.ForEach(user =>
            {
            if (user.UserEmail == tblUser.UserEmail)
                {
                    userPresent = true;
                }

            });
            if(userPresent)
            {
                TblUser nullUser = new TblUser()
                {
                    UserId = -1,
                    UserName= "null",
                    UserEmail = "null",
                    UserPassword = "null",
                    UserDesignation = "null",
                    UserExperience = -1

                };
                return nullUser;
            }
            else
            {
                _context.TblUsers.Add(tblUser);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetTblUser", new { id = tblUser.UserId }, tblUser);
            }
            
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblUser(int id)
        {
            var tblUser = await _context.TblUsers.FindAsync(id);
            if (tblUser == null)
            {
                return NotFound();
            }

            _context.TblUsers.Remove(tblUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblUserExists(int id)
        {
            return _context.TblUsers.Any(e => e.UserId == id);
        }
    }
}
