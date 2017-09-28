using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.VNext.Framework.Domain.Entity.Org;
using Yanjun.VNext.Framework.Mapping;

namespace Yanjun.VNext.Framework.Map.Org
{
    public class DepartmentMap : EntityMapBase<DepartmentEntity>
    {
        public DepartmentMap() : base("SGEAP_ORG_Department")
        {
            this.HasRequired(x => x.Company).WithMany().HasForeignKey<long>(x => x.CompyID);
            this.HasOptional(x => x.Parent).WithMany().HasForeignKey<long?>(x => x.ParentID);
        }
    }
}
