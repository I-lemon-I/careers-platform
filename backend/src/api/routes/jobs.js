const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');
const { authenticate, validateJob } = require('../middleware');

router.get('/', jobsController.list);
router.get('/:id', jobsController.getById);
router.post('/', authenticate, validateJob, jobsController.create);
router.put('/:id', authenticate, validateJob, jobsController.update);
router.delete('/:id', authenticate, jobsController.delete);

module.exports = router;