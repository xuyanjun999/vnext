﻿Ext.define("xf.core.component.grid.DataGrid", {
    extend: 'Ext.grid.Panel',
    xtype: 'xf-grid',
    controller: 'xf-gridctr',
    config: {
        rowediting: false,
        columnFilter: true,
        showCheckbox: true,
        showRowNumber: true
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
        var me = this;
        var plugins = me.plugins||[];
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
        if (this.columnFilter === true) {
            plugins.push({
                ptype: 'gridfilters',
            });
        }

      return plugins;
    },

    makeTBar: function () {
        
        var me = this;
        if (!me.tbar) me.tbar = [];
        me.tbar = me.tbar.map(function (item) {
            var r = item;
            if (Ext.isString(item)) {
                r = xf.utils.getActionButton(item);
            }
            return r;
        });
        me.tbar.push("->");
        me.tbar.push({
            xtype: 'textfield',
            itemId:'gridsearchtext',
            emptyText: '输入条件进行快捷搜索',
            //triggers: {
            //    search: {
            //        cls: 'x-form-search-trigger',
            //        handler: function () {
            //            me.fireEvent("quicksearch");
            //        }
            //    },
            //    clear: {
            //        cls: 'x-form-clear-trigger',
            //        handler: function () {
            //            me.getStore().clearFilter();
            //        }
            //    }
            //},
            keyMap: {
                ENTER: {
                    handler: function () {
                        me.fireEvent("quicksearch");
                    },
                    scope: 'this',
                }
            }
        });

        me.tbar.push(xf.utils.getActionButton("search"));

        me.tbar.push(xf.utils.getActionButton("refresh"));

        return me.tbar;
    },


    makeGrid: function () {
        var gridConfig = {

            //pageSize:4,
            //viewType: 'sef-datagrid-view',
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
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
                    hidden: item.name === "ID",
                    formatter: item.formatter,
                    renderer: item.renderer,
                    width: item.width||100,
                    filter: {
                        type: 'string'
                    }
                }
            });
            if (me.showRowNumber)
                columns.unshift({
                    xtype: 'rownumberer',
                    text: '行号',
                    width: 50,
                    align: 'center'
                });
            return columns;
        }
        return me.columns;
    },

    beforeload: function (store, operation, eOpts) {
    },

    //onRowDblClick: function (grid, record) {
    //    console.log("grid rowdblclick");
    //},

    //onQuickSearch: function () {
    //    alert("快搜索啦");
    //},

    initComponent: function () {

        var me = this;

        if (!me.store) {
            me.store = {
                type: 'xf-store',
                model: me.model,
                api: me.api,
                defaultFilter: me.defaultFilter
            }
        }

        Ext.apply(this, this.makeGrid());

        this.callParent(arguments);

        var store = me.getStore();

        if (store) {
            store.on("beforeload", me.beforeload, me);
        }

        var controller = me.getController();

        this.on('rowdblclick', controller.onRowDblClick, controller);

        this.on('refresh', controller.refresh_execute, controller);

        //this.on("quicksearch", controller.onQuickSearch, controller);

    }

});