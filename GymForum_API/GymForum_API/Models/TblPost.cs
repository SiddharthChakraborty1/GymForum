using System;
using System.Collections.Generic;

#nullable disable

namespace GymForum_API.Models
{
    public partial class TblPost
    {
        public TblPost()
        {
            TblAnswers = new HashSet<TblAnswer>();
        }

        public int PostId { get; set; }
        public int PostUserId { get; set; }
        public DateTime PostUploadDate { get; set; }
        public int PostAvailablity { get; set; }

        public virtual TblUser PostUser { get; set; }
        public virtual ICollection<TblAnswer> TblAnswers { get; set; }
    }
}
