using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;
using Yanjun.VNext.Framework.Code.Util;
using Yanjun.VNext.Framework.Code.Web;
using Yanjun.VNext.Framework.Code.Web.Dto;
using Yanjun.VNext.Framework.Data.Repository;
using static Yanjun.VNext.Framework.Code.Web.Dto.QueryArg;
using System.Text;
using Newtonsoft.Json;
using Yanjun.VNext.Framework.Domain.Entity;
using Yanjun.VNext.Framework.Mvc.Filter.Attribute;
using System.IO;

namespace Yanjun.VNext.Framework.Mvc.Areas
{
    public class MyController<T> : Controller where T : BaseEntity, new()
    {
        /// <summary>
        /// 日志对象
        /// </summary>
        public ILog Log { get; set; }

        /// <summary>
        /// 存储操作对象
        /// </summary>
        public IRepositoryBase Repository { get; set; }

        [NoTransaction]
        public virtual JsonResult Single(int id, string[] include)
        {
            RestResponseDto res = new RestResponseDto();
            //  var include = string.IsNullOrEmpty(include) ? null : include.Split(new char[] { ',' });
            T entity = Repository.QueryFirst<T>(x => x.ID == id, include);
            res.Entitys = new object[] { entity };
            res.Success = true;
            return MyJson(res);
        }

        [HttpPost]
        public virtual JsonResult Create(T entity)
        {
            RestResponseDto res = new RestResponseDto();
            //throw new Exception("1223");
            Repository.Insert(entity);
            res.Entitys = new object[] { Repository.QueryFirst<T>(x => x.ID == entity.ID) };
            res.Success = true;
            return MyJson(res);
        }

        [HttpPost]
        public virtual JsonResult Update(T entity, string[] modified)
        {
            RestResponseDto res = new RestResponseDto();
            //throw new Exception("1223");
            //var entity = Repository.QueryFirst<T>(x => x.ID == id);
            Repository.Update<T>(entity, modified);
            res.Entitys = new object[] { Repository.QueryFirst<T>(x => x.ID == entity.ID) };
            res.Success = true;
            return MyJson(res);
        }

        [NoTransaction]
        public virtual JsonResult Read(CommonAjaxArgs args)
        {
            EntityResponseDto res = new EntityResponseDto();

            var predicate = ExpressionUtil.GetSearchExpression(typeof(T), args.Filter) as Expression<Func<T, bool>>;

            args.Limit = args.Limit <= 0 ? 50 : args.Limit;

            args.Page = args.Page == 0 ? 1 : args.Page;

            if (string.IsNullOrWhiteSpace(args.Sort))
            {
                args.Sort = "ID";
                args.SortDir = "desc";
            }

            string[] includes = args.Include;
            res.Count = Repository.GetQueryExp<T>(predicate, includes).Count();
            res.Entitys = Repository.QueryPage<T>(predicate, new Pagination() { page = args.Page, rows = args.Limit, sidx = args.Sort, sord=args.SortDir}, includes);
            res.Success = true;
            return MyJson(res);
        }

        public virtual JsonResult Delete(long[] ids)
        {
            EntityResponseDto res = new EntityResponseDto();

            Repository.Delete<T>(ids);
            res.Success = true;
            return MyJson(res);
        }


        public MyJsonResult MyJson(object data, JsonRequestBehavior jsonRequestBehavior = JsonRequestBehavior.AllowGet)
        {
            MyJsonResult result = new MyJsonResult() { Data = data, JsonRequestBehavior = jsonRequestBehavior };
            return result;
        }
    }

    public class MyJsonResult : System.Web.Mvc.JsonResult
    {
        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
                throw new ArgumentNullException("context");

            var response = context.HttpContext.Response;

            response.ContentType = !String.IsNullOrEmpty(ContentType)
                ? ContentType
                : "application/json";

            if (ContentEncoding != null)
                response.ContentEncoding = ContentEncoding;


            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
            // If you need special handling, you can call another form of SerializeObject below
            var serializedObject = JsonConvert.SerializeObject(Data, settings);
            response.Write(serializedObject);
        }
    }
}