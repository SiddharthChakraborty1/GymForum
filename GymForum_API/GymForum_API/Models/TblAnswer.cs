using System;
using System.Collections.Generic;

#nullable disable

namespace GymForum_API.Models
{
    public partial class TblAnswer
    {
        public int AnswerId { get; set; }
        public int AnswerPostId { get; set; }
        public int AnswerUserId { get; set; }
        public string AnswerText { get; set; }
        public int AnswerUpvotes { get; set; }
        public int AnswerDownvotes { get; set; }
        public DateTime AnswerUploadDate { get; set; }
        public int AnswerApproved { get; set; }

        public virtual TblPost AnswerPost { get; set; }
        public virtual TblUser AnswerUser { get; set; }
    }
}
