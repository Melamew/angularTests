using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;

namespace MelsPlace.Api
{
    public class JsonContentNegotiator : IContentNegotiator
    {
        private readonly JsonMediaTypeFormatter formatter;

        public JsonContentNegotiator(JsonMediaTypeFormatter formatter)
        {
            this.formatter = formatter;
        }

        public ContentNegotiationResult Negotiate(Type type, HttpRequestMessage request, IEnumerable<MediaTypeFormatter> formatters)
        {
            return new ContentNegotiationResult(formatter, new MediaTypeHeaderValue("application/json"));
        }
    }
}