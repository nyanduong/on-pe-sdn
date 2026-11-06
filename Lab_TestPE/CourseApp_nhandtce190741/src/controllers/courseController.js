const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
    try {
        const course = await Course.find();

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};