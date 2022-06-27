const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const User = require('../model/userModel');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

/**
 * @desc It creates a JWT token, sets the cookie options, sets the cookie, removes the password from the
 * output, and sends the response.
 *
 * @param user - the user object that we just created or updated
 * @param statusCode - the status code of the response
 * @param res - the response object
 */
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    // sending jwt via cookie
    res.cookie('jwt', token, cookieOptions);

    // remove password from output
    user.password = undefined;
    user.passwordConfirm = undefined;

    res.status(statusCode).json({
        status: 'success',
        data: {
            user,
        },
        token,
    });
};

/**
 * Only allow logged in user to access
 */
exports.protect = catchAsync(async (req, res, next) => {
    // Get token and check
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(
            new AppError(
                'You are not logged in yet. Please login to access!',
                401
            )
        );
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user exists
    const currentUser = await User.findById(decoded.id);
    if (!(currentUser)) {
        return next(
            new AppError('The user belong to the token no longer exists!', 401)
        );
    }

    // allow access
    req.user = currentUser;
    next();
});

/* A middleware that checks if the user has the right role to perform the action. */
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    "You don't have permission to perform this action!",
                    403
                )
            );
        }
        next();
    };
};

/* Creating a new user and sending a token. */
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    // send token
    createSendToken(newUser, 201, res);
});

/* LOG USER IN */
exports.login = catchAsync(async (req, res, next) => {
    // Get email & password from input
    const { email, password } = req.body;

    // check user exist
    const user = await User.findOne({ email }).select('+password');

    // check password
    if (!user || !(await user.correctPassword(password, user.password))) {
        console.log(user);
        return next(new AppError('Incorrect email or password', 400));
    }

    // send token
    createSendToken(user, 200, res);
});

/* LOG USER OUT */
exports.logout = (req, res, next) => {
    res.cookie('jwt', 'logged_out', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({
        status: 'success',
    });
};
