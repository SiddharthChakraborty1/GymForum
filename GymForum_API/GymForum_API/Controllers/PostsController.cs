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
    public class PostsController : ControllerBase
    {
        private readonly GymForumContext _context;

        public PostsController(GymForumContext context)
        {
            _context = context;
        }

        // GET: api/Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblPost>>> GetTblPosts()
        {
            return await _context.TblPosts.ToListAsync();
        }

        // GET: api/Posts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblPost>> GetTblPost(int id)
        {
            var tblPost = await _context.TblPosts.FindAsync(id);

            if (tblPost == null)
            {
                return NotFound();
            }

            return tblPost;
        }

        // PUT: api/Posts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblPost(int id, TblPost tblPost)
        {
            if (id != tblPost.PostId)
            {
                return BadRequest();
            }

            _context.Entry(tblPost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblPostExists(id))
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

        // POST: api/Posts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TblPost>> PostTblPost(TblPost tblPost)
        {
            _context.TblPosts.Add(tblPost);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TblPostExists(tblPost.PostId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTblPost", new { id = tblPost.PostId }, tblPost);
        }

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblPost(int id)
        {
            var tblPost = await _context.TblPosts.FindAsync(id);
            if (tblPost == null)
            {
                return NotFound();
            }

            _context.TblPosts.Remove(tblPost);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblPostExists(int id)
        {
            return _context.TblPosts.Any(e => e.PostId == id);
        }
    }
}
