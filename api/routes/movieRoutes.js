const express = require('express');

const movieController = require('../controller/movieController');

const router = express.Router({mergeParams: true}); // allow using params from other router

// get random movie
router.get('/random', movieController.getRandomMovie);

/* CRUD */
router
    .route('/')
    .get(movieController.getAllMovies)
    .post(movieController.createMovie);
router
    .route('/:id')
    .get(movieController.getMovie)
    .post(movieController.addMovieInCategory)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie);

module.exports = router;
