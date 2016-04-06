/**
 * Created by ooooo on 2016/4/3.
 */
var crypto = require('crypto');
var mysql = require('./sql');

var cnt = 0;
var sql = new mysql();
sql.connect();
sql.queryUserNum();
sql.end(function (err) {
    if (err) throw err;
    cnt = sql.result.count;
});

var MySha256 = function () {
    this.secret = 'I love intrerester';
    this.sha256 = crypto.createHmac('sha256', this.secret);
    this.hash = function (String) {
        return this.sha256.update(String).digest('hex');
    }
};

exports.hash = function(String){
    return MySha256.hash(String);
};

exports.nextid = function () {
    ++cnt;
    sql.connect();
    sql.updateUserNum(cnt);
    sql.end();
    return cnt;
};