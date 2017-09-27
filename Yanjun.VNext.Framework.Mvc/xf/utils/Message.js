//Message.js

Ext.define('xf.core.utils.Message', {

    showMessage: function (type, title, messgae, fn) {

        var m = null;
        var icon = Ext.Msg.INFO;
        var buttons = Ext.Msg.YES;
        if (type === "error") {
            icon = Ext.Msg.ERROR;
        }

        if (type === "confirm") {
            icon = Ext.Msg.QUESTION;
            buttons = Ext.Msg.YESNO;
        }

        Ext.Msg.QUESTION
        var m = Ext.Msg.show({
            title: title,
            message: messgae,
            buttons: buttons,
            icon: icon,
            fn: fn
        });

        return m;
    },

}, function (msg) {
    //singleton
    var myToast = new msg();
    var types = ['alert', 'error', 'confirm', 'prompt'];
    //console.log('will make new message now');
    if (!xf.message) {
        xf.message = {};
        types.forEach(function (t) {
            xf.message[t] = function (title, message, fn, onClose) {
                if (!title) title = "消息";
                return myToast.showMessage(t, title, message, fn, onClose);
            }
        });

    }

    var toastTypes = ['info', 'error', 'warning'];
    if (!xf.toast) {
        xf.toast = {};

        toastTypes.forEach(function (t) {
            xf.toast[t] = function (message, title) {
                if (!title) title = "消息";
                Ext.toast(message, title, 't', t.toUpperCase());
            }
        });
    }

});