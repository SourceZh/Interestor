/**
 * Created by ooooo on 2016/4/3.
 */
var mysql = require('./sql');
var random = require('./random');

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

var insert = function (res) {
    var sql = new mysql();
    sql.connect();
    sql.insertUser(res.uid, res.name, res.passwd);
    sql.end();
};

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
            result.name = UserName;
            result.passwd = Passwd;
            result.key = random.hash(result.uid);
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