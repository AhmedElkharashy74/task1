const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Other setup code...

const JWT_SECRET = process.env.JWT_SECRET; 

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).send({ error: 'Token required' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send({ error: 'Forbidden' });

        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;
