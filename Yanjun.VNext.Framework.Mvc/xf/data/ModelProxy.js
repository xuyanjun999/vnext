Ext.define("xf.core.data.ModelProxy", {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.xf-modelproxy',
    config: {
        paramsAsJson: true,
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        api: {
            create: 'create',
            read: 'read',
            update: 'update',
            destroy: 'delete'
        },
        filterParam: 'Filter',
        limitParam: 'Limit',
        pageParam: 'Page',
        startParam: 'Start',
        sortParam: 'Sort',
        directionParam: 'SortDir',
        simpleSortMode: true,
        reader: {
            type: 'json',
            rootProperty: 'Entitys',
            successProperty: 'Success',
            totalProperty: 'Count'
        },
        writer: {
            type:'xf-jsonwriter'
        }
    },
    constructor: function (config) {
        this.callParent([config]);
        var me = this;
        me.setApi({
            create: me.url+"/create",
            read: me.url + "/single",
            update: me.url + "/update",
            destroy: me.url + "/delete",
        });
    }
})