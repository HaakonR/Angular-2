using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebOblig3.Models {
    public class LaanDB {
        
        // Metode som lagrer en ny kunde/søknad
        public string NyKunde(DomeneKunde kunde) {
            using (KundeContext db = new KundeContext()) {
                var funnetKunde = db.Kunder.Find(kunde.personnummer);
                if (funnetKunde != null) {
                    return "KUNDEN EKSISTERER";
                }
                var nyKunde = new Kunde() {
                    Personnummer = kunde.personnummer,
                    Epost = kunde.epost,
                    Telefonnummer = kunde.telefonnummer,
                    AntallAar = kunde.antallAar,
                    GrunnBelop = kunde.grunnBelop,
                    MaanedsBelop = kunde.maanedsBelop
                };
                try {
                    db.Kunder.Add(nyKunde);
                    db.SaveChanges();
                    return "OK";
                } catch (Exception e) {
                    return "DBFEIL";
                }
            }
        }
    }
}