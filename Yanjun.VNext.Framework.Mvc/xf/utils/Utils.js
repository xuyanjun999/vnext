//Utils.js



Ext.define('xf.core.utils.Utils', {
    //检测是否为中文
    isCnText: function (str) {
        var reg = /^[\u4E00-\u9FA5]+$/;
        return reg.test(str);
    },
    //设置浏览器标题
    setDocTitle: function (title) {
        document.title = title;
    },

    formatError: function (errResult) {
        var err = {
            code: 0,
            message: '',
            source: errResult
        }
        //debugger;
        if (errResult) {
            if (errResult.$className === 'Ext.data.Batch') {
                var berr = errResult.exceptions[0];
                if (Ext.isObject(berr.error)) {
                    err.code = berr.error['status'];
                    if (err.code === 404) {
                        err.message = Ext.String.format('未找到指定的服务');//, errResult.request.url);
                    }
                } else if (Ext.isString(berr.error)) {
                    err.message = berr.error;
                }
            } else if (errResult['responseText'] && errResult['request']) {
                //原生请求
                err.code = errResult['status'];
                //err.message=errResult['statusText'];
                if (err.code === 404) {
                    err.message = Ext.String.format('未找到指定的服务\n{0}', errResult.request.url);
                }
            } else {
                err.message = errResult.Message;
            }

        }

        return err;
    },

    makeTokenHash: function (token, appendTicks) {
        if (Ext.isEmpty(token)) {
            token = '/dashboard';
        } else if (/^sef\./.test(token)) {
            //with a class name
            token = token.replace(/^sef\.app/g, '.app');
            token = token.replace(/^sef\.core/g, '.core');
            token = token.replace(/\./gi, '/');
        }
        if (appendTicks === true) {
            token += '?_t=' + (+new Date());
        }
        return token;
    },



    getModelMeta: function (model) {
        var entity = null;
        if (Ext.isString(model)) {
            entity = Ext.data.schema.Schema.instances.default.getEntity(model);
        } else {
            entity = model;
        }

        var fields = entity.getFields();
        var metas = [];
        fields.forEach(function (f, i) {
            var ctype = f.getSType();

            var cfg = {
                isId: f.name === entity.idProperty,
                invisible: f.invisible === true,
                name: f.name,
                text: f.text || f.name,
                type: ctype,
                sassb: f.sassb,
                index: f.index,
                assoName: ''
            };
            if (cfg.isId) {
                cfg['type'] = 'bigint';
            }

            if (ctype === 'DateTime') {
                cfg['renderer'] = xf.utils.dateRenderer;
            }

            if (ctype === 'enum') {
                cfg['renderer'] = xf.utils.enumRenderer(f.sassb);
            }
            // console.log(cfg);

            metas.push(cfg);
        });

        metas.sort(function (m1, m2) {
            return m1.index - m2.index;
        });

        //console.log('metas#',metas);

        return metas;
    },

    // month/day/year
    dateRenderer: function (v) {
        return Ext.util.Format.date(v, 'm/d/Y');
    },
    //hour:min:sec
    timeRenderer: function (v) {
        return Ext.util.Format.date(v, 'H:i:s');
    },

    relRenderer: function (field) {
        return function (v) {
            if (v) return v[field];
            return 'N/A';
        }
    },

    enumRenderer: function (enumType) {
        return function (v) {
            //window.sef_static_data.SEF_Core_Common_TestEnum
            var types = enumType.split(',');
            var enumName = types[0];
            enumName = enumName.replace(/\./g, '_');

            var data = window.sef_static_data[enumName];
            var tv = '';

            //console.log('#####>',enumType,v);
            data.forEach(function (dv) {
                if (dv.Value === v) {
                    tv = dv.Text;
                    return false;
                }
            });
            return tv;
        }
    },

    // month/day/year h:m:s
    dateTimeRenderer: function (v) {
        return Ext.util.Format.date(v, 'm/d/Y H:i:s');
    },

    ajax: function (opt) {
        var cfg = Ext.merge({
            method: 'POST',

            defaultHeaders: {
                // 'x-sef': 'true',
                //  'ID': sef.runningCfg.getUser().ID,
                //  'TOKEN': sef.runningCfg.getUser().Token
            }
        }, opt);
        var success = cfg['success'];
        var failure = cfg['failure'];
        var scope = cfg['scope'];
        delete cfg['success'];
        delete cfg['failure'];
        delete cfg['scope'];

        return Ext.Ajax.request(cfg)
            .then(function (resp, opts) {
                //console.log(resp,opts);
                var o = Ext.JSON.decode(resp.responseText);
                if (o.Success === true) {
                    if (success) {
                        success.call(scope, o);
                    }
                } else {
                    failure && failure.call(scope,o);
                }
                //console.log(o);

            }, function (errResp, opts) {
                //console.log('failure#', errResp);
                if (failure) {
                    failure.call(scope, xf.utils.formatError(errResp));
                }
            });
    }, //end ajax

    getOperator: function (code) {
        var result = 0;
        switch (code) {
            case "<":
                result = 1;
                break;
            case "<=":
                result = 2;
                break;
            case "=":
                result = 5;
                break;
            case ">=":
                result = 4;
                break;
            case ">":
                result = 3;
                break;
            case "!=":
                result = 9;
                break;
            case "in":
                result = 7;
                break;
            case "notin":
                result = 8;
                break;
            case "like":
                result = 6;
                break;
        }
        return result;
    },

    encodeFilters: function (filters) {
        if (Ext.isEmpty(filters)) return filters;
        var result = filters.map(function (item) {
            var obj = {
                operator: xf.utils.getOperator(item.operator),
                fieldName: item.fieldName || item.property,
                searchGroupID: item.group || item.groupId || item.SearchGroupID,
                values: item.values || (Ext.isArray(item.value) ? item.value : [item.value]),
                rel: item.rel === "or" ? 2 : 1
            };
            return obj;
        });
        return result;
    },

    getActionButton: function (code) {
        var result = {
            // xtype: 'button',

        };
        switch (code) {
            case "add":
                result.iconCls = "add";
                result.text = "新建";
                result.action = "add";
                break;
            case "edit":
                result.iconCls = "edit";
                result.text = "编辑";
                result.action = "edit";
                break;
            case "delete":
                result.iconCls = "remove";
                result.text = "删除";
                result.action = "delete";
                break;
            case "import":
                result.iconCls = "excel";
                result.text = "导入";
                result.action = "import";
                break;
            case "save":
                result.iconCls = "save";
                result.text = "保存";
                result.action = "save";
                break;
            case "back":
                result.iconCls = "back";
                result.text = "返回";
                result.action = "back";
                break;
            case "search":
                result.iconCls = "search";
                result.tooltip = "搜索";
                result.action = "quickSearch";
                break;
            case "refresh":
                result.iconCls = "reload";
                result.tooltip = "刷新";
                result.action = "refresh";
                break;
        }
        return result;
    },

    getResponseObj: function (operation) {
        
        var responseText = operation.getResponse().responseText;
        var responseObj = Ext.decode(responseText);
        return responseObj;
    }

},
    function (cls) {
        if (!xf.utils) {
            xf.utils = new cls();
        }
    })