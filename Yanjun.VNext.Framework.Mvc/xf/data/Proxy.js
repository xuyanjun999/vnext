Ext.define("xf.core.data.Proxy", {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.xf-proxy',
    config: {
        paramsAsJson: true,
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
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
        }
    },
    encodeFilters: function (filters) {
        return this.callParent([filters]);
    }
})