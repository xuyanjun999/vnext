﻿using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Metadata.Edm;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Yanjun.VNext.Framework.Data.Util;

namespace Yanjun.VNext.Framework.Data.DBContext
{
    public class MyDbContext : DbContext
    {

        public ILog Log { get; set; }

        public MyDbContext() : base("default") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            string currentPath = Assembly.GetExecutingAssembly().CodeBase;
            string assembleFileName = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "bin","Yanjun.VNext.Framework.Map.dll");
            Assembly asm = Assembly.LoadFile(assembleFileName);
            modelBuilder.Configurations.AddFromAssembly(asm);
            base.OnModelCreating(modelBuilder);
        }

        private readonly static Dictionary<Type, EntitySetBase> _mappingCache
       = new Dictionary<Type, EntitySetBase>();

        private ObjectContext _ObjectContext
        {
            get { return (this as IObjectContextAdapter).ObjectContext; }
        }

        private EntitySetBase GetEntitySet(Type type)
        {
            if (_mappingCache.ContainsKey(type))
                return _mappingCache[type];

            type = GetObjectType(type);
            string baseTypeName = type.BaseType.Name;
            string typeName = type.Name;

            ObjectContext octx = _ObjectContext;
            var es = octx.MetadataWorkspace
                            .GetItemCollection(DataSpace.SSpace)
                            .GetItems<EntityContainer>()
                            .SelectMany(c => c.BaseEntitySets
                                            .Where(e => e.Name == typeName
                                            || e.Name == baseTypeName))
                            .FirstOrDefault();

            if (es == null)
                throw new ArgumentException("Entity type not found in GetEntitySet", typeName);

            // Put es in cache.
            _mappingCache.Add(type, es);

            return es;
        }

        internal String GetTableName(Type type)
        {
            EntitySetBase es = GetEntitySet(type);

            if (DbUtil.IsSqlServer())
            {
                return String.Format("[{0}].[{1}]", es.Schema, es.Table);
            }
            else if (DbUtil.IsMySql())
            {
                return String.Format("{0}", es.Table);
            }
            else
            {
                return string.Empty;
            }



            //if you are using EF6
            //return String.Format("[{0}].[{1}]", es.Schema, es.Table);

            //if you have a version prior to EF6
            //return string.Format( "[{0}].[{1}]", 
            //        es.MetadataProperties["Schema"].Value, 
            //        es.MetadataProperties["Table"].Value );
        }

        internal Type GetObjectType(Type type)
        {
            return System.Data.Entity.Core.Objects.ObjectContext.GetObjectType(type);
        }
    }
}
