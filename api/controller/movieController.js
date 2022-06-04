const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeature = require('../utils/apiFeature');

const Movie = require('../model/movieModel');

// RANDOM
exports.getRandomMovie = catchAsync(async (req, res, next) => {
    const { type } = req.query;

    let movie;
    if (type === 'series') {
        movie = await Movie.aggregate([
            { $match: { isSeries: true } },
            { $sample: { size: 1 } },
        ]);
    } else {
        movie = await Movie.aggregate([
            { $match: { isSeries: false } },
            { $sample: { size: 1 } },
        ]);
    }

    res.status(200).json({
        status: 'success',
        data: {
            movie,
        },
    });
});

/* STANDARD CRUD */
exports.getAllMovies = catchAsync(async (req, res, next) => {
    const apiFeature = new APIFeature(Movie.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const movies = await apiFeature.query;

    res.status(200).json({
        status: 'success',
        data: {
            movies,
        },
    });
});

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

exports.createMovie = catchAsync(async (req, res, next) => {
    const newMovie = await Movie.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            movie: newMovie,
        },
    });
});

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

exports.deleteMovie = catchAsync(async (req, res, next) => {
    const deleteMovie = await Movie.findOneAndDelete({ id: req.params.id });

    if (!deleteMovie) return next(new AppError('No movie found!', 404));

    res.status(204).json({
        status: 'success',
        data: null,
    });
});
