//dependency requires
var express = require('express'),
app = express(),
http = require('http').Server(app),
io = require('socket.io')(http),
path = require('path'),
bodyParser = require('body-parser');
http.listen(8080,function(){
    console.log("running on 8080..");
});
module.exports = io;

app.set('view engine','ejs');

//handle post with express 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

//routes require
var routes = require('./routes'),
authRoutes = require('./routes/auth-routes'),
//config require
auth = require('./config/auth');

//setup routes
app.get('/', routes.home);
app.use('/auth',authRoutes);
app.get('*', routes.notFound);

/* app.listen(3000, function() {
    console.log("app running on localhost:3000...");
}); */