//Seed your database. Create at least three Book objects with all available attributes.
const mongoose = require('mongoose');
require('dotenv').config();

let DATABASE_URL = 'mongodb://localhost:27017/301'
mongoose.connect(DATABASE_URL);

const Book = require('./book');

async function seed() {
    await Book.create({
        title: 'Parable of the Sower',
        description: '1993 speculative fiction novel set in a post-apocalyptic Earth heavily affected by climate change and social inequality.',
        status: true
    })
    await Book.create({
        title: 'Americanah',
        description: 'Ifemelu and Obinze are young and in love when they depart military-ruled Nigeria for the West. Beautiful, self-assured Ifemelu heads for America, where despite her academic success, she is forced to grapple with what it means to be Black for the first time. Quiet, thoughtful Obinze had hoped to join her, but with post 9/11 America closed to him, he instead plunges into a dangerous, undocumented life in London.',
        status: true
    })
    await Book.create({
        title: 'All About Love',
        description: 'All About Love reveals what causes a polarized society, and how to heal the divisions that cause suffering. Here is the truth about love, and inspiration to help us instill caring, compassion, and strength in our homes, schools, and workplaces.',
        status: false,
    })

    console.log('some books');

    mongoose.disconnect();
}

seed();