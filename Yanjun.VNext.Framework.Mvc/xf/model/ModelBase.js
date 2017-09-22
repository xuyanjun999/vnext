Ext.define("xf.core.model.ModelBase", {
    extend: 'Ext.data.Model',
    idProperty: 'ID',

    constructor: function () {
        var me = this;
        me.proxy = {
            type: 'rest',
            url: me.api
        };
        me.callParent(arguments);
    }
});