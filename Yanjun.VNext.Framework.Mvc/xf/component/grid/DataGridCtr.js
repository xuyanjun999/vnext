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


    add_execute: function (btn) {
        this.view.ownerCt.getLayout().
    }
});