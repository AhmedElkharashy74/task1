const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Other setup code...

const JWT_SECRET = process.env.JWT_SECRET; 
const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = generateToken;
