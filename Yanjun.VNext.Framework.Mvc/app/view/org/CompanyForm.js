Ext.define("xf.view.org.CompanyForm", {
    extend: 'xf.core.component.form.Form',
    xtype: 'companyform',
    items: [{
        fieldLabel: '编号',
        allowBlank: false,
        name: 'Code',
        allowBlank: false
    }, {
        fieldLabel: '名称',
        allowBlank: false,
        name: 'Name',
        allowBlank: false
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
    }, {
        xtype: 'xf-gridfield',
     
        model: 'xf.model.org.Department',
        api: '/org/department/read',
        columnWidth: 1,
        //defaultFilter: [{ fieldName: 'Name', operator: 'like', value: '杭州' }],
        tbar: ["add", "edit", "delete", "import"],
        editor: {
            xtype: 'departmentform',
        },
        pname: 'ID',
        filterName:'CompyID'
    }],
    tbar: ['save', 'back']
});