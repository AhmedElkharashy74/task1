const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: false, // Optional
    },
    price: {
        type: Number,
        required: true,
    },
    
},
{timestamps : true});

// Compile model from schema
const BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;
