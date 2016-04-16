/**
 * Created by ooooo on 2016/4/3.
 */
var crypto = require('crypto');
var mysql = require('./sql');

var cnt = 0;
console.log(crypto);
console.log(mysql);

function init(){
    var sql = new mysql();
    sql.connect();
    sql.queryUserNum();
    sql.end(function (err) {
        if (err) throw err;
        cnt = sql.result.count;
    });
}

init();

var MySha256 = {
    secret:'I love intrerester'
};
MySha256.hash = function (String) {
    return crypto.createHmac('sha256', MySha256.secret).update(String).digest('hex');
};

exports.hash = function(String){
    return MySha256.hash(String);
};

exports.nextid = function () {
    ++cnt;
    var sql = new mysql();
    sql.connect();
    sql.updateUserNum(cnt);
    sql.end();
    return cnt;
};