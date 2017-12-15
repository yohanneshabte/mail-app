var mongo = require('mongoose'),
Schema = mongo.Schema;

var userSchema = new Schema({
    username: String,
    googleId: String,
    firstname: String,
    lastname: String,
    imageURL: String 
});

var User = mongo.model('user',userSchema);

module.exports = User;