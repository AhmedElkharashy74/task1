const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');
require('dotenv').config();


// Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/bookstore';
const JWT_SECRET = process.env.JWT_SECRET;
mongoose.connect(mongoDB, {  });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

// Use middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS for all routes
app.use('/', router);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
