using System.Collections.Generic;
using System.Web.Http;
using MelsPlace.Model;

namespace MelsPlace.Api.Controllers
{
    public class ImagesController : ApiController
    {
        // GET: api/Images
        public IEnumerable<Image> Get()
        {
            return new[] {new Image {Description = "This is just a test image", Name = "Image 1", Path = "img/image1.jpg"}};
        }

        // GET: api/Images/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Images
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Images/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Images/5
        public void Delete(int id)
        {
        }
    }
}
