using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Autofac.Integration.Mvc;
using System.Reflection;
using System.Web.Mvc;
using log4net.Config;
using Yanjun.VNext.Framework.Mvc.Controllers;
using log4net;
using Yanjun.VNext.Framework.Data.DBContext;
using Yanjun.VNext.Framework.Service.Sys;
using Yanjun.VNext.Framework.Data.Repository;
using System.IO;
using Yanjun.VNext.Framework.Data.SQL;
using Yanjun.VNext.Framework.Data.Util;

namespace Yanjun.VNext.Framework.Mvc.App_Start
{
    public class AutoFacConfig
    {
        public static void Register()
        {
            var builder = new ContainerBuilder();


            RegisterLog(builder);

            RegisterDb(builder);

            RegisterData(builder);

            RegisterService(builder);

            RegisterMvc(builder);


            var container = builder.Build();


            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

        }


        static void RegisterLog(ContainerBuilder builder)
        {
            string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Config", "log4net.config");

            XmlConfigurator.Configure(new FileInfo(filePath));

            builder.Register<ILog>(x => LogManager.GetLogger(typeof(HomeController)));
        }

        static void RegisterDb(ContainerBuilder builder)
        {
            builder.Register(x => new MyDbContext()).PropertiesAutowired().InstancePerRequest();
            builder.Register(x => new RepositoryBase()).AsImplementedInterfaces().PropertiesAutowired().InstancePerRequest();


            //判断当前数据库类型
            if (DbUtil.IsSqlServer())
            {
                builder.Register(x => new MSSQLBuilder()).AsImplementedInterfaces();
            }
            else
            {
                builder.Register(x => new MySQLBuilder()).AsImplementedInterfaces();
            }
        }

        static void RegisterData(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(Assembly.GetAssembly(typeof(RepositoryBase))).Except<RepositoryBase>().Except<MSSQLBuilder>().Except<MySQLBuilder>().AsImplementedInterfaces().AsSelf().PropertiesAutowired();

        }

        static void RegisterService(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(Assembly.GetAssembly(typeof(MenuService))).AsImplementedInterfaces().AsSelf().PropertiesAutowired();
        }


        static void RegisterMvc(ContainerBuilder builder)
        {

            // Register your MVC controllers. (MvcApplication is the name of
            // the class in Global.asax.)
            builder.RegisterControllers(Assembly.GetExecutingAssembly()).PropertiesAutowired();

            // OPTIONAL: Register model binders that require DI.
            //builder.RegisterModelBinders(typeof(MvcApplication).Assembly);

            //builder.RegisterModelBinderProvider();

            //// OPTIONAL: Register web abstractions like HttpContextBase.
            //builder.RegisterModule<AutofacWebTypesModule>();

            //// OPTIONAL: Enable property injection in view pages.
            //builder.RegisterSource(new ViewRegistrationSource());

            // OPTIONAL: Enable property injection into action filters.
            builder.RegisterFilterProvider();

            // OPTIONAL: Enable action method parameter injection (RARE).
            //builder.InjectActionInvoker();

            // Set the dependency resolver to be Autofac.

        }


    }
}