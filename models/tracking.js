var mongo = require('mongoose'),
Schema = mongo.Schema;

var trackingSchema = new Schema({
    username: String,
    trackingNum: String, //cast to int in node
    carrier: {type: String, default: ''}
});

var Tracking = mongo.model('tracking',trackingSchema);

module.exports = Tracking;