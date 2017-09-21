Ext.define("xf.view.org.Company", {
    extend: 'Ext.panel.Panel',
    title: '公司管理',
    layout: 'fit',
    border: false,
    closable: true,
    items: [{
        xtype: 'xf-grid',
        model: 'xf.model.org.Company',
        api: 'company',
        defaultFilter: [{ fieldName: 'Name', operator: 'like', value: '杭州' }],
        tbar: ["add", "edit", "delete", {
            xtype: 'exporterbutton',
            //component: Ext.getCmp('xf-grid'),
            text: "导出 Excel"
        }
            , {
                text: '导入',
                handler: function () {
                    var uploadPanel = Ext.create('Ext.ux.upload.Panel', {
                        uploader: 'Ext.ux.upload.uploader.FormDataUploader',
                        uploaderOptions: {
                            url: '/Sys/Menu/Upload'
                        },
                        synchronous: false
                    });

                    var uploadDialog = Ext.create('Ext.ux.upload.Dialog', {
                        dialogTitle: 'My Upload Dialog',
                        panel: uploadPanel
                    });

                    this.mon(uploadDialog, 'uploadcomplete', function (uploadPanel, manager, items, errorCount) {
                        this.uploadComplete(items);
                        if (!errorCount) {
                            uploadDialog.close();
                        }
                    }, this);

                    uploadDialog.show();
                }
            }]
    }]
});