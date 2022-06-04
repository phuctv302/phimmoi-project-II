const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        name: String,
        isSeries: Boolean,
        image: String,
        category_id: [{ type: mongoose.Schema.ObjectId }],
        company: String,
        description: String,
        actors: [{ name: String }],
        director: String,
        country: [String],
        year: Number,
        video: String,
        trailer: String,
        createdAt: {
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
