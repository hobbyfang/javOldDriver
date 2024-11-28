//回调函数，需要被赋值成函数，初始化为null
var webSQL_create_handle = null;
var webSQL_insert_handle = null;
var webSQL_update_handle = null;
var webSQL_delete_handle = null;
var webSQL_select_handle = null;
var webSQL_drop_handle = null;

//连接数据库(数据库名，数据大小)
function webSQL(database="MyDatabase", datasize=1024*1024){
    this.db = openDatabase(database, "", "My Database", datasize);
}
webSQL.prototype= {

    //作为webSQL的原型
    constructor: webSQL,

    //创建表，参数为表名和列名
    create: function (table, allcol) {
        var col = "";
        for (var i = 0; i < allcol.length; i++) {
            col += allcol[i];

            if (i !== allcol.length - 1) {
                col += ",";
            }
        }
        var sql = "CREATE TABLE IF NOT EXISTS " + table + "(" + col + ")";
        this.db.transaction(function (tx) {
            tx.executeSql(sql,
                [],
                function (tx, rs) {
                    console.log(tx, "创建表成功！");
                    if (webSQL_create_handle && typeof(webSQL_create_handle) == "function") {
                        webSQL_create_handle();
                    }
                },
                function (tx, error) {
                    console.log(error, "创建表失败！");
                }
            );
        });
    },

    //删除表，参数为表名
    drop: function (table) {
        var sql = "DROP TABLE IF EXISTS " + table;
        this.db.transaction(function (tx) {
            tx.executeSql(sql,
                [],
                function (tx, rs) {
                    console.log(tx, "删除表成功！");
                    if (webSQL_drop_handle && typeof(webSQL_drop_handle) == "function") {
                        webSQL_drop_handle();
                    }
                },
                function (tx, error) {
                    console.log(error, "删除表失败！");
                }
            );
        });
    },

    //插入数据，表名，列名，对应列值
    insert: function (tableName, colNameArray, colValueArray) {
        var allColName = "";
        var quesMark = "";
        for (var i = 0; i < colNameArray.length; i++) {
            if (colNameArray[i]) {
                allColName += colNameArray[i];
                quesMark += "?";
                if (i !== colNameArray.length - 1) {
                    allColName += ",";
                    quesMark += ",";
                }
            }
        }
        var sql = "INSERT INTO " + tableName + "(" + allColName + ") VALUES (" + quesMark + ")";
        this.db.transaction(function (tx) {
            tx.executeSql(
                sql,
                colValueArray,
                function (tx, rs) {
                    console.log(tx, "插入数据成功！");
                    if (webSQL_insert_handle && typeof(webSQL_insert_handle) == "function") {
                        webSQL_insert_handle();
                    }
                },
                function (tx, error) {
                    console.log(error, "插入数据失败！");
                }
            );
        });
    },

    //更新数据，表名，列名，列值，条件列名，条件列值，条件关系，是否通配
    update: function (tableName, colNameArray, colValueArray, whereColName = null, whereColValue = null, relation = "&&", equal = "=") {
        var colAndValue = "";
        for (var i = 0; i < colNameArray.length; i++) {
            if (colNameArray[i]) {
                colAndValue += (colNameArray[i] + "=?");
                if (i !== colNameArray.length - 1) {
                    colAndValue += ",";
                }
            }
        }
        var whereSyntax = "";
        if (whereColName) {
            for (var j = 0; j < whereColName.length; j++) {
                if (whereColName[j]) {
                    if (j === 0) {
                        whereSyntax += " WHERE ";
                    }
                    whereSyntax += (whereColName[j] + "" + equal + "?");
                    if (j !== whereColName.length - 1) {
                        whereSyntax += (" " + relation + " ");
                    }
                }
            }
        }
        var fanalArray = new Array();
        for (var m = 0; m < colValueArray.length; m++) {
            if (colValueArray[m]) {
                fanalArray.push(colValueArray[m]);
            }
        }
        if (whereColValue) {
            for (var n = 0; n < whereColValue.length; n++) {
                if (whereColValue[n]) {
                    fanalArray.push(whereColValue[n]);
                }
            }
        }
        var sql = "UPDATE " + tableName + " SET " + colAndValue + "" + whereSyntax;
        this.db.transaction(function (tx) {
            tx.executeSql(
                sql,
                fanalArray,
                function (tx, rs) {
                    console.log(tx, "更新数据成功");
                    if (webSQL_update_handle && typeof(webSQL_update_handle) == "function") {
                        webSQL_update_handle();
                    }
                },
                function (tx, error) {
                    console.log(error, "更新数据失败！");
                }
            );
        });
    },

    //删除数据，表名，条件列名，条件列值，条件关系，是否通配
    delete: function (tableName, whereColName = null, whereColValue = null, relation = "&&", equal = "=") {
        var whereSyntax = "";
        if (whereColName) {
            for (var j = 0; j < whereColName.length; j++) {
                if (whereColName[j]) {
                    if (j === 0) {
                        whereSyntax += " WHERE ";
                    }
                    whereSyntax += (whereColName[j] + "" + equal + "?");
                    if (j !== whereColName.length - 1) {
                        whereSyntax += (" " + relation + " ");
                    }
                }
            }
        }
        var fanalColValue = new Array();
        for (var n = 0; n < whereColValue.length; n++) {
            if (whereColValue[n]) {
                fanalColValue.push(whereColValue[n]);
            }
        }
        var sql = "DELETE FROM " + tableName + "" + whereSyntax;
        this.db.transaction(function (tx) {
            tx.executeSql(
                sql,
                fanalColValue,
                function (tx, rs) {
                    console.log(tx, "删除数据成功！");
                    if (webSQL_delete_handle && typeof(webSQL_delete_handle) == "function") {
                        webSQL_delete_handle();
                    }
                },
                function (tx, error) {
                    console.log(error, "删除数据失败！");
                }
            );
        });
    },

    //查询所有数据
    select: function (tableName) {
        var sql = "SELECT * FROM " + tableName;
        console.log("db", this.db);
        this.db.transaction(function (tx) {
            tx.executeSql(
                sql,
                [],
                function (tx, rs) {
                    for (var i = 0; i < rs.rows.length; i++) {
                        console.log(rs.rows.item(i).name, rs.rows.item(i).value);
                    }
                    if (webSQL_select_handle && typeof(webSQL_select_handle) == "function") {
                        webSQL_select_handle(rs.rows);
                    }
                },
                function (tx, error) {
                    console.log(error, "查询失败");
                }
            );
        });
    }
}
