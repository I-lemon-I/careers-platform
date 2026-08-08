 const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Authentication required. Please provide a token.'});
    }

    const token = authHeader.split(' ')[1];
    const validToken = process.env.API_TOKEN;

    if (!token || token !== validToken) {
        return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
    }

    req.user = {
        id: 1,
        email: 'admin@careers.com',
        role: 'admin'
    }

    next();
 }

 const validateJob = (req, res, next) => {
    const { title, department, location, description } = req.body;
    const errors = [];

    if (!title || title.trim().length < 3) {
        errors.push('Title is required and must be at least 3 characters');
    }

    if (!department || department.trim().length < 2) {
        errors.push('Department is required and must be at least 2 characters');
    }

    if (!location || location.trim().length < 2) {
        errors.push('Locations is required and must be at least 2 characters');
    }

    if (!description || description.trim().length < 10) {
        errors.push('Description is required and must be at least 10 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors: errors });
    }

    next();
};

module.exports = {
    authenticate,
    validateJob
};
