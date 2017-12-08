const passport = require('passport'),
    app = require('express').Router(),
    url = require('../app').url;

var io = require('../app').io;

io.on('connection', function (socket) {
    socket.on('login', function (data) {
        socket.emit("confirm", {});
        app.get('/google', passport.authenticate('google', {
            scope: ['profile', 'email'],
            hd: "ole.augie.edu",
            loginHint: data.userN + "@ole.augie.edu"
        }));
    });
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect(url.format({
        pathname: '/',
        query: { 'redirectCode': 2 }
    }));
});

//callback route for google
app.get('/google/redirect', passport.authenticate('google'), function (req, res) {
    res.redirect('/profile');
});
module.exports = app;