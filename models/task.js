var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: {type: String, required: true, max: 200},
    deadline: {type: Number, required: true},
    progress: {type: Number}
});


// nameExport the model
module.exports = mongoose.model('Task', TaskSchema);