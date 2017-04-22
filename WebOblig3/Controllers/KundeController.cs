using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebOblig3.Models;

namespace WebOblig3.Controllers
{
    public class KundeController : ApiController
    {
        LaanDB lanDb = new LaanDB();

        // POST api/Kunde
        public HttpResponseMessage Post([FromBody]DomeneKunde kunde) {
            string OK = lanDb.NyKunde(kunde);
            if(OK == ("OK")) {
                return new HttpResponseMessage() {
                    StatusCode = HttpStatusCode.OK
                };
            }
            return new HttpResponseMessage() {
                StatusCode = HttpStatusCode.NotFound,
                Content = new StringContent("Kunne ikke sette inn kunden i DB")
            };
        }
    }
}
