﻿Ext.define("xf.core.component.form.FormCtr", {
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
            fn.call(this.view, btn);
            return;
        }
        fn = this[cmdHandlerName];
        if (Ext.isFunction(fn)) {
            fn.call(this, btn)
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

    back_execute: function (btn) {
        var form = this.view;
        if (Ext.isFunction(form.ownerCt.getLayout().prev)) {
            form.ownerCt.getLayout().prev();
        }
        else if (Ext.isFunction(form.ownerCt.ownerCt.getLayout().prev)) {
            form.ownerCt.ownerCt.getLayout().prev();
        }

        return false;
    },

    save_execute: function () {
        var form = this.view;
        console.log(form);
        if (!form.isValid())
            return;

        form.updateRecord();

        var record = form.getRecord();

        if (!record.dirty) {
            xf.toast.error("数据未修改,不需要保存!");
            return;
        };

        record.save({
            failure: function (record, operation) {
                console.log(operation);
                xf.message.error("保存失败!");

            },
            success: function (record, operation) {
                if (operation.getRequest().getAction() == "create") {
                    form.store.insert(0, record);
                }
                var res = xf.utils.getResponseObj(operation);
        
                xf.toast.info("保存成功!" + (res.Message == null ? "" : res.Message));

            },
            callback: function (record, operation, success) {
               
            }
        });

    }
});