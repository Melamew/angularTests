using System.Web;
using System.Web.Http;

namespace MelsPlace
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configuration.EnsureInitialized();
        }
    }
}