Ext.define("xf.view.org.Department", {
    extend: 'xf.core.component.page.AppPage',
    title: '部门管理',
    requires: [
        'xf.view.org.DepartmentForm',
    ],
    items: [{
        xtype: 'panel',
        border: false,
        closable: false,
        region: 'center',
        layout: 'border',
        viewModel: {
            data: {
                theDepartment: null
            }
        },
        items: [
            {
                xtype: 'xf-grid',
                region: 'north',
                height: 400,
                model: 'xf.model.org.Department',
                api: '/org/department/read',
                //defaultFilter: [{ fieldName: 'Name', operator: 'like', value: '杭州' }],
                tbar: ["add", "edit", "delete", "import"],
                bind: {
                    selection: '{theDepartment}'
                },
            },
            {
                xtype: "form",
                region: 'center',
                layout:'column',
                defaults: {
                    labelAlign: 'top',
                    columnWidth: 0.25,
                    xtype: 'textfield',
                    margin: '1 5 1 5',
                   // labelStyle: "text-align: right;"
                },
                items: [{
                    fieldLabel: '编号',
                    allowBlank: false,
                    name: 'Code'
                }, {
                    fieldLabel: '名称',
                    allowBlank: false,
                    bind: '{theDepartment.Name}'
                }, {
                    fieldLabel: '电话',
                    name: 'Tel'
                }, {
                    fieldLabel: '邮件',
                    name: 'Email'
                }, {
                    fieldLabel: '创建时间',
                    xtype: 'datefield',
                    readOnly: true,
                    name: 'CreateOn',
                }, {
                    fieldLabel: '备注',
                    name: 'Remark',
                    xtype: 'textarea'
                }],
            }]

    }]
});