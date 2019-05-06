var Time = require('../models/time');

exports.time_get_all = function (req, res, next) {

    if(req.query.lower == undefined || req.query.higher == undefined){
        Time.find({}).exec(function (err, docs) {
            if (err) return next(err);
            res.json(docs);
        })
    }
    else {
    Time.find({}).where('time').gt(req.query.lower).lt(req.query.higher).exec(function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    })}
}


exports.time_create = function (req, res, next) {
    var timeLog = new Time(
        {
            time: new Date(),
            type: req.body.type
        }
    );

    timeLog.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json(timeLog)
    })
};