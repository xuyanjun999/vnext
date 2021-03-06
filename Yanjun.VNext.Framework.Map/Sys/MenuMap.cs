﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.VNext.Framework.Domain.Entity.Sys;

namespace Yanjun.VNext.Framework.Mapping.Sys
{
    public class MenuMap : EntityMapBase<MenuEntity>
    {
        public MenuMap():base("SGEAP_CORE_Menu")
        {
            this.HasOptional(x => x.Parent).WithMany().HasForeignKey<long?>(x => x.ParentID);
        }
    }
}
