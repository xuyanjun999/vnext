Ext.define("xf.core.component.grid.DataGridCtr", {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xf-gridctr',

    privates: {
        //_dialog:null
    },

    control: {
        'button[action]': {
            'click': 'onActionButtonClick'
        }
    },


    onActionButtonClick: function (btn) {
        var action = btn.action;
        this.onExecuteAction(action, btn);

    },

    onExecuteAction: function (command, btn) {
        //if (this.fireViewEvent('childcommand', command, btn) === false) {
        //    return false;
        //};
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

        cmdHandlerName = cmdHandlerName.replace(this.view.name.toLowerCase() + '_', '');
        fn = this.view[cmdHandlerName];
        if (Ext.isFunction(fn)) {
            if (fn.call(this.view, btn) === false) return;
        }
        fn = this[cmdHandlerName];
        if (Ext.isFunction(fn)) {
            if (fn.call(this, btn) === false) return;
        }

        //console.log('not found#', cmdHandlerName);
    },


    add_execute: function (btn) {
        var grid = this.view;

        var record = Ext.create(grid.model);
        record.setId(0);
        //grid.getStore().insert(0, record);
        var form = grid.ownerCt.getLayout().next();
        form.store = grid.getStore();
        console.log(record);
        form.reset();
        form.loadRecord(record);

        return false;
    },

    edit_execute: function (btn) {
        var grid = this.view;
        var records = grid.getSelection();
        if (!records || records.length <= 0) {
            xf.toast.error("请选中要编辑的数据!");
            return false;
        }
        var record = records[0];
        var form = grid.ownerCt.getLayout().next();
        console.log(record);
        form.reset();
        form.loadRecord(record);

        return false;
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

    refresh_execute: function () {
        debugger
        var store = this.view.getStore();
        store.clearFilter();
        store.customFilter = null;
        store.load();
    },
});