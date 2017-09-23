Ext.define("xf.view.org.Company", {
    extend: 'xf.core.component.page.AppPage',
    title: '公司管理',
    items: [{
        xtype: 'panel',
        border: false,
        closable: true,
        region: 'center',
        layout: 'card',
        items: [{
            xtype: 'xf-grid',
            model: 'xf.model.org.Company',
            api: 'company/read',
            //defaultFilter: [{ fieldName: 'Name', operator: 'like', value: '杭州' }],
            tbar: ["add", "edit", "delete", "import"]
        }, {
            xtype: 'xf-form',
            items: [{
                fieldLabel: '编号',
                name: 'Code'
            }, {
                fieldLabel: '编号',
                name: 'Name'
            }, {
                fieldLabel: '地址',
                name: 'Address'
            }, {
                fieldLabel: '编号',
                name: 'Tel'
            }, {
                fieldLabel: '创建时间',
                xtype: 'datefield',
                name: 'CreateOn',

            }],
            tbar: ['save','back']
        }]

    }]
});