const book = require('./controllers/book');
const Router = require('express').Router;
const user = require('./controllers/user');
const router = new Router();
const auth = require('./middlwares/auth');

router.get('/books/' , book.read);

router.post('/books',auth , book.createBook);

router.put('/books/:id',auth , book.update);

router.delete('/books/:id',auth, book.deleteBook);

router.post('/register', user.register);

router.post('/login', user.login);


module.exports = router;