// backend/src/api/controllers/jobsController.js
const jobService = require('../../services/jobService');

const jobsController = {
  // List all jobs
  list: async (req, res) => {
    try {
      const { status, department, search } = req.query;
      const jobs = await jobService.getAll({ status, department, search });
      
      res.json({
        success: true,
        data: jobs,
        total: jobs.length
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching jobs',
        error: error.message
      });
    }
  },

  // Get a specific job
  getById: async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const job = await jobService.getById(jobId);
      
      if (!job) {
        return res.status(404).json({
          success: false,
          message: `Job with ID ${jobId} not found`
        });
      }
      
      res.json({
        success: true,
        data: job
      });
    } catch (error) {
      console.error('Error fetching job:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching job',
        error: error.message
      });
    }
  },

  // Create a new job
  create: async (req, res) => {
    try {
      const { title, department, location, type, description, requirements } = req.body;
      const newJob = await jobService.create({
        title,
        department,
        location,
        type,
        description,
        requirements
      });
      
      res.status(201).json({
        success: true,
        data: newJob,
        message: 'Job created successfully'
      });
    } catch (error) {
      console.error('Error creating job:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating job',
        error: error.message
      });
    }
  },

  //  Update a job
  update: async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const updatedJob = await jobService.update(jobId, req.body);
      
      if (!updatedJob) {
        return res.status(404).json({
          success: false,
          message: `Job with ID ${jobId} not found`
        });
      }
      
      res.json({
        success: true,
        data: updatedJob,
        message: 'Job updated successfully'
      });
    } catch (error) {
      console.error('Error updating job:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating job',
        error: error.message
      });
    }
  },

  // Delete a job
  delete: async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const deletedJob = await jobService.delete(jobId);
      
      if (!deletedJob) {
        return res.status(404).json({
          success: false,
          message: `Job with ID ${jobId} not found`
        });
      }
      
      res.json({
        success: true,
        message: `Job ${jobId} deleted successfully`
      });
    } catch (error) {
      console.error('Error deleting job:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting job',
        error: error.message
      });
    }
  }
};

module.exports = jobsController;