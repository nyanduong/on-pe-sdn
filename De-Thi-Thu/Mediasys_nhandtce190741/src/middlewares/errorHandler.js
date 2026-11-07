module.exports = (error, req, res, next) => {
    if (error.code === 11000) {
        return res.status(409).json({ message: 'Username already exists' });
    }
    if (error.status === 400) {
        return res.status(400).json({ message: 'Invalid request body' });
    }
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
};
