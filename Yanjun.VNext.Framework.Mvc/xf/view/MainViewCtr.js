Ext.define("xf.core.view.MainViewCtr", {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xf-mainviewctr',

    beforeload: function (store, operation, eOpts) {
        if (!operation.isRootLoad) {
            operation.setParams({
                parentId: operation.node.raw.ID
            });
        }
    },

    itemclick: function (tree, record) {
        if (record.raw.Url) {
            var tab = this.lookup("tab");
            var com = Ext.create(record.raw.Url);
            tab.add(com).show();
        }
    },

    logout: function () {
        Ext.Msg.alert("退出系统", '退出系统');
    }
});