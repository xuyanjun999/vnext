Ext.define("xf.core.view.MainViewTree", {
    extend: 'Ext.tree.Panel',
    xtype: 'xf-mainviewtree',
    minWidth: 200,
    width: 250,
    split: {
        width:1
    },
    collapsible: true,
    //useArrows: true,
    border: false,
    rootVisible: false,
    titleCollapse: false,
    title: '系统菜单',
    region: 'west',
    store: {
        model:'xf.core.model.TreeModel',
        proxy: {
            paramsAsJson: true,
            actionMethods: {
                create: 'POST',
                read: 'POST',
                update: 'POST',
                destroy: 'POST'
            },
            type: 'ajax',
            url: '/menu/GetMainMenu',
            reader: {
                type: 'json',
                rootProperty: 'Entitys',
                successProperty: 'Success',
                totalProperty: 'Count'
            }
        }
    }
});