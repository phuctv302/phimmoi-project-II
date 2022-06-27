const express = require('express');

const movieController = require('../controller/movieController');
const authController = require('../controller/authController');

const router = express.Router({mergeParams: true}); // allow using params from other router


// get random movie
router.get('/random', movieController.getRandomMovie);

// With shelf
router.get('/shelf', authController.protect, movieController.getMoviesInShelf);
router.route('/:id/shelf')
	.post(authController.protect, movieController.addMovieToShelf)
	.delete(authController.protect, movieController.removeMovieFromShelf);

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
