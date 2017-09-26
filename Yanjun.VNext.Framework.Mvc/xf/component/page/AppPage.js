Ext.define("xf.core.component.page.AppPage", {
    extend: 'Ext.panel.Panel',
    xtype:'xf-page',
    border: false,
    closable: true,
    layout: 'border',
    header: true,
    initComponent: function () {
        var me = this;
        me.callParent();

    }
});