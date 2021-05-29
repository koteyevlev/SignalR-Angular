using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace SignalR_Angular.EFModels
{
    public partial class SignalRContext : DbContext
    {
        public SignalRContext(DbContextOptions<SignalRContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Connections> Connections { get; set; }
        public virtual DbSet<Person> Person { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySQL("Server=localhost;user=root; Database=SignalR");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Connections>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.PersionId })
                    .HasName("PRIMARY");

                entity.ToTable("connections", "SignalR");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("'uuid()'");

                entity.Property(e => e.PersionId).HasColumnName("persionId");

                entity.Property(e => e.SignalrId)
                    .HasMaxLength(22)
                    .HasColumnName("signalrId");

                entity.Property(e => e.TimeStamp).HasColumnName("timeStamp");
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.ToTable("person", "SignalR");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasDefaultValueSql("'uuid()'");

                entity.Property(e => e.Name)
                    .HasMaxLength(45)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .HasMaxLength(45)
                    .HasColumnName("password");

                entity.Property(e => e.Username)
                    .HasMaxLength(45)
                    .HasColumnName("username");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
