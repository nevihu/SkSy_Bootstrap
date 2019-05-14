var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var task_controller = require('../controllers/task');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', task_controller.test);

router.post('/', task_controller.task_create);

router.get('/:id', task_controller.task_details);

router.put('/:id', task_controller.task_update);

router.delete('/:id', task_controller.task_delete);

router.get("/", task_controller.task_get_all)

module.exports = router;