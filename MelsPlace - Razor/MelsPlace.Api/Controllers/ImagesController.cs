using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Http;
using MelsPlace.Model;

namespace MelsPlace.Api.Controllers
{
    public class ImagesController : ApiController
    {
        private static readonly Dictionary<int, ImageData> CachedImages = new Dictionary<int, ImageData>();
        private static int currentId = 0;
#if DEBUG
        static ImagesController()
        {
            var image = LoadImageData(Path.Combine(AppDomain.CurrentDomain.RelativeSearchPath + "\\files\\image1.jpg"));
            image.Description = "This is just a test image";
            image.Name = "Image 1";
            image.Id = currentId++;
            CachedImages.Add(image.Id, image);
        }
#endif

        private static ImageData LoadImageData(string path)
        {
            if (!File.Exists(path))
                return null;
            return new ImageData
            {
                Type = Path.GetExtension(path),
                Data = Convert.ToBase64String(File.ReadAllBytes(path))
            };
        }

        // GET: api/Images
        public IEnumerable<Image> Get()
        {
            return CachedImages.Values.Select(x => new Image { Description = x.Description, Id = x.Id, Name = x.Name });
        }

        // GET: api/Images/5
        public IHttpActionResult Get(int id)
        {
            ImageData value;
            return Ok(!CachedImages.TryGetValue(id, out value) ? null : value);
        }

        // POST: api/Images
        public void Post([FromBody]ImageData value)
        {
            if (null == value) return;
            value.Id = currentId++;
            CachedImages.Add(value.Id, value);
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
