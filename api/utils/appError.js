
/**
 * @desc a custom Error class
 * 
 * @param {String} message - error message
 * @param {int} statusCode - status code of error
 */
class AppError extends Error {
    constructor(message, statusCode){
        super(message)

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true; // trusted errors - errors that are handled

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError;