var mongo = require('mongoose'),
Schema = mongo.Schema;

var trackingSchema = new Schema({
    mailId: String,
    trackingNum: String, //cast to int in node
    carrier: {type: String, default: ''}
});

var Mail = mongo.model('mail',mailSchema);

module.exports = Mail;