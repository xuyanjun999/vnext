Ext.define("xf.core.view.MainView", {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    viewModel: 'xf-mainviewmodel',
    controller: 'xf-mainviewctr',
    items: [{
        region: 'north',
        xtype: 'container',
        items: [{
            xtype: 'toolbar',
            border: false,
            height: 30,
            items: [{
                xtype: 'tbtext',
                html: '',
                bind: {
                    html: "{appName}-{appVersion}"
                }
            }, '->', {
                xtype: 'button',
                bind: {
                    text: "{userName}"
                },
                menu: [{
                    text: 'logout',
                    handler: 'logout'
                }],
            }]
        }]
    }, {
       
        xtype: 'xf-mainviewtree',
        listeners: {
            beforeload: 'beforeload',
            itemclick:'itemclick'
        }
    }, {
        region: 'south',
        xtype: 'container',
        items: [{
            xtype: 'toolbar',
            border: false,
            items: ['->', {
                xtype: 'tbtext',
                html: '',
                bind: {
                    html: "<a href='http://www.seungee.com' target='_blank'>{authorCompany}</a>"
                }
            }]
        }]
    }, {
        region: 'east',
        title: 'East Panel',
        collapsible: true,
        split: true,
        width: 150
    }, {
        region: 'center',
        xtype: 'tabpanel', // TabPanel itself has no title
        activeTab: 0,      // First tab active by default
        reference:'tab',
        items: {
            title: 'Default Tab',
            html: 'The first tab\'s content. Others may be added dynamically'
        }
    }]
});