const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const bearer = req.headers.authorization?.match(/^Bearer +([^\s]+)$/i);
    if (!bearer) {
        return res.status(401).json({ message: 'No Bearer token provided' });
    }

    let claims;
    try {
        claims = jwt.verify(bearer[1], process.env.JWT_SECRET, { algorithms: ['HS256'] });
    } catch {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
    if (typeof claims.id !== 'string' || !/^[a-f\d]{24}$/i.test(claims.id) ||
        !await User.exists({ _id: claims.id })) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = claims;
    next();
};
