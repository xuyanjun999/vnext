Ext.define("xf.view.org.CompanyForm", {
    extend: 'xf.core.component.form.Form',
    xtype: 'companyform',
    items: [{
        fieldLabel: '编号',
        allowBlank: false,
        name: 'Code'
    }, {
        fieldLabel: '名称',
        allowBlank: false,
        name: 'Name'
    }, {
        fieldLabel: '地址',
        name: 'Address'
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
        xtype: 'textarea',
        columnWidth: 1,
    }],
    tbar: ['save', 'back']
});