Ext.define("xf.core.component.grid.DataGrid", {
    extend: 'Ext.grid.Panel',
    xtype: 'xf-grid',
    config: {
        rowediting: false,
        showCheckbox: true,
    },

    makePagingBar: function () {
        return {
            xtype: 'pagingtoolbar',
            displayInfo: true
        };
    },

    onRowEditDone: function (editor, e) {
        //e.record.commit();
    },

    makePlugins: function () {
        var me = this, plugins = [];
        if (this.rowediting === true) {
            plugins.push({
                ptype: 'rowediting',
                clicksToEdit: 2,
                listeners: {
                    scope: me,
                    'edit': me.onRowEditDone
                }
            });
        }

        if (plugins) return plugins;
        return null;
    },

    makeTBar: function () {
        return null;
    },


    makeGrid: function () {
        var gridConfig = {

            //pageSize:4,
            //viewType: 'sef-datagrid-view',
            viewConfig: {
                stripeRows: true,
                emptyText: "没有匹配的数据" //,//'没有数据' //SEF.G.Consts.TABLE_EMPTY_TEXT
            },
            plugins: this.makePlugins(),
            tbar: this.makeTBar(),
            bbar: this.makePagingBar(),
            columns: this.makeColumn()
        };


        //gridConfig['features'] = this.makeFeatures();
        if (this.showCheckbox) {
            gridConfig['selModel'] = {
                type: 'checkboxmodel'
            };
        }


        return gridConfig;
    },

    makeColumn: function () {
        var me = this;
        var model = null;

        if (me.model) model = me.model;
        else if (me.getStore()) {
            console.log(me.getStore());
            model = me.getStore().model;
        }

        if (!model)
            console.log('grid或store必须定义model');

        var modelInstance = Ext.create(model);
        console.log(modelInstance);

        var fields = modelInstance.getFields();

        if (!me.columns && !me.col) {

            var columns = fields.map(function (item) {
                return {
                    dataIndex: item.name,
                    text: item.text,

                }
            });

            return columns;
        }
        return me.columns;
    },

    beforeload: function (store, operation, eOpts) {
        console.log("grid beforeload");
    },

    onRowDblClick: function (grid, record) {
        console.log("grid rowdblclick");
    },

    initComponent: function () {

        var me = this;

        Ext.apply(this, this.makeGrid());

        this.callParent(arguments);

        var store = me.getStore();

        if (store) {
            store.on("beforeload", me.beforeload, me);
        }

        this.on('rowdblclick', me.onRowDblClick);

    }

});