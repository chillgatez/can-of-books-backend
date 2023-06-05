'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
//Add Mongoose to your server. Ensure your local Mongo database is running. Connect to the Mongo database from within your server code. 
const mongoose = require('mongoose');
//Modularize your code by putting your schema and model in its own separate file and requiring the schema into your server.
const Book = require('./book');
// Import the provided authorization middleware
const { verifyJwt, getUserInfo } = require('./authentication');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

app.use(cors());
app.use(verifyJwt);
app.use(getUserInfo);

//for parsing json data
app.use(express.json());


let DATABASE_URL = 'mongodb://localhost:27017/301'


const PORT = process.env.PORT || 3001;

// app.get('/test', (request, response) => {

//   response.send('test request received')

// })

app.get('/books', async (request, response) => {
  try {
    await mongoose.connect(DATABASE_URL);
    const userInfo = request.userInfo;
    const books = await Book.find(userInfo);

    response.json(books);
  } catch (error) {
    response.status(500).json({ error: 'books not found' });
  }
  finally { mongoose.disconnect() }
});

app.post('/books', async (request, response) => {
  try {
    await mongoose.connect(DATABASE_URL);

    const { title, description, status } = request.body;
    const newBook = await Book.create({ title, description, status });

    response.status(201).json(newBook);
  } catch {
    response.status(500).json({ error: 'failed to create new book' })
  }
  finally { mongoose.disconnect() }
});


app.delete('/books/:id', async (request, response) => {
  try {
    await mongoose.connect(DATABASE_URL);

    //finds object by mongoose assigned id data type (objectId)
    const id = request.params.id;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (deletedBook) {
      response.json({ message: 'book has been deleted' });
    } else {
      response.status(404).json({ error: 'book not found' })
    }
  } catch (error) {
    response.status(500).json({ error: 'failed to delete book' });
  } finally { mongoose.disconnect() }
});

app.put('/books/:id', async (request, response) => {
  try {
    await mongoose.connect(DATABASE_URL);

    const id = request.params.id;
    const { title, description, status } = request.body;
    const updatedBook = await Book.findByIdAndUpdate({ id }, { title, description, status }, { new: true });

    if (updatedBook) {
      response.status(201).json({ message: 'Book successfully updated.' });
    } else {
      response.status(404).json({ error: 'Book not found.' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Failed to update book' })
  }
  finally { mongoose.disconnect() }
});



app.listen(PORT, () => console.log(`listening on ${PORT}`));
