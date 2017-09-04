using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yanjun.VNext.Framework.Code.Web;
using Yanjun.VNext.Framework.Domain.Entity.Org;
using Yanjun.VNext.Framework.Mvc.Filter.Attribute;
using System.Net;

namespace Yanjun.VNext.Framework.Mvc.Filter
{
    public class LoginFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var notChecks = (NotCheckUserAttribute[])filterContext.ActionDescriptor.GetCustomAttributes(typeof(NotCheckUserAttribute), true);
            if (notChecks == null || notChecks.Length <= 0)
            {
                var user = WebHelper.GetUser();
                if (user == null)
                {
                    filterContext.HttpContext.Response.Clear();
                    filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.OK;
                    filterContext.Result = new JsonResult
                    {
                        Data = new
                        {
                            Success = false,
                            ErrorCode=(int)HttpStatusCode.Unauthorized,
                            Message = "用户无效,请重新登录系统",
                        },
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    };
                }
            }
            // if(filterContext.Controller.ControllerContext.)
            base.OnActionExecuting(filterContext);
        }
    }
}