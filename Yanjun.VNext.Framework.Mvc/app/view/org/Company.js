Ext.define("xf.view.org.Company", {
    extend: 'Ext.panel.Panel',
    title: '公司管理',
    layout: 'fit',
    items: [{
        xtype: 'xf-grid',
        store: {
            type: 'xf-store',
            model: 'xf.model.org.Company',
            url: '/company/read'
        }
    }]
});