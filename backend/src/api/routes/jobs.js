const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');
const { authenticate, requireRole, validateJob } = require('../middleware');

router.get('/', jobsController.list);
router.get('/:id', jobsController.getById);
router.post('/', authenticate, requireRole('admin'), validateJob, jobsController.create);
router.put('/:id', authenticate, requireRole('admin'), validateJob, jobsController.update);
router.delete('/:id', authenticate, requireRole('admin'), jobsController.delete);

module.exports = router;