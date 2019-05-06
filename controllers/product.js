var Product = require('../models/product');


exports.product_get_all = function (req, res) {

    /*Product.find({}).where('price').gt(req.body.lower).lt(req.body.higher).exec(function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    })*/
    Product.find({}).exec(function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    })
}


//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = function (req, res) {
    if(req.body.progress != undefined) {
        actualProgress = req.body.progress;
    } else {
        actualProgress = 0;
    }
    var product = new Product(
        {
            name: req.body.name,
            deadline: req.body.deadline,
            progress: actualProgress
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json(product)
    })
};

exports.product_details = function (req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};