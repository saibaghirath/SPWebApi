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
    public class userdetailController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET api/userdetail
        public IEnumerable<UserDetail> GetUserDetails()
        {
            var userdetails = db.UserDetails.Include(u => u.UserM);
            return userdetails.AsEnumerable();
        }

        // GET api/userdetail/5
        public UserDetail GetUserDetail(string id)
        {
            UserDetail userdetail = db.UserDetails.Find(id);
            if (userdetail == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return userdetail;
        }

        // PUT api/userdetail/5
        public HttpResponseMessage PutUserDetail(string id, UserDetail userdetail)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != userdetail.phoneno)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(userdetail).State = EntityState.Modified;

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

        // POST api/userdetail
        public HttpResponseMessage PostUserDetail(UserDetail userdetail)
        {
            if (ModelState.IsValid)
            {
                db.UserDetails.Add(userdetail);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, userdetail);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = userdetail.phoneno }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/userdetail/5
        public HttpResponseMessage DeleteUserDetail(string id)
        {
            UserDetail userdetail = db.UserDetails.Find(id);
            if (userdetail == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.UserDetails.Remove(userdetail);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, userdetail);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}