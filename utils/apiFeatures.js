class APIFeatures {
  // query- Mongoose query
  // queryString- We get this from Express
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Destructuring is one way to deep copy an object!
    // 1. Filtering
    const queryObj = { ...this.queryString };
    console.log('Here!');
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((item) => delete queryObj[item]);

    // 2. Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    // /b - match the exact only- gte|gt|lte|lt
    // /g - perform this replace operation multiple times on a string
    // https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065088#questions/7574432
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Build a query.
    // let query = Tour.find(JSON.parse(queryString));
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    // https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065090#questions/7704598
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      // https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065096#questions/12610996f
      this.query = this.query.sort('-createdAt _id');
    }
    return this;
  }

  limit() {
    // Selecting& displaying only a few fields from the API is called PROJECTION.
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // Dont display the __v field.
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = Number(this.queryString.page);
    const limit = Number(this.queryString.limit);
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   // https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065096#questions/7581330
    //   // const numberOfTours = await Tour.countDocuments();
    //   const numberOfTours = await Tour.countDocuments(queryString);
    //   if (skip >= numberOfTours) throw new Error('This page doesnt exist');
    // }
    return this;
  }
}

module.exports = APIFeatures;
