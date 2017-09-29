Ext.define("xf.core.component.window.FormEditWindow", {
    extend: 'Ext.window.Window',
    alias: ['widget.xf-formeditwindow'],
    title:'数据编辑',
    border: false,
    closable: true,
    layout: 'fit',
    height: Ext.getBody().getHeight() * 0.8,
    width: Ext.getBody().getWidth() * 0.6,
    scrollable: true
});