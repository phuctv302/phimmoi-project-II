const AppError= require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const APIFeature = require('../utils/apiFeature')

const Category = require('../model/categoryModel');

/* GET ALL CATEGORIES */
exports.getAllCategories = catchAsync(async (req, res, next) => {
    const apiFeature = new APIFeature(Category.find(), req.query).filter().sort().limitFields().paginate();

    const categories = await apiFeature.query;

    res.status(200).json({
        status: 'success',
        result: categories.length,
        data: {
            categories
        }
    })
});

/* GET CATEGORY BY ID */
exports.getCategory = catchAsync(async(req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new AppError('No category found!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            category
        }
    })
});

/* CREATE NEW CATEGORY */
exports.createCategory = catchAsync(async(req, res, next) => {
    const newCategory = await Category.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            category: newCategory
        }
    })
})

/* UPDATE CATEGORY BY ID */
exports.updateCategory = catchAsync(async(req, res, next) => {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true
    });

    if (!updatedCategory){
        return next(new AppError('No category found!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            category: updatedCategory
        }
    })
});

/* DELETE CATEGORY BY ID */
exports.deleteCategory = catchAsync(async(req, res, next) => {
    await Category.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    })
})

/**
 * @desc Checking if the category is empty or not. If it is empty, it will be allowed to be deleted 
 * @return error if category is not empty, else @return next()
 * */
exports.checkEmptyCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
        return next(new AppError('No category found!', 404));
    }

    // allow to delete
    if (category.movies.length > 0) return next();

    return next(new AppError('This category can\'t be deleted because it is not empty!', 400));
})