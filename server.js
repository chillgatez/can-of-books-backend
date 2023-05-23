'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
//Add Mongoose to your server. Ensure your local Mongo database is running. Connect to the Mongo database from within your server code. 
const mongoose = require('mongoose');
//Modularize your code by putting your schema and model in its own separate file and requiring the schema into your server.
const Book = require('./book');
const app = express();

app.use(cors());

//for parsing json data
app.use(express.json());

let DATABASE_URL = 'mongodb://localhost:27017/301'

mongoose.connect(DATABASE_URL);

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books', async (request, response) => {
  try {
    const books = await Book.find(); 
    response.json(books);
  } catch (error) {
    response.status(404).json({error: 'books not found'});
  }

});

app.post('/books', async (request, response) => {
  try {
    const {title, description, status} = request.body;
    const newBook = new Book ({title, description, status});
    await newBook.save();
    response.status(201).json(newBook);
  } catch {
    response.status(500).json({error: 'failed to create new book'})
  }

});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
