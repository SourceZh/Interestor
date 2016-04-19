var mysql = require('mysql');
var random = require('./random');

module.exports = function (){
    this.result = {
        error: false
    };
    this.connection = mysql.createConnection({
        host    : 'localhost',
        user    : 'interester',
        password: 'INTERESTER',
        database: 'Interester'
    });
    this.connect = function(Callback){
        if (Callback == undefined){
            this.connection.connect(function (err) {if (err) throw err;});
        }else{
            this.connection.connect(function (err) {Callback(err);});
        }
    };
    this.end = function(Callback){
        if (Callback == undefined){
            this.connection.end(function (err) {if (err) throw err;});
        }else{
            this.connection.end(function (err) {Callback(err);});
        }
    };
    this.queryUser = function(UserName){
        var res = this.result;
        this.connection.query("select * from user where name='"+UserName+"'", function(err, rows){
            if(err) throw err;
            if (rows[0] != undefined){
                res.uid = rows[0].uid;
                res.name = UserName;
                res.passwd = rows[0].passwd;
            }
        });
    };
    this.queryUserHash = function(UserID){
        var res = this.result;
        this.connection.query("select hash from user where uid="+UserID, function(err, rows){
            if(err) throw err;
            if (rows[0] != undefined){
                res.hash = rows[0].hash;
            }
        });
    };
    this.insertUser = function (uid, name, passwd, hash) {
        this.connection.query("insert into user values("+uid+",'"+name+"','"+passwd+"','"+hash+"')");
    };
    this.queryUserNum = function () {
        var res =this.result;
        this.connection.query("select count from system", function (err, rows) {
            if (err) throw err;
            res.count = rows[0].count;
        });
    };
    this.updateUserNum = function (Num) {
        this.connection.query("update system set count = " + Num);
    };
    this.querylatest = function (Num) {
        var res =this.result;
        this.connection.query("select * from items order by createtime desc limit "+Num, function (err, rows) {
            if (err) throw err;
            res.latest = rows;
        });
    };
    this.querycreate = function (UserID) {
        var res =this.result;
        this.connection.query("select lid from privilege where uid="+UserID+" and  privilege='create'", function (err, rows) {
            if (err) throw err;
            res.create = rows;
        });
    };
    this.querycollect = function (UserID) {
        var res =this.result;
        this.connection.query("select lid from privilege where uid="+UserID+" and privilege='collect'", function (err, rows) {
            if (err) throw err;
            res.collect = rows;
        });
    };
    this.queryconcern = function (UserID) {
        var res = this.result;
        this.connection.query("select uid1 from concern where uid2="+UserID, function (err, rows) {
            if (err) throw err;
            res.concern = rows;
        });
    };
    this.querylist = function (ListID) {
        var res = this.result;
        this.connection.query("select * from items there lid='"+ListID+"'", function (err, rows) {
            if (err) throw err;
            res.list = rows;
        });
    };
    this.createlist = function (UserID, ListName, createtime) {
        var lid = UserID+'-'+ListName;
        this.connection.query("insert into list values("+lid+",'"+ListName+"','"+lid+"','"+lid+"',0,'"+createtime+"','"+createtime+"')");
        this.connection.query("insert into privilege values("+UserID+",'"+lid+"','create')");
        this.result.ListID = lid;
    };
    this.likeitem = function (ItemID, NewNum) {
        this.connection.query("update items set like = "+NewNum+" where iid = '"+ItemID+"'");
    };
    this.dislikeitem = function (ItemID, NewNum) {
        this.connection.query("update items set dislike = "+NewNum+" where iid = '"+ItemID+"'");
    };
    this.likelist = function (ListID, NewNum) {
        this.connection.query("update list set like = "+NewNum+" where lid = '"+ListID+"'");
    };
    this.dislikelist = function (ListID, NewNum) {
        this.connection.query("update list set dislike = "+NewNum+" where lid = '"+ListID+"'");
    };
};