var app = require('express').Router(),
    url = require('../app').url;


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
    if(!req.query.trackingnum) {
        var title = "Tracking "+ req.user.firstname + " " +req.user.lastname;
        res.render('tracking', {
            addonTitle: title
        });
    } else {
        var tracking = require('../trackingsample.json');
        var title = "Tracking on "+ req.query.carrier + " | " + req.user.firstname + " " +req.user.lastname;
        res.render('tracking', {
            addonTitle: title,
            result: tracking
        });
    }
});

app.get('/find', authCheck, function (req, res) {
    if(!req.query.trackingnum)
        res.redirect(url.format({pathname: '/tracking'}));
    var title = "Tracking on "+ req.query.carrier + " | " + req.user.firstname + " " +req.user.lastname;
    res.render('tracking', {
        addonTitle: title
    });
});



module.exports = app;