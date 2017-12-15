var app = require('express').Router();
var url = require('../app').url;
var Mail = require('../config/mail-handler');
var DateDiff = require('date-diff');

var isLoggedin = function(req) {
    if (!req.user) return false;
    else return true;
};
var authCheck = function (req, res, next) {
    if (!req.user) {
        // if user is not logged in
        res.redirect(url.format({
            pathname: '/',
            query: { 'redirectCode': 1 }
        }));
    } else {
        res.locals.user = req.user;
        next();
    }

};


app.get('/', authCheck, function (req, res) {
    if(typeof req.query.mail !== 'undefined')
        Mail.pickupMail(req.query.mail,function(err,check){
            console.log(req.query.mail + " got picked up");
        });
    var title;   
    if(typeof req.query.filter === 'undefined')
        title = req.user.firstname + " " +req.user.lastname + " Home";
    else
        title = req.user.firstname + " " +req.user.lastname + " Mail Feed(" + req.query.filter+")";
    Mail.fetchMailByUser(req.user.username,function(mails) { //check if this works when filter is undefined;
            res.render('profile', {
                addonTitle: title,
                filter: req.query.filter,
                mails: mails
            });
    },req.query.filter);
    
});

module.exports = app;