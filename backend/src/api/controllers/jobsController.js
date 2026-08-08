//Simulation of database

let jobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Remote - US/Canada',
    type: 'Full-time',
    description: 'We are looking for a Senior Software Engineer to lead our core platform team. The ideal candidate has experience with Node.js, Vue.js, and cloud infrastructure.',
    requirements: ['5+ years experience', 'Node.js', 'Vue.js', 'AWS'],
    postedDate: '2024-01-15',
    status: 'active'
  },
  {
    id: 2,
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Remote - US/Canada',
    type: 'Full-time',
    description: 'Join our frontend team to build modern, responsive user interfaces using Vue.js and related technologies.',
    requirements: ['3+ years experience', 'Vue.js', 'JavaScript', 'CSS/SCSS'],
    postedDate: '2024-01-20',
    status: 'active'
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Remote - US/Canada',
    type: 'Contract',
    description: 'Help us build and maintain our cloud infrastructure using AWS, Docker, and Kubernetes.',
    requirements: ['AWS', 'Docker', 'Kubernetes', 'CI/CD pipelines'],
    postedDate: '2024-01-25',
    status: 'active'
  }
];

let nextId = 4;

const jobsController = {
    list: async (req, res) => {
        try {
            const { status, department, search } = req.query;
            let filteredJobs = [...jobs];

            if (status) {
                filteredJobs = filteredJobs.filter(job => job.status === status);
            }

            if (department) {
                filteredJobs = filteredJobs.filter(job => job.department === department);
            }

            if (search) {
                const searchLower = search.toLowerCase();
                filteredJobs = filteredJobs.filter(job =>
                    job.title.toLowerCase().includes(searchLower) ||
                    job.description.toLowerCase().includes(searchLower)
                );
            }

            res.json({
                success: true, 
                data: filteredJobs,
                total: filteredJobs.length,
                filters: { status, department, search }
            });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching jobs', error: error.message });
        }
    },

    //Get job by ID
    getById: async (req, res) => {
        try {
            const jobId = parseInt(req.params.id);
            const job = jobs.find(j => j.id === jobId);

            if (!job) { 
                return res.status(404).json({ 
                    success: false, message: `Job with ID ${jobId} not found` 
                }); 
            }

            res.json({ success: true, data: job });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error fetching job', error: error.message });
        }
    },

    //Create a new job
    create: async (req, res) => {
        try {
            const { title, department, location, type, description, requirements } = req.body;
            const newJob = {
                id: nextId++,
                title,
                department,
                location,
                type: type || 'Full-time',
                description,
                requirements: requirements || [],
                postedDate: new Date().toISOString().split('T')[0],
                status: 'active'
            };

            jobs.push(newJob);

            res.status(201).json({ success: true, data: newJob, message: 'Job created successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error creating job', error: error.message });
        }
    },

    //Update existing job
    update: async (req, res) => {
        try {
            const jobId = parseInt(req.params.id);
            const jobIndex = jobs.findIndex (j => j.id === jobsId);

            if (jobIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: `Job with ID ${jobId} not found`
                });
            }

            const updatedJob = {
                ...jobs[jobIndex],
                ...req.body,
                id: jobId,
                updatedAt: new Date().toISOString()
            };

            jobs[jobsIndex] = updatedJob;

            res.json({ success: true, data: updatedJob, message: 'Job updated successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error updating job', error: error.message });
        }
    },

    //Delete a job
    delete: async (req, res) => {
        try {
            const jobId = parseInt(req.params.id);
            const jobIndex = jobs.findIndex(j => j.id === jobId);

            if (jobIndex === -1) {
                return res.status(404).json({ success: false, message: `Job with ID ${jobId} not found` });
            }

            jobs.splice(jobIndex, 1);

            res.json({ success: true, message: `Job with ID ${jobId} deleted successfully` });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error deleting job', error: error.message });
        }
    }
};

module.exports = jobsController;