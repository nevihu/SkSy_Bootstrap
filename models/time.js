var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TimeSchema = new Schema({
    time: {type: Number, required: true},
    type: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('Time', TimeSchema);