const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeature = require('../utils/apiFeature');

const User = require('../model/userModel');

/* CURD */
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const apiFeature = new APIFeature(User.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const users = await apiFeature.query;

    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    })
});

exports.getUser = catchAsync(async(req, res, next) => {
    const user = await User.findOne({id: req.params.id});

    if (!user){
        return next(new AppError('No user found!', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
})


/* A middleware that is used to get the current user. */
exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;

    next();
}