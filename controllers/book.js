const book = require('../models/book');
const mongoose = require('mongoose');

const createBook = async (req,res)=>{
    const {title , author, price , genre} = req.body;
    
        const bookTitle = await book.findOne({title});
        if(bookTitle){
            res.status(400).send('Book already exists');
            return;
        }
        if(price < 0){
            res.status(400).send('Price cannot be negative');
        }else{
            if(!title || !author || !price || !genre){
                res.status(400).send('All fields are required');
                return;
            }
            try{
                const newBook = new book({
                    title,
                    author,
                    price,
                    genre
                });
                newBook.save();
                res.status(201).send(newBook);
            }catch(err){
                res.send(err);
            }
        }
    
    
}

const read = async (req, res) => {
    try {
        // Pagination parameters
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

        // Validate page and limit
        if (page < 1 || limit < 1) {
            return res.status(400).send({ error: 'Page and limit must be positive integers' });
        }

        // Build query based on provided parameters
        let query = {};
        let sort = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        if (req.query.author) {
            query.author = req.query.author;
        }
        if (req.query.sort === 'asc') {
            sort.price = 1;
        } else if (req.query.sort === 'desc') {
            sort.price = -1;
        }

        // Fetch books with pagination
        const books = await book.find(query).sort(sort).skip((page - 1) * limit).limit(limit);
        const totalBooks = await book.countDocuments(query); // Count total matching documents

        res.status(200).send({
            page,
            limit,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
            books
        });
    } catch (err) {
        res.status(400).send({ error: 'An error occurred while fetching books', details: err.message });
    }
};


const update = async (req, res) => {
    const { id } = req.params;
    const { title, author, price, genre } = req.body;
    try {
        const updatedBook = await book.findByIdAndUpdate(id, { title, author, price, genre }, { new: true });
        if (!updatedBook) {
            res.status(404).send({ error: 'Book not found' });
        } else {
            res.status(200).send(updatedBook);
        }
    } catch (err) {
        res.status(400).send({ error: 'An error occurred while updating the book', details: err.message });
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params;

    // Validate if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ error: 'Invalid ID format' });
    }

    try {
        // Attempt to delete the book by ID
        const deletedBook = await book.findByIdAndDelete(id);

        // Check if the book was found and deleted
        if (!deletedBook) {
            return res.status(404).send({ error: 'Book not found' });
        }

        // Send success response
        res.status(200).send({ message: 'Book deleted successfully' });
    } catch (err) {
        // Handle errors
        res.status(400).send({ error: 'An error occurred while deleting the book', details: err.message });
    }
};


module.exports = {
    createBook,
    read,
    update,
    deleteBook
}
