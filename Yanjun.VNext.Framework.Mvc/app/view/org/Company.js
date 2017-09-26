Ext.define("xf.view.org.Company", {
    extend: 'xf.core.component.page.AppPage',
    title: '公司管理',
    items: [{
        xtype: 'panel',
        border: false,
        closable: false,
        region: 'center',
        layout: 'card',
        items: [{
            xtype: 'xf-grid',
            model: 'xf.model.org.Company',
            api: 'company/read',
            //defaultFilter: [{ fieldName: 'Name', operator: 'like', value: '杭州' }],
            tbar: ["add", "edit", "delete", "import"],
            plugins:[{
                ptype: 'rowwidget',
                widget: {
                    xtype: 'xf-grid',
                    height:500,
                    reference:'g',
                    model: 'xf.model.org.Company',
                    api: 'company/read',
                    bind: {
                        store: '{g.store}',
                        title: 'Orders for {record.Name}'
                    },
                    tbar: [{
                        text: '测试',
                        handler: function () {
                            console.log(this.up("xf-grid").viewModel);
                        }
                    }]
                }
            }]

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
                //submitFormat: 'Y-m-d H:i:s',
            }],
            tbar: ['save','back']
        }]

    }]
});