var app = require('express').Router();
var url = require('../app').url;
var authCheck = function (req, res, next) {
    if (!req.user) {
        // if user is not logged in
        res.redirect(url.format({
            pathname: '/',
            query: { 'errorCode': 1 }
        }));
    } else {
        next();
    }

};
app.get('/', authCheck, function (req, res) {
    res.render('profile');
});

module.exports = app;