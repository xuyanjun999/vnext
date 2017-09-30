Ext.form.field.Base.override({

    initComponent: function () {
        var me = this;
        me.callParent();
        if (me.allowBlank === false) {
            me.afterLabelTextTpl = '<span style="color:red;">*</span>';
        }
    }
});