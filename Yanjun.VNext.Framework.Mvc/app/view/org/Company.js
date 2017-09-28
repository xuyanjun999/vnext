Ext.define("xf.view.org.Company", {
    extend: 'xf.core.component.page.AppPage',
    title: '公司管理',
    requires: [
        'xf.view.org.CompanyForm',
        'xf.view.org.DepartmentForm',
    ],
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
        }, {
            xtype: "companyform"
        }]

    }]
});