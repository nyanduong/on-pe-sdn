const mongoose = require('mongoose');
const Enrollment = require('../models/Enrollments');
const Course = require('../models/Course');
const User = require('../models/User');

exports.signupEnrollment = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const student = await User.findById(req.user.id);
        if (!student) {
            return res.status(401).json({ message: 'User not found' });
        }
        if (student.role !== 'student') {
            return res.status(403).json({ message: 'Only students can enroll' });
        }

        if (!req.body) {
            return res.status(400).json({ message: 'A valid courseId is required' });
        }

        const { courseId } = req.body;
        if (!mongoose.isObjectIdOrHexString(courseId)) {
            return res.status(400).json({ message: 'A valid courseId is required' });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const enrollment = await Enrollment.create({
            student: student._id,
            course: course._id,
            progressPercentage: 0
        });
        return res.status(200).json({ message: 'Enrollment successful', enrollment });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
