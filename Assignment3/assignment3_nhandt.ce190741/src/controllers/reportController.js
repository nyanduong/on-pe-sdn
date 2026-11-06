const Report = require('../models/Report');
const User = require('../models/User');

exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find({ assignedTo: req.user.id }).populate(
            'assignedTo',
            '_id username email'
        );

        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};