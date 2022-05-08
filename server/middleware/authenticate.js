const jwt = require('jsonwebtoken')
require('dotenv').config();

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers['token'];
        if (!token) {
            return res.status(403).json('not authorized')
        }

        jwt.verify(JSON.parse(token), process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                const errorMessage = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.name;
                return res.status(403).json(errorMessage);
            }
            req.user = payload.user;
            next();
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json('server error');
    }

}

module.exports = authenticate;