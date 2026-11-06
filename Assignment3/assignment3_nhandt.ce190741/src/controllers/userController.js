const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const roleDoc = await Role.findOne({ name: role });
        if (!roleDoc) {
            return res.status(404).json({ message: 'Role not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword,
            role: roleDoc._id
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 