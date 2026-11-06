const Enrollment = require('../models/Enrollments');
const Course = require('../models/Course');
const User = require('../models/User');

exports.signupEnrollment = async (req, res) => {
    try {
        const { title, description, severity, project, assignedTo } = req.body;
        if (!title || !description || !severity || !project || !assignedTo) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const user = await User.findById(assignedTo).populate('role');
        if (!user) {
            return res.status(404).json({ message: 'Assigned user not found' });
        }
        if (!user.role || user.role.name !== 'user') {
            return res.status(400).json({ message: 'Report can only be assigned to a user' });
        }

        const report = await Report.create({
            title,
            description,
            severity,
            project,
            assignedTo
        });

        res.status(201).json({ message: 'Report created successfully', report });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
