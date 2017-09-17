Ext.define("xf.view.org.Company", {
    extend: 'Ext.panel.Panel',
    title: '公司管理',
    layout: 'fit',
    border: false,
    items: [{
        xtype: 'xf-grid',
        store: {
            type: 'xf-store',
            model: 'xf.model.org.Company',
            url: '/company',
            defaultFilter: [{
                fieldName: 'Code',
                operator: 'like',
                values: ["123"]
            }]
        }
    }]
});