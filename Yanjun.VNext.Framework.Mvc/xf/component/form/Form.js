Ext.define("xf.core.component.form.Form", {
    extend: 'Ext.form.Panel',
    xtype: 'xf-form',
    controller: 'xf-formctr',
    layout: 'column',
    store: null,
    border: false,
    bodyPadding: 5,
    scrollable: true,
    viewModel: {
        data: {
            isAdd: false
        }
    },
    defaults: {
        labelAlign: 'top',
        columnWidth: 0.5,
        xtype: 'textfield',
        margin: ' 5 1 5 1'
    },

    makeTBar: function () {

        var me = this;
        if (!me.tbar) me.tbar = [];
        me.tbar = me.tbar.map(function (item) {
            var r = item;
            if (Ext.isString(item)) {
                r = xf.utils.getActionButton(item);
            }
            return r;
        });
        return me.tbar;
    },


   

    initComponent: function () {
        var me = this;
        me.tbar = me.makeTBar();
        this.callParent(arguments);

       // var controller = me.getController();

        //this.on('beforeshow', controller.onBeforeShow, controller);

    }
});