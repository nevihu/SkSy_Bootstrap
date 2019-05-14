var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var time_controller = require('../controllers/time');


// a simple test url to check that all of our files are communicating correctly.
router.post('/', time_controller.time_create);

router.get("/", time_controller.time_get_all)

module.exports = router;