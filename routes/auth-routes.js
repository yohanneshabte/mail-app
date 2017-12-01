const passport = require('passport');
const app = require('express').Router;
app.get('/login',(req,res) => {
    res.render('login');
});