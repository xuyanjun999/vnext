Ext.define('xf.model.org.Department', {
    extend: 'xf.core.model.ModelBase',
    fields: [{
        name: 'ID',
        text: 'ID'
    }, {
        name: 'Code',
        dtype: 'string',
        text: '编号'
    }, {
        name: 'Name',
        dtype: 'string',
        text: '名称'
    }, {
        name: 'Tel',
        dtype: 'string',
        text: '电话'
    }, {
        name: 'Email',
        dtype: 'string',
        text: '邮件'
    }, {
        name: 'Remark',
        dtype: 'string',
        text: '备注'
    }, {
        name: 'CreateOn',
        type: 'date',
        formatter: 'date("Y-m-d H:i:s")',
        width: 120,
        text: '创建时间'
    }, {
        name: 'UpdateOn',
        type: 'date',
        formatter: 'date("Y-m-d")',
        text: '更新时间'
    }],
    proxy: {
        type: 'xf-modelproxy',
        url: '/org/department'
    }
});