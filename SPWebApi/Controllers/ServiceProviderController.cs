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
    public class ServiceProviderController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET api/ServiceProvider
        public IEnumerable<ServiceProvider> GetServiceProviders()
        {
            var serviceproviders = db.ServiceProviders.Include(s => s.UserM);
            return serviceproviders.AsEnumerable();
        }

        // GET api/ServiceProvider/5
        public ServiceProvider GetServiceProvider(int id)
        {
            ServiceProvider serviceprovider = db.ServiceProviders.Find(id);
            if (serviceprovider == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return serviceprovider;
        }

        // PUT api/ServiceProvider/5
        public HttpResponseMessage PutServiceProvider(int id, ServiceProvider serviceprovider)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != serviceprovider.spid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(serviceprovider).State = EntityState.Modified;

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

        // POST api/ServiceProvider
        public HttpResponseMessage PostServiceProvider(ServiceProvider serviceprovider)
        {
            if (ModelState.IsValid)
            {
                db.ServiceProviders.Add(serviceprovider);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, serviceprovider);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = serviceprovider.spid }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ServiceProvider/5
        public HttpResponseMessage DeleteServiceProvider(int id)
        {
            ServiceProvider serviceprovider = db.ServiceProviders.Find(id);
            if (serviceprovider == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ServiceProviders.Remove(serviceprovider);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, serviceprovider);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}