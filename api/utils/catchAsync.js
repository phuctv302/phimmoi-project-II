/**
 * @desc short way to implement try catch in async function
 * 
 * @param {object} fn - async function
 * @return {object} function that is wrapped in catchAsync
 */
module.exports = fn => {
    return (req, res ,next) => {
        fn (req, res, next).catch(err => next(err))
    }
}