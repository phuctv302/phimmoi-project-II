/**
 * @desc takes a query and a query string, and then it filters, sorts, limits fields, and paginates the
 * documents based on the query string.
*/
class APIFeature {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    /**
     * @desc filter documents base on the query string
     * 
     * @return {object} apiFeature
     */
    filter() {
        const queryObj = { ...this.queryString };

        const excludedFields = ['sort', 'limit', 'page', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g);
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    /**
     * @desc sort documents based on the query string, otherwise sort by createdAt (latest first)
     * 
     * @return {object} apiFeature
     */
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy).sort('id');
        } else {
            this.query = this.query.sort('-createdAt id');
        }

        return this;
    }

    /**
     * @desc limit fields of each doc in order not to pollute the response
     * 
     * @return {object} apiFeature
     */
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    /**
     * @desc paginate documents - default is 100 doc for each page
     * 
     * @return {object} apiFeature
     */
    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeature;
