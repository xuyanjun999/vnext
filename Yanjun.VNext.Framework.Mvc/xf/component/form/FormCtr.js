Ext.define("xf.core.component.form.FormCtr", {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xf-formctr',

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
            if (fn.call(this.view, btn) === false) return;
        }
        fn = this[cmdHandlerName];
        if (Ext.isFunction(fn)) {
            if (fn.call(this, btn) === false) return;
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

    back_execute: function (btn) {
        var form = this.view;
        form.ownerCt.getLayout().prev();
    },

    save_execute: function () {
        var form = this.view;
        if (!form.isValid())
            return false;
        form.updateRecord();
        var record = form.getRecord();

        if (!record.dirty) {
            xf.toast.error("数据未修改,不需要保存!");
        }

        record.save({
            failure: function (record, operation) {
                // do something if the save failed
            },
            success: function (record, operation) {
                if (operation.getRequest().getAction() == "create") {
                    form.store.insert(0, record);
                }
                console.log(record);
                // do something if the save succeeded
            },
            callback: function (record, operation, success) {
                // do something whether the save succeeded or failed
            }
        });

    }
});