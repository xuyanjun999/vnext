Ext.define("xf.core.component.grid.DataGridField", {
    extend: 'xf.core.component.grid.DataGrid',
    xtype: 'xf-gridfield',
    controller: 'xf-gridfieldctr',
    config: {
        //表单编辑 xf-form
        editor: null,
        height: 400,
        pname: 'ID',
        pid: null,
        filterName:'CompyID',
    },
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

        //var controller = this.getController();
       // me.on("recordchange", controller.onRecordChange, controller);
    }
});