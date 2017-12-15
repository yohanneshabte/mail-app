var mongo = require('mongoose'),
Schema = mongo.Schema;

var mailSchema = new Schema({
    to: String,
    from: String, //address(zip...)
    recievedDate: Date,
    pickedup: {type: Boolean, default: false},
    size: {type: String, default: ''},
    type: {type: String, default: 'envelope'},
    sender: { type: String, required: true}
});

var Mail = mongo.model('mail',mailSchema);

module.exports = Mail;