//Modularize your code by putting your schema and model in its own separate file and requiring the schema into your server.
const mongoose = require('mongoose');

const { Schema } = mongoose;

//Build a Mongoose 'Book' schema with valid keys for `title`, `description`, and `status`. 
const bookSchema = new Schema({
  title: String,
  description: String,
  status: String,
});

//Use your schema to craft a Book model.
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;