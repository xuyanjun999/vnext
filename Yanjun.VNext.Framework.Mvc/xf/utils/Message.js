//Message.js

Ext.define('xf.core.utils.Message', {

    showMessage: function (icon, title, messgae, fn, onClose) {
        var buttons = Ext.Msg.YES;
        if (icon === Ext.Msg.QUESTION)
            buttons = Ext.Msg.YESNO;
        //var m = Ext.create("Ext.window.MessageBox", {
        console.log(icon);
        //});
        var m = Ext.Msg.show({
            title: title,
            message: messgae,
            buttons: buttons,
            icon: icon,
            fn: fn
        });


        m.on("close", onClose);

        m.show();

        return m;
    },

}, function (msg) {
    //singleton
    var myToast = new msg();
    var types = ['info', 'error', 'warning', 'question'];
    //console.log('will make new message now');
    if (!xf.message) {
        xf.message = {};
        types.forEach(function (t) {
            xf.message[t] = function (message, fn, onClose, title) {
                if (!title) title = "消息";
                return myToast.showMessage(Ext.Msg[t.toUpperCase()], title, message, fn, onClose);
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