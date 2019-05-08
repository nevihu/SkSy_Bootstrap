var Task = require('../models/task');


exports.task_get_all = function (req, res) {

    /*Task.find({}).where('price').gt(req.body.lower).lt(req.body.higher).exec(function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    })*/
    Task.find({}).exec(function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    })
}


//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.task_create = function (req, res, next) {
    if(req.body.progress != undefined) {
        actualProgress = req.body.progress;
    } else {
        actualProgress = 0;
    }
    console.log(req.body.name);
    console.log(req.body.deadline);
    console.log(req.body.progress);
    var task = new Task(
        {
            name: req.body.name,
            deadline: req.body.deadline,
            progress: actualProgress
        }
    );

    task.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json(task)
    })
};

exports.task_details = function (req, res, next) {
    Task.findById(req.params.id, function (err, task) {
        if (err) return next(err);
        res.send(task);
    })
};

exports.task_update = function (req, res) {
    Task.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, task) {
        if (err) return next(err);
        res.send('Task udpated.');
    });
};

exports.task_delete = function (req, res) {
    Task.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};