const passport = require('passport'),
GoogleStrategy = require('passport-google-oauth20'),
keys = require('./keys'),
User = require('../models/user');

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id).then(function(user){
        done(null,user);
    });
});

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },(accessToken,refreshToken,profile,done) => {
        User.findOne({googleId:profile.id}).then(function(existingUser){
            if(existingUser) {
                //user exists
                done(null,existingUser);
            } else {
                //create user
                var email = profile.emails[0].value;
                var username = email.substring(0, email.lastIndexOf("@"));
                new User({
                    username: username,
                    googleId: profile.id,
                    firstname: profile.name.givenName,
                    lastname: profile.name.familyName,
                    imageURL: profile.photos[0].value
                }).save().then(function(newUser) {
                    done(null,newUser);
                });
            }

        });
        
    })
)