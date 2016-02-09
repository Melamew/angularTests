using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using MelsPlace.Model;

namespace MelsPlace.Api.Controllers
{
    public class ImagesController : ApiController
    {
        private readonly List<ImageData> cachedImages =
        new List<ImageData>();

#if DEBUG
        public ImagesController()
        {
            Console.WriteLine(Environment.CurrentDirectory);
            cachedImages.Add(new ImageData
            {
                Description = "This is just a test image",
                Name = "Image 1",
            });
        }
#endif

        private static string LoadImageData(string path)
        {
            if (!File.Exists(path))
                return string.Empty;
            var ext = Path.GetExtension(path);
            var file = File.ReadAllBytes(path);
            return $"data:image/{ext};base64," + Convert.ToBase64String(file);
        }

        // GET: api/Images
        public IEnumerable<Image> Get()
        {
            return cachedImages;
        }

        // GET: api/Images/5
        public ImageData Get(int id)
        {
            return cachedImages.ElementAtOrDefault(id);
        }

        // POST: api/Images
        public void Post([FromBody]Image value)
        {
            //Console.WriteLine(value);
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
