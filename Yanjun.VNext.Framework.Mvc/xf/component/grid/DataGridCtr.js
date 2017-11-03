Ext.define("xf.core.component.grid.DataGridCtr", {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xf-gridctr',

    privates: {
        //_dialog:null
    },

    control: {
        'button[action]': {
            'click': 'onActionButtonClick'
        },

    },


    onActionButtonClick: function (btn) {
        var action = btn.action;
        this.onExecuteAction(action, btn);

    },

    onExecuteAction: function (command, btn) {

        var cmdHandlerName = command.toLowerCase() + '_execute';
        var fn = this.view[cmdHandlerName];
        if (Ext.isFunction(fn)) {
            fn.call(this.view, btn);
            return;
        }
        fn = this[cmdHandlerName];
        if (Ext.isFunction(fn)) {
            fn.call(this, btn);
            return;
        }

        fn = this[cmdHandlerName];
        if (Ext.isFunction(fn)) {
            fn.call(this, btn); return;
        }

        //cmdHandlerName = cmdHandlerName.replace(this.view.name.toLowerCase() + '_', '');
        //fn = this.view[cmdHandlerName];
        //if (Ext.isFunction(fn)) {
        //    if (fn.call(this.view, btn) === false) return;
        //}


        //console.log('not found#', cmdHandlerName);
    },


    add_execute: function (btn) {
        var grid = this.view;

        var record = Ext.create(grid.model);

        record.setId(0);

        var form = grid.ownerCt.down("xf-form");

        form.getViewModel().set("isAdd", true);

        form.getForm().reset();

        form.loadRecord(record);

        form.store = grid.getStore();

        grid.ownerCt.getLayout().next();
     
    },

    edit_execute: function (btn) {
        var grid = this.view;

        var records = grid.getSelection();

        if (!records || records.length <= 0) {
            xf.toast.error("请选中要编辑的数据!");
            return;
        }
        var record = records[0];

        var form = grid.ownerCt.down("xf-form");

        form.getViewModel().set("isAdd", false);
        
        form.getForm().reset();

        form.loadRecord(record);

        form.store = grid.getStore();

        grid.ownerCt.getLayout().next();
    },

    delete_execute: function (btn) {
        var grid = this.view;
        var records = grid.getSelection();
        if (!records || records.length <= 0) {
            xf.toast.error("请选中要删除的数据!");
            return;
        }

        xf.message.confirm("确认", "确定删除选定的[" + records.length + "]行数据?", function (res) {
            if (res == "yes") {
                var url = records[0].getProxy().getUrl();
                var ids = records.map(function (item) { return item.getId(); });
                xf.utils.ajax({
                    url: url + "/delete",
                    jsonData: { ids: ids },
                    success: function (s, result) {
                        grid.getStore().load();
                    },
                    failure: function (s, result) {
                        xf.message.error(result.Message);
                    }
                });
            }

        });



    },

    import_execute: function (btn) {
        var uploadPanel = Ext.create('Ext.ux.upload.Panel', {
            uploader: 'Ext.ux.upload.uploader.FormDataUploader',
            uploaderOptions: {
                url: btn.url
            },
            synchronous: false
        });

        var uploadDialog = Ext.create('Ext.ux.upload.Dialog', {
            dialogTitle: 'My Upload Dialog',
            panel: uploadPanel
        });

        this.mon(uploadDialog, 'uploadcomplete', function (uploadPanel, manager, items, errorCount) {
            // this.uploadComplete(items);
            if (!errorCount) {
                uploadDialog.close();
            }
        }, this);

        uploadDialog.show();
    },

    onRowDblClick: function () {
        console.log(this);
        this.edit_execute();
    },

    quicksearch_execute: function () {
        alert("快搜索了");
    },

    onRefresh: function () {
        var store = this.view.getStore();
        store.clearFilter();
        store.customFilter = null;
        store.load();
    },

    refresh_execute: function () {
        var grid = this.view;
        grid.fireEvent("refresh");

    },
});