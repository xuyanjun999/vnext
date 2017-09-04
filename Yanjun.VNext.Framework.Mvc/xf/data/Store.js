Ext.define("xf.core.data.Store", {
    extend: 'Ext.data.Store',
    alias: 'store.xf-store',
    config: {
        autoLoad: true,
        remoteFilter: true,
        remoteSort: true,
        //外键集合
        include: null,
        //默认过滤
        defaultFilter: null,
        //临时过滤
        customFilter: null,
        url: null
    },

    beforeload: function (store, operation, eOpts) {

        operation.setParams({
            include: this.include
        });


        //加过滤

    },

    constructor: function (config) {
        var me = this;

        if (!config.proxy) {
            config.proxy = {
                type: 'xf-proxy',
                url: config.url
            }
        }

        this.callParent([config]);

        this.on("beforeload", me.beforeload, me);
    }
});