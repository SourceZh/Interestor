var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var url = require('url');
var handle = require('../module/handle');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/LOGON', function(req, res){
    var query = querystring.parse(url.parse(req.url).query);
    var UserName = query["UserName"];
    var Passwd = query["Passwd"];
    handle.logon(UserName, Passwd, function (result) {
        res.json(result);
    });
});

router.get('/REGISTER', function (req, res) {
    var query = querystring.parse(url.parse(req.url).query);
    var UserName = query["UserName"];
    var Passwd = query["Passwd"];
    handle.register(UserName, Passwd, function (result) {
        res.json(result);
    });
});

router.get('/DISCOVER', function (req, res) {
    var query = querystring.parse(url.parse(req.url).query);
    var Number = query["Num"];
    handle.discover(Number, function (result) {
        res.json(result);
    });
});

router.get('/USERINFO', function (req, res) {
    var query = querystring.parse(url.parse(req.url).query);
    var UserID = query["UserID"];
    var Key = query["Key"];
    handle.checkKey(UserID, Key, function (state) {
        if (state){
            handle.userinfo(function (result) {
                res.json(result);
            });
        }else{
            var result = {error:true};
            res.json(result);
        }
    })
});

router.get('/LISTINFO', function (req, res) {
    var query = querystring.parse(url.parse(req.url).query);
    var ListID = query["ListID"];
    handle.listinfo(ListID, function (result) {
        res.json(result);
    });
});

router.get('/CREATELIST', function (req, res) {
    var query = querystring.parse(url.parse(req.url).query);
    var UserID = query["UserID"];
    var Key = query["Key"];
    var ListName = query["ListName"];
    handle.checkKey(UserID, Key, function (state) {
        if (state){
            handle.createlist(UserID, ListName, function (result) {
                res.json(result);
            });
        }else{
            var result = {error:true};
            res.json(result);
        }
    })
});

router.get('/LIKE', function (res, req) {
    var query = querystring.parse(url.parse(req.url).query);
    var UserID = query["UserID"];
    var Key = query["Key"];
    var type = query["Type"];
    var id = query["ID"];
    var num = query["Num"];
    handle.checkKey(UserID, Key, function (state) {
        if (state){

        }else{

        }
    })
});

module.exports = router;
