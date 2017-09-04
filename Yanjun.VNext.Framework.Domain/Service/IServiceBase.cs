using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yanjun.VNext.Framework.Data.Repository;

namespace Yanjun.VNext.Framework.Domain.Service
{
    public interface IServiceBase
    {
        /// <summary>
        /// 存储操作对象
        /// </summary>
        IRepositoryBase Repository { get; set; }
    }
}
