var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type: String, required: true, max: 200},
    deadline: {type: Number, required: true},
    progress: {type: Number}
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);