using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yanjun.VNext.Framework.Data.Util
{
    public class DbUtil
    {
        public static string GetDbProviderName(string connName = "Default")
        {
            string dbProviderName = System.Configuration.ConfigurationManager.ConnectionStrings[connName].ProviderName;
            return dbProviderName;
        }

        /// <summary>
        /// 当前数据库是否是SQLSERVER
        /// </summary>
        /// <returns></returns>
        public static bool IsSqlServer(string connName = "Default")
        {
            string dbProviderName = GetDbProviderName(connName);
            return dbProviderName == "System.Data.SqlClient";
        }

        /// <summary>
        /// 当前数据库是否是MYSQL
        /// </summary>
        /// <returns></returns>
        public static bool IsMySql(string connName = "Default")
        {
            string dbProviderName = GetDbProviderName(connName);
            return dbProviderName == "MySql.Data.MySqlClient";
        }
    }
}
