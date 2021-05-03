const jwt = require('jsonwebtoken');
const session = require('sessionstorage');

module.exports = (req, res, next) => {
    try {
        const token = session.getItem('token');
        const decoded = jwt.verify(token, process.env.jwtKey);
        req.userData = decoded;
        next();
    } catch(err) {
        return res.status(401).json({
            message: "Authentication Failed"
        })
    }
};