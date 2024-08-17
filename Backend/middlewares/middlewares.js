const { JWT_SECRET } = require('../utils/constants');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

const roleMiddleware = (role) => (req, res, next) => {
    if (req.role !== role) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

module.exports = { authMiddleware, roleMiddleware };
