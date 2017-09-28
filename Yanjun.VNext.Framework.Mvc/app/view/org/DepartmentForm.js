Ext.define("xf.view.org.DepartmentForm", {
    extend: 'xf.core.component.form.Form',
    xtype: 'departmentform',
    items: [{
        fieldLabel: '编号',
        allowBlank: false,
        name: 'Code'
    }, {
        fieldLabel: '名称',
        allowBlank: false,
        name: 'Name'
    },{
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
        xtype: 'textarea',
        columnWidth: 1,
    }],
    tbar: ['save', 'back']
});