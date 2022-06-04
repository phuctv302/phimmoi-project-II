const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
    movies: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Movie',
        },
    ],
    user: mongoose.Schema.ObjectId,
});

const Shelf = mongoose.model('Shelf', shelfSchema);
module.exports = Shelf;
