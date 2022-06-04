const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: String,
    movies: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Movie'
        }
    ],

    data: Object
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;