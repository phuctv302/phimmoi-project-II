const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, 'Please rate this movie!'],
        min: [1, 'Rating must equal or more than 1.0'],
        max: [5, 'Rating must equal or less than 5.0'],
    },
    movie: mongoose.Schema.ObjectId,
    user: mongoose.Schema.ObjectId,
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;
