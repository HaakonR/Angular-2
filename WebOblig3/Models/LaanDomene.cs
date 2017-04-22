using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebOblig3.Models {
    public class DomeneKunde {
        [Required(ErrorMessage = "Personnummer må oppgis.")]
        [RegularExpression(@"[0-9]{11}", ErrorMessage = "Personnummer må være 11 siffer.")]
        [Display(Name = "Personnummer")]
        public string personnummer { get; set; }

        [Required(ErrorMessage = "Telefonnummer må oppgis.")]
        [RegularExpression(@"[0-9]{8}", ErrorMessage = "Telefonnummer må være 8 siffer.")]
        [Display(Name = "Telefonnummer")]
        public string telefonnummer { get; set; }

        [Required(ErrorMessage = "Epost må oppgis.")]
        [StringLength(30, ErrorMessage = "Maks 30 tegn i EPOST.")]
        [RegularExpression(@"[a-zA-Z0-9_.@\-]{2,30}", ErrorMessage = "Ugyldig epost.")]
        [Display(Name = "Epost")]
        public string epost { get; set; }

        [Required(ErrorMessage = "Nedbetalingstid må oppgis.")]
        [RegularExpression(@"[0-9]{2}", ErrorMessage = "Ugyldig nedbetalingstid.")]
        [Display(Name = "Nedbetalingstid")]
        public string antallAar { get; set; }

        [Required(ErrorMessage = "Ønsket låneramme må oppgis.")]
        [RegularExpression(@"[0-9]{2}", ErrorMessage = "Ugyldig ønsket låneramme.")]
        [Display(Name = "Ønsket låneramme")]
        public string grunnBelop { get; set; }

        public string maanedsBelop { get; set; }
    }
}