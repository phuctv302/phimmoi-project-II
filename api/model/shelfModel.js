const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
    movies: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Movie',
        },
    ],
    user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
});

const Shelf = mongoose.model('Shelf', shelfSchema);
module.exports = Shelf;
