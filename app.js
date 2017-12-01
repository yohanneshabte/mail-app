var express = require('express'),
path = require('path');

var app = express();

app.set('view engine','ejs');
var routes = require('./routes');
app.use(express.static(path.join(__dirname,'public')));

//setup routes
app.get('/', routes.home);
app.get('*', routes.notFound);

app.listen(3000, function() {
    console.log("app running on localhost:3000...");
});