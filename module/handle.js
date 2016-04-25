/**
 * Created by ooooo on 2016/4/3.
 */
var random = require('./random');
var mysql = require('./sql');
var time = require('./time');

exports.logon = function(UserName, Passwd, Callback){
    var sql = new mysql();
    sql.connect();
    sql.queryUser(UserName);
    sql.end(function (err) {
        if (err) throw err;
        var result = sql.result;
        if (Passwd == result.passwd){
            result.key = result.hash;
        }else{
            result.error = true;
        }
        Callback(result);
    });
};

function insert (res) {
    var sql = new mysql();
    sql.connect();
    sql.insertUser(res.uid, res.name, res.passwd);
    sql.end();
}

exports.register = function (UserName, Passwd, Callback) {
    var sql = new mysql();
    sql.connect();
    sql.queryUser(UserName);
    sql.end(function (err) {
        if (err) throw err;
        var result = sql.result;
        if (result.uid){
            result.error = true;
        }else{
            result.uid = random.nextid();
            console.log(result.uid.toString());
            result.name = UserName;
            result.passwd = Passwd;
            result.key = random.hash(result.uid.toString());
            insert(result);
        }
        Callback(result);
    })
};

exports.discover = function (Num, Callback){
    var sql = new mysql();
    sql.connect();
    sql.querylatest(Num);
    sql.end(function (err) {
        if (err) throw err;
        var result = sql.result;
        Callback(result);
    });
};

exports.checkKey = function (UserID, Key, Callback) {
    var sql = new mysql();
    sql.connect();
    sql.queryUserHash(UserID);
    sql.end(function (err) {
        if (err) throw err;
        var result = sql.result;
        Callback(Key==result.hash);
    })
};

exports.userinfo = function (Callback) {
    var sql = new mysql();
    sql.connect();
    sql.querycreate();
    sql.querycollect();
    sql.queryconcern();
    sql.end(function (err) {
        if (err) throw err;
        var result = sql.result;
        Callback(result);
    });
};

exports.listinfo = function (ListID, Callback) {
    var sql = new mysql();
    sql.connect();
    sql.querylist(ListID);
    sql.end(function (err) {
        if (err) throw err;
        var result = sql.result;
        Callback(result);
    })
};

exports.createlist = function (UserID, ListName, Callback) {
    var sql = new mysql();
    sql.connect();
    sql.creatlist(UserID, ListName, time.now());
    sql.end(function (err) {
        if (err) throw err;
        var result = sql.result;
        Callback(result);
    });
};

exports.likeitem = function (ItemID, Num) {
    var sql = new mysql();
    sql.connect();
    sql.likeitem(ItemID, Num+1);
    sql.end();
};

exports.dislikeitem = function (ItemID, Num) {
    var sql = new mysql();
    sql.connect();
    sql.dislikeitem(ItemID, Num+1);
    sql.end();
};

exports.likelist = function (ListID, Num) {
    var sql = new mysql();
    sql.connect();
    sql.likelist(ListID, Num+1);
    sql.end();
};

exports.dislikelist = function (ListID, Num) {
    var sql = new mysql();
    sql.connect();
    sql.dislikelist(ListID, Num+1);
    sql.end();
};

exports.infobox = function (UserID, Lower, Upper, Callback) {
    var sql = new mysql();
    sql.connect();
    sql.infobox(UserID, Lower, Upper);
    sql.end(function (err) {
        if (err) throw err;
        var result = sql.result;
        Callback(result);
    });
};

exports.collectlist = function (UserID, ListID) {
    var sql = new mysql();
    sql.connect();
    sql.addlist(UserID, ListID, 'collect');
    sql.end();
};

function insertitems(result, UserID) {
    var sql = new mysql();
    sql.connect();
    var items = result.items;
    var ListID = result.ListID;
    var itemid;
    for (var key in items){
        itemid = UserID + '-' + items[key].iid;
        sql.insertitem(itemid, ListID, items[key].createtime, items[key].uptime, items[key].sid, items[key].link);
    }
    sql.end();
}

function fork(result, UserID, ListName) {
    var sql = new mysql();
    sql.connect();
    sql.createlist(UserID, ListName, time.now(), result.list.lid, result.list.rid);
    sql.querylist(result.list.lid);
    sql.end(function (err) {
        if (err) throw err;
        insertitems(sql.result, UserID);
    })
}

exports.forklist = function (UserID, ListID, ListName) {
    var sql = new mysql();
    sql.connect();
    sql.liststate(ListID);
    sql.end(function (err) {
        if (err) throw err;
        fork(sql.result, UserID, ListName);
    })
};