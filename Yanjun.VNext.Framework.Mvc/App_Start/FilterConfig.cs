using System.Web;
using System.Web.Mvc;
using Yanjun.VNext.Framework.Mvc.Filter;
using Yanjun.VNext.Framework.Mvc.Filter.Attribute;

namespace Yanjun.VNext.Framework.Mvc
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {

            filters.Add(new MyActionAttribute());
           // filters.Add(new LoginFilterAttribute());
            filters.Add(new MyExceptionHandleAttribute());
            // filters.Add(new HandleErrorAttribute());
        }
    }
}
