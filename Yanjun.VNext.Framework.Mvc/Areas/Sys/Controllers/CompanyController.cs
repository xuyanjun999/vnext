﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yanjun.VNext.Framework.Domain.Entity.Org;

namespace Yanjun.VNext.Framework.Mvc.Areas.Sys.Controllers
{
    public class CompanyController : MyController<CompanyEntity>
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}