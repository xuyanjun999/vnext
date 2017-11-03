Ext.define("xf.core.component.grid.DataGridFieldCtr", {
    extend: 'xf.core.component.grid.DataGridCtr',
    alias: 'controller.xf-gridfieldctr',

    control: {
        '#': {
            'beforeshow': 'onBeforeshow'
        },

    },

    add_execute: function (btn) {
        var grid = this.view;

        var record = Ext.create(grid.model);

        record.setId(0);

        record.set(grid.filterName, grid.pid);

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

        form = editWin.down("xf-form");

        form.store = grid.getStore();

        form.getForm().reset();

        form.loadRecord(record);

    },

    onRecordChange: function () {
        var me = this;
        var view = me.view;
        var form = me.view.up("xf-form");
        var record = form.getRecord();
        console.log(typeof record.getId());
        if (Ext.isNumber(record.getId())&& record.getId()>0) {

            view.show();

            view.pid = record.get(view.pname);
            view.getStore().customFilter = null;

            view.getStore().defaultFilter = [{
                property: view.filterName,
                operator: '=',
                value: view.pid
            }];

            view.fireEvent("refresh");
        }
        else {
            view.hide();
        }
    },

    onBeforeshow: function () {
        console.log("before show1");
    }


});