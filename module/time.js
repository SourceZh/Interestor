/**
 * Created by ooooo on 2016/4/16.
 */
var moment = require('moment');

exports.now = function () {
    return moment().format('YYYY-MM-DD hh:mm:ss');
};