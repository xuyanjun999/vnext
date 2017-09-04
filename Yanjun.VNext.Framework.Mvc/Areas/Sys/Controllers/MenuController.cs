using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yanjun.VNext.Framework.Domain.Entity.Sys;

namespace Yanjun.VNext.Framework.Mvc.Areas.Sys.Controllers
{
    public class MenuController : MyController<MenuEntity>
    {
        public JsonResult GetMainMenu(long? parentId)
        {
            string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "Menu.json");
            string menus = System.IO.File.ReadAllText(path);
            var objs = Newtonsoft.Json.JsonConvert.DeserializeObject<List<MenuEntity>>(menus);

            return MyJson(new { Success = true, Entitys = objs.Where(x => x.ParentID == parentId) });
        }
    }
}
