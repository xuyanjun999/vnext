Ext.define("xf.core.component.grid.DataGridFieldCtr", {
    extend: 'xf.core.component.grid.DataGridCtr',
    alias: 'controller.xf-gridfieldctr',


    add_execute: function (btn) {
        var grid = this.view;

        var record = Ext.create(grid.model);

        record.setId(0);

        record.set(grid.fidName, grid.pid);

        this.showEditWin(record);
    },

    edit_execute: function (btn) {
        var grid = this.view;

        var records = grid.getSelection();

        if (!records || records.length <= 0) {
            xf.toast.error("请选中要编辑的数据!");
            return;
        }

        var record = records[0];

        this.showEditWin(record);
    },

    showEditWin: function (record) {
        var grid = this.view;
        var form = grid.editor;
        if (!form) {
            console.log("xf-gridfield未定义editor,无法编辑.");
            return;
        }

        var editWin = Ext.create("widget.xf-formeditwindow", {
            items: [form]
        });
        editWin.show();

        form.store = grid.getStore();

        form.getForm().reset();

        form.loadRecord(record);

    },


});