var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/bookshelf');

var Book = require('./model/book');
const book = require('./model/book');

//Allow all requests from all domains & localhost
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET", "PUT", "DELETE");
    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/bookshelf', function (request, response) {

    Book.find({}, function (err, books) {
        if (err) {
            response.status(500).send({ error: "Could not fetch books" });
        } else {
            response.send(books);
        }
    });
});
app.post('/bookshelf/book/add', function (request, response) {
    var newBook = new Book();
    newBook.title = request.body.title;
    newBook.category = request.body.category;
    newBook.authorId = request.body.authorId;
    console.log(newBook);
    //Product.create(function(err,newBook){
    newBook.save(function (err, newBook) {
        if (err) {
            response.status(500).send({ error: "Could not add book" });
        } else {
            response.send(newBook);
        }
    });
});

app.put('/bookshelf/book/update', function (request, response) {
    Book.findOne({ _id: request.body._id }, function (err, product) {
        if (err) {
            response.status(500).send({ error: "Could not find book to update" });
        } else {
            var updatedbook = {
                title: request.body.title,
                category: request.body.category
            }
            Book.update({ _id: request.body._id }, updatedbook, function (err, product) {
                if (err) {
                    response.status(500).send({ error: "Update error in book" });
                } else {
                    response.send("Successfully added to book");
                }
            });
        }
    })
});

app.delete('/bookshelf/book/delete/:id', function (request, response) {
    Book.findByIdAndRemove({ _id: request.params.id}, function (err, product) {
        if (err) {
            response.status(500).send({ error: "Could not find book to delete" });
        } else {
            response.send("Successfully deleted book");
        }
    });
});

app.get('/', function (req, res) {
    res.send('Hone response');
});
app.get('/KK', function (req, res) {
    res.send('you can have called the getBooksAPI');
});

app.listen(3004, function () {
    console.log("Swag Shop API running on port 3004...");
});
