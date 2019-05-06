var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: {type: String, required: true},
    duration: {type: Number, required: false},
    calendar: {type: String, required: false},
    context: {type: String, required: false},
});


// Export the model
module.exports = mongoose.model('Time', TimeSchema);