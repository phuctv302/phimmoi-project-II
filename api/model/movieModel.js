const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        categories: [{ type: mongoose.Schema.ObjectId, ref: 'Category' }],
        company: String,
        description: String,
        actors: [{ name: String }],
        director: String,
        countries: [String],
        year: Number,
        videoUrl: String,

        createdAt: {
            type: Date,
            default: new Date(Date.now()),
        },
        updatedAt: {
            type: Date,
            default: new Date(Date.now()),
        },
        data: Object,
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
