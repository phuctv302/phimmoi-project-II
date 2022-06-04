const express = require('express');

const movieController = require('../controller/movieController');

const router = express.Router();

router.get('/random', movieController.getRandomMovie);

/* CRUD */
router
    .route('/')
    .get(movieController.getAllMovies)
    .post(movieController.createMovie);
router
    .route('/:id')
    .get(movieController.getMovie)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie);

module.exports = router;
