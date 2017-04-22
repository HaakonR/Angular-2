namespace WebOblig3.Models {
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Data.Entity;
    using System.Linq;
    using System.Data.Entity.ModelConfiguration.Conventions;
    using System.Web;
    using System.Data.Entity.Core.EntityClient;
    using System.Data.Common;

    public class KundeContext : DbContext {
        public KundeContext()
          : base("name=Kunde") {
            //Database.CreateIfNotExists();
            Database.SetInitializer<KundeContext>(null);
        }

        public KundeContext(DbConnection connection)
                : base(connection, true) {
        }

        public DbSet<Kunde> Kunder { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder) {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }

    public class Kunde {
        [Key]
        public string Personnummer { get; set; }
        public string Telefonnummer { get; set; }
        public string Epost { get; set; }
        public string AntallAar { get; set; }
        public string GrunnBelop { get; set; }
        public string MaanedsBelop { get; set; }

    }
}