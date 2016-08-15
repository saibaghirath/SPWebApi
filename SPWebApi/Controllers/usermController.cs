using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using SPWebApi.Models;

namespace SPWebApi.Controllers
{
    public class usermController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET api/userm
        public IEnumerable<UserM> GetUserMs()
        {
            return db.UserMs.AsEnumerable();
        }
        
        // GET api/userm/5
        public UserM GetUserM(int id)
        {
            UserM userm = db.UserMs.Find(id);
            if (userm == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return userm;
        }

        // PUT api/userm/5
        public HttpResponseMessage PutUserM(int id, UserM userm)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != userm.uid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(userm).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/userm
        public HttpResponseMessage PostUserM(UserM userm)
        {
            if (ModelState.IsValid)
            {
                db.UserMs.Add(userm);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, userm);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = userm.uid }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/userm/5
        public HttpResponseMessage DeleteUserM(int id)
        {
            UserM userm = db.UserMs.Find(id);
            if (userm == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.UserMs.Remove(userm);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, userm);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}