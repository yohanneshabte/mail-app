app = require('express').Router();
//check if signed in and go to the profile page
var authCheckN = function (req, res, next) {
    if (req.user) {
        // if user is logged in
        res.redirect('/profile');
    } else next();

};

app.get('/', authCheckN , function (req, res) {
    res.render('index');
});

//include other home routes(like help, tracking....)
//tracking can be different when logged in and when not logged in
module.exports = app;