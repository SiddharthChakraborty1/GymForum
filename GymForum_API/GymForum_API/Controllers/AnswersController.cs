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
    public class AnswersController : ControllerBase
    {
        private readonly GymForumContext _context;

        public AnswersController(GymForumContext context)
        {
            _context = context;
        }

        // GET: api/Answers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblAnswer>>> GetTblAnswers()
        {
            return await _context.TblAnswers.ToListAsync();
        }

        // GET: api/Answers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblAnswer>> GetTblAnswer(int id)
        {
            var tblAnswer = await _context.TblAnswers.FindAsync(id);

            if (tblAnswer == null)
            {
                return NotFound();
            }

            return tblAnswer;
        }

        // PUT: api/Answers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblAnswer(int id, TblAnswer tblAnswer)
        {
            if (id != tblAnswer.AnswerId)
            {
                return BadRequest();
            }

            _context.Entry(tblAnswer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TblAnswerExists(id))
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

        // POST: api/Answers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TblAnswer>> PostTblAnswer(TblAnswer tblAnswer)
        {
            _context.TblAnswers.Add(tblAnswer);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TblAnswerExists(tblAnswer.AnswerId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTblAnswer", new { id = tblAnswer.AnswerId }, tblAnswer);
        }

        // DELETE: api/Answers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblAnswer(int id)
        {
            var tblAnswer = await _context.TblAnswers.FindAsync(id);
            if (tblAnswer == null)
            {
                return NotFound();
            }

            _context.TblAnswers.Remove(tblAnswer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TblAnswerExists(int id)
        {
            return _context.TblAnswers.Any(e => e.AnswerId == id);
        }
    }
}
