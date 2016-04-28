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
    var Type = query["Type"];
    var Id = query["ID"];
    var Num = query["Num"];
    if (Type == 'list'){
        handle.likelist(Id, Num);
    }else if (Type == 'item'){
        handle.likeitem(Id, Num);
    }
});

router.get('/DISLIKE', function (res, req) {
    var query = querystring.parse(url.parse(req.url).query);
    var Type = query["Type"];
    var Id = query["ID"];
    var Num = query["Num"];
    if (Type == 'list'){
        handle.dislikelist(Id, Num);
    }else if (Type == 'item'){
        handle.dislikeitem(Id, Num);
    }
});

router.get('/INFOBOX', function (res, req) {
    var query = querystring.parse(url.parse(req.url).query);
    var UserID = query["UserID"];
    var Key = query["Key"];
    var Lower = query["Lower"];
    var Upper = query["Upper"];
    handle.checkKey(UserID, key, function (state) {
        if (state){
            handle.infobox(UserID, Lower, Upper, function (result) {
                res.json(result);
            })
        }else{
            var result = {error:true};
            res.json(result);
        }
    })
});

router.get('/COLLECTLIST', function (res, req) {
    var query = querystring.parse(url.parse(req.url).query);
    var UserID = query["UserID"];
    var Key = query["Key"];
    var ListID = query["ListID"];
    handle.checkKey(UserID, Key, function (state) {
        if (state){
            handle.collectlist(UserID, ListID);
        }
    })
});

router.get('/FORKLIST', function (res, req) {
    var query = querystring.parse(url.parse(req.url).query);
    var UserID = query["UserID"];
    var Key = query["Key"];
    var ListID = query["ListID"];
    var ListName = query["ListName"];
    handle.checkKey(UserID, Key, function (state) {
        if (state){
            handle.forklist(UserID, ListID, ListName);
        }
    })
});

router.get('/COLLECTITEM', function (res, req) {
    var query = querystring.parse(url.parse(req.url).query);
    var UserID = query["UserID"];
    var Key = query["Key"];
    var ItemID = query["ItemID"];
    var ListID = query["ListID"];
    handle.checkKey(UserID, Key, function (state) {
        if (state){
            handle.collectitem(UserID, ItemID, ListID);
        }
    })
});

router.get('/CREATEITEM', function (res, req) {
    var query = querystring.parse(url.parse(req.url).query);
    var UserID = query["UserID"];
    var Key = query["Key"];
    var ItemName = query["ItemName"];
    var ListID = query["ListID"];
    var ItemID = UserID+'-'+ItemName;
    handle.checkKey(UserID, Key, function (state) {
        if (state){
            handle.createitem(UserID, ItemID, ListID);
        }
    })
});

module.exports = router;
