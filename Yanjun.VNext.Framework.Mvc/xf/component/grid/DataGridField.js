Ext.define("xf.core.component.grid.DataGridField", {
    extend: 'xf.core.component.grid.DataGrid',
    xtype: 'xf-gridfield',
    controller: 'xf-gridfieldctr',
    config: {
        //表单编辑 xf-form
        editor: null,
        height: 400,
        pidName: 'ID',
        fidName: '',
    },



});