Ext.define('xf.core.Application', {
    extend: 'Ext.app.Application',
    name: 'xf',
    listen: {
        global: {
            'userexpired': 'onUserExpired'
        }
    },

    onUserExpired: function () {
        console.log('user will be relogin', this);
        //sef.runningCfg.clearUser(true);
        //window.location.reload();
    },


    launch: function () {

        var me = this;

        me.setMainView('xf.core.view.MainView');
    }
});