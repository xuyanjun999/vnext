Ext.define("xf.core.view.MainViewTree", {
    extend: 'Ext.tree.Panel',
    xtype: 'xf-mainviewtree',
    minWidth: 200,
    width: 250,
    collapsible: true,
    useArrows: true,
    border: false,
    rootVisible: false,
    titleCollapse: false,
    title: '系统菜单',
    region: 'west',
    store: {
        model:'xf.core.model.TreeModel',
        proxy: {
            type: 'xf-proxy',
            url:'/menu/getMainMenu'
        }
    }
});