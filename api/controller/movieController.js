const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeature = require('../utils/apiFeature');

const Movie = require('../model/movieModel');
const Category = require('../model/categoryModel');

// GET RANDOM MOVIE BY TYPE (SERIES OR NOT)
exports.getRandomMovie = catchAsync(async (req, res, next) => {

    const  movie = await Movie.aggregate([
        { $sample: { size: 1 } },
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            movie,
        },
    });
});

/* ADD MOVIE INTO A CATEGORY */
exports.addMovieInCategory = catchAsync(async(req, res, next) => {
    const { categoryId, id } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) return next(new AppError('No category found!', 404));

    const movie = await Movie.findById(id);
    if (!movie) return next(new AppError('No movie found!', 404));

    // update
    if (category.movies.includes(id)){
        return next(new AppError('Movie exists in this category!', 400));
    }
    category.movies.push(id);
    movie.categories.push(categoryId);

    await category.save();
    await movie.save();

    res.status(200).json({
        status: 'success',
        data: {
            category,
            movie
        }
    });
})

/* STANDARD CRUD */
exports.getAllMovies = catchAsync(async (req, res, next) => {

    let filter = {};
    if (req.params.categoryId){
        filter = {categories: req.params.categoryId}
    }

    const apiFeature = new APIFeature(Movie.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const movies = await apiFeature.query;

    res.status(200).json({
        status: 'success',
        result: movies.length,
        data: {
            movies,
        },
    });
});

/* GET MOVIE BY ID */
exports.getMovie = catchAsync(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return next(new AppError('No movie found!', 404));

    res.status(200).json({
        status: 'success',
        data: {
            movie,
        },
    });
});

/* CREATE NEW MOVIE */
exports.createMovie = catchAsync(async (req, res, next) => {
    const newMovie = await Movie.create(req.body);

    // update category (persistent)
    if (req.body.categories){
        const categories = await Category.find({ id: {$in: req.body.categories} });
        categories.forEach(async(category) => {
            category.movies.push(newMovie);
            await category.save();
        })
    }

    res.status(201).json({
        status: 'success',
        data: {
            movie: newMovie,
        },
    });
});

/* UPDATE MOVIE BY ID */
exports.updateMovie = catchAsync(async (req, res, next) => {
    const updateMovie = await Movie.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        {
            runValidators: true,
            new: true,
        }
    );

    if (!updateMovie) return next(new AppError('No movie found!', 404));

    res.status(200).json({
        status: 'success',
        data: {
            movie: updateMovie,
        },
    });
});

/* DELETE MOVIE BY ID */
exports.deleteMovie = catchAsync(async (req, res, next) => {

    // remove movie in category
    if (req.params.categoryId){
        const category = await Category.findById(req.params.categoryId);
        if (!category) return next(new AppError('No category found!', 404));

        const movie = await Movie.findById(req.params.id);
        if (!movie) return next(new AppError('No movie found!', 404));

        movie.categories = movie.categories.filter(e => e != category.id);
        category.movies = category.movies.filter(e => e != movie.id);

        await movie.save();
        await category.save();

        return res.status(200).json({
            status: 'success',
            data: {
                category,
                movie
            }
        })
    }

    // delete movie
    const deleteMovie = await Movie.findOneAndDelete({ id: req.params.id });

    if (!deleteMovie) return next(new AppError('No movie found!', 404));

    res.status(204).json({
        status: 'success',
        data: null,
    });
});
