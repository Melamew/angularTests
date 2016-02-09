using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace MelsPlace.Model
{
    [JsonObject]
    public class Image
    {
        [JsonProperty]
        public string Name { get; set; }

        [JsonProperty]
        public string Description { get; set; }
    }

    public class ImageData : Image
    {
        [JsonProperty]
        public string Data { get; set; }
    }
}
