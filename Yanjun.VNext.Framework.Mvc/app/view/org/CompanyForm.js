Ext.define("xf.view.org.CompanyForm", {
    extend: 'xf.core.component.form.Form',
    xtype: 'companyform',
    reference: 'companyform',
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
        title: '123',
       // hidden: false,
        columnWidth: 1,
        bind: {
            hidden: '{isAdd}',
            //title: '{companyform.getForm()._record.get("Name")}'
        },
        //defaultFilter: [{ fieldName: 'Name', operator: 'like', value: '杭州' }],
        tbar: ["add", "edit", "delete", "import", {
            text: '测试',
            handler: function () {
                console.log(this.up("companyform").getForm()._record);
                alert(this.up("companyform").getForm()._record.get("Name"));
            }
        }],
        editor: {
            xtype: 'departmentform',
        },
        pname: 'ID',
        filterName: 'CompyID'
    }],
    tbar: ['save', 'back']
});