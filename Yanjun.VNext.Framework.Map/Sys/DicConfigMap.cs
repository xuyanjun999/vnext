using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.VNext.Framework.Domain.Entity.Sys;

namespace Yanjun.VNext.Framework.Mapping.Sys
{
    public class DicConfigMap : EntityMapBase<DicConfigEntity>
    {
        public DicConfigMap() : base("sys_dicconfig")
        {
            this.HasOptional(x => x.Parent).WithMany().HasForeignKey<long?>(x => x.ParentID);
        }
    }
}
