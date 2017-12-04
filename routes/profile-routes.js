var app = require('express').Router();
var url = require('../app').url;
var isLoggedin = function(req) {
    if (!req.user) return false;
    else return true;
};
var authCheck = function (req, res, next) {
    if (!req.user) {
        // if user is not logged in
        res.redirect(url.format({
            pathname: '/',
            query: { 'errorCode': 1 }
        }));
    } else {
        res.locals.user = req.user;
        next();
    }

};
app.get('/', authCheck, function (req, res) {
    var title = req.user.firstname + " " +req.user.lastname + " Mail Feed";
    res.render('profile', {
        addonTitle: title
    });
});

module.exports = app;