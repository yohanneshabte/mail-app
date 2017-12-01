const passport = require('passport');
const app = require('express');
app.get('/login',(req,res) => {
    res.render('login');
});