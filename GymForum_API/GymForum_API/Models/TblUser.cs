using System;
using System.Collections.Generic;

#nullable disable

namespace GymForum_API.Models
{
    public partial class TblUser
    {
        public TblUser()
        {
            TblAnswers = new HashSet<TblAnswer>();
            TblPosts = new HashSet<TblPost>();
        }

        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }
        public string UserDesignation { get; set; }
        public int UserExperience { get; set; }

        public virtual ICollection<TblAnswer> TblAnswers { get; set; }
        public virtual ICollection<TblPost> TblPosts { get; set; }
    }
}
