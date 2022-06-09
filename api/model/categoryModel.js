const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: String,
    movies: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Movie'
        }
    ],

    createdAt: {
        type: Date,
        default: new Date(Date.now())
    },
    updatedAt: {
        type: Date,
        default: new Date(Date.now())
    },
    data: Object
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;