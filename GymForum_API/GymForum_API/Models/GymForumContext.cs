using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace GymForum_API.Models
{
    public partial class GymForumContext : DbContext
    {
        public GymForumContext()
        {
        }

        public GymForumContext(DbContextOptions<GymForumContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblAnswer> TblAnswers { get; set; }
        public virtual DbSet<TblPost> TblPosts { get; set; }
        public virtual DbSet<TblUser> TblUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=NAG1-LHP-N07124;Database=GymForum;Trusted_Connection=True;MultipleActiveResultSets=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<TblAnswer>(entity =>
            {
                entity.HasKey(e => e.AnswerId);

                entity.ToTable("tbl_answers");

                entity.Property(e => e.AnswerId).HasColumnName("answer_id");

                entity.Property(e => e.AnswerApproved).HasColumnName("answer_approved");

                entity.Property(e => e.AnswerDownvotes).HasColumnName("answer_downvotes");

                entity.Property(e => e.AnswerPostId).HasColumnName("answer_post_id");

                entity.Property(e => e.AnswerText)
                    .IsRequired()
                    .IsUnicode(false)
                    .HasColumnName("answer_text");

                entity.Property(e => e.AnswerUploadDate)
                    .HasColumnType("date")
                    .HasColumnName("answer_upload_date");

                entity.Property(e => e.AnswerUpvotes).HasColumnName("answer_upvotes");

                entity.Property(e => e.AnswerUserId).HasColumnName("answer_user_id");

                entity.HasOne(d => d.AnswerPost)
                    .WithMany(p => p.TblAnswers)
                    .HasForeignKey(d => d.AnswerPostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tbl_answers_tbl_posts");

                entity.HasOne(d => d.AnswerUser)
                    .WithMany(p => p.TblAnswers)
                    .HasForeignKey(d => d.AnswerUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tbl_answers_tbl_users");
            });

            modelBuilder.Entity<TblPost>(entity =>
            {
                entity.HasKey(e => e.PostId);

                entity.ToTable("tbl_posts");

                entity.Property(e => e.PostId).HasColumnName("post_id");

                entity.Property(e => e.PostAnonymity).HasColumnName("post_anonymity");

                entity.Property(e => e.PostAvailablity).HasColumnName("post_availablity");

                entity.Property(e => e.PostText)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("post_text");

                entity.Property(e => e.PostUploadDate)
                    .HasColumnType("date")
                    .HasColumnName("post_upload_date");

                entity.Property(e => e.PostUserId).HasColumnName("post_user_id");

                entity.HasOne(d => d.PostUser)
                    .WithMany(p => p.TblPosts)
                    .HasForeignKey(d => d.PostUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tbl_posts_tbl_users");
            });

            modelBuilder.Entity<TblUser>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("tbl_users");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.UserDesignation)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("user_designation");

                entity.Property(e => e.UserEmail)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("user_email");

                entity.Property(e => e.UserExperience).HasColumnName("user_experience");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("user_name");

                entity.Property(e => e.UserPassword)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("user_password");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
