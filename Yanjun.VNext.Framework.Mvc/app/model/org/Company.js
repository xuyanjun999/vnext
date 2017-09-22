﻿Ext.define('xf.model.org.Company', {
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
        name: 'Address',
        dtype: 'string',
        text: '地址'
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
    },  {
        name: 'CreateOn',
        dtype: 'date',
        format: 'c',
        text: '创建时间'
    },  {
        name: 'UpdateOn',
        dtype: 'date',
        format: 'c',
        text: '更新时间'
    }]
});