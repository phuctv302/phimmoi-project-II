const express = require('express');

const categoryController = require('../controller/categoryController');
const movieRouter = require('./movieRoutes');

const router = express.Router();

/* GET ALL MOVIES BY CATEGORY */
router.use('/:categoryId/movie', movieRouter);
router.use('/:categoryId/movies', movieRouter);

/* CRUD */
router
    .route('/')
    .get(categoryController.getAllCategories)
    .post(categoryController.createCategory);
router
    .route('/:id')
    .get(categoryController.getCategory)
    .patch(categoryController.updateCategory)
    .delete(categoryController.checkEmptyCategory, categoryController.deleteCategory);

module.exports = router;
