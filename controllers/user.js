const User = require('../models/user');
const generateToken = require('../middlwares/generateToken'); // Import your JWT token generation function

// Register new user
const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({ error: 'User already exists' });
        }

        // Create new user
        user = new User({ email, password });
        await user.save();

        // Generate JWT token
        const token = generateToken(user);

        res.status(201).send({ token });
    } catch (err) {
        res.status(500).send({ error: 'Server error', details: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user);

        res.status(200).send({ token });
    } catch (err) {
        res.status(500).send({ error: 'Server error', details: err.message });
    }
};


module.exports = {
     register,
     login
     };
