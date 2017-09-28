using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using Yanjun.VNext.Framework.Domain.Entity;
using Newtonsoft.Json;
using Yanjun.VNext.Framework.Domain.Entity.Org;
using System.ComponentModel;

namespace Yanjun.VNext.Framework.Domain.Entity.Org
{
    /// <summary>
    /// 公司部门
    /// </summary>
    public class DepartmentEntity : BaseAcsRecTreeNodeEntity
    {
        /// <summary>
        /// 部门中文名
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 部门编码
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 部门电话
        /// </summary>
        public string Tel { get; set; }

        /// <summary>
        /// 部门邮箱
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// 父部门ID
        /// </summary>
        public long? ParentID { get; set; }
        /// <summary>
        /// 父部门
        /// </summary>
        [JsonIgnore]
        public DepartmentEntity Parent { get; set; }

        /// <summary>
        /// 公司ID
        /// </summary>
        public long CompyID { get; set; }
        /// <summary>
        /// 所属公司对象
        /// </summary>
        public CompanyEntity Company { get; set; }

        /// <summary>
        ///描述
        ///</summary>
        [Description("描述")]
        public string Remark { get; set; }
    }
}
