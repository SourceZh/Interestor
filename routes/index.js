var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var url = require('url');
var handle = require('../module/handle');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/LOGON', function(req, res, next){
    var query = querystring.parse(url.parse(req.url).query);
    var UserName = query["UserName"];
    var Passwd = query["Passwd"];
    handle.logon(UserName, Passwd, function (result) {
        res.json(result);
    });
});

router.get('/REGISTER', function (req, res, next) {
    var query = querystring.parse(url.parse(req.url).query);
    var UserName = query["UserName"];
    var Passwd = query["Passwd"];
    handle.register(UserName, Passwd, function (result) {
        res.json(result);
    });
});

router.get('/DISCOVER', function (req, res, next) {
    var query = querystring.parse(url.parse(req.url).query);
    var Number = query["Num"];
    handle.discover(Number, function (result) {
        res.json(result);
    });
});

router.get('/USERINFO', function (req, res, next) {
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

router.get('/LISTINFO', function (req, res, next) {
    var query = querystring.parse(url.parse(req.url).query);
    var ListID = query["ListID"];
    handle.listinfo(ListID, function (result) {
        res.json(result);
    });
});



module.exports = router;
