using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using Newtonsoft.Json;
using Yanjun.VNext.Framework.Domain.Entity.Sys;

namespace Yanjun.VNext.Framework.Domain.Entity.Org
{
    /// <summary>
    /// 公司表映射实例
    /// </summary>
    public class CompanyEntity : BaseAcsRecTreeNodeEntity
    {
        /// <summary>
        ///编号
        ///</summary>
        [Description("编号")]
        public string Code { get; set; }
        /// <summary>
        ///名称
        ///</summary>
        [Description("名称")]
        public string Name { get; set; }
        /// <summary>
        ///地址
        ///</summary>
        [Description("地址")]
        public string Address { get; set; }
        /// <summary>
        ///电话
        ///</summary>
        [Description("电话")]
        public string Tel { get; set; }
        /// <summary>
        ///邮件
        ///</summary>
        [Description("邮件")]
        public string Email { get; set; }

        /// <summary>
        ///描述
        ///</summary>
        [Description("描述")]
        public string Remark { get; set; }
    }
}
