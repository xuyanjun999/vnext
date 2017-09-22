Ext.define("xf.view.org.Company", {
    extend: 'Ext.panel.Panel',
    title: '公司管理',
    layout: 'fit',
    border: false,
    closable: true,
    items: [{
        xtype: 'xf-grid',
        model: 'xf.model.org.Company',
        api: 'company',
        defaultFilter: [{ fieldName: 'Name', operator: 'like', value: '杭州' }],
        tbar: ["add", "edit", "delete","import"]
    }]
});