const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
    const { username, password } = req.body || {};
    if (typeof username !== 'string' || !username.trim() ||
        typeof password !== 'string' || !password || bcrypt.truncates(password)) {
        return res.status(400).json({ message: 'Provide a username and a password of up to 72 bytes' });
    }
    const user = await User.create({ username, password: await bcrypt.hash(password, 10) });
    res.status(201).json({
        message: 'User registered successfully',
        user: { _id: user._id, username: user.username, createdAt: user.createdAt }
    });
};

exports.signin = async (req, res) => {
    const { username, password } = req.body || {};
    if (typeof username !== 'string' || typeof password !== 'string' || bcrypt.truncates(password)) {
        return res.status(400).json({ message: 'Provide a valid username and password' });
    }
    const user = await User.findOne({ username: username.trim() }).select('+password');
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
