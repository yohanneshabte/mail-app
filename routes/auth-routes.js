const passport = require('passport'),
app = require('express').Router();

var io = require('../app');

io.on('connection', function(socket) {
    socket.on('login', function (data) {
        socket.emit("confirm", {});
        console.log(data.userN+"ole.augie.edu");
        app.get('/google', passport.authenticate('google', {
            scope: ['email'],
            hd: "ole.augie.edu",
            loginHint: data.userN+"@ole.augie.edu"
        }));
    });
});

app.get('/login',function(req,res) {
    res.render('login');
});

app.get('/logout',function(req,res) {
    res.end('logging out');
});
 
//callback route for google
app.get('/google/redirect',function(req,res){
    res.send("Successfully Redirected");
});
module.exports = app;