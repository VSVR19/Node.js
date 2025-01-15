const Tour = require('../models/tourModel');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

  next();
};

exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    // Destructuring is one way to deep copy an object!
    // 1. Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((item) => delete queryObj[item]);

    // 2. Advanced filtering
    let queryString = JSON.stringify(queryObj);
    // /b - match the exact only- gte|gt|lte|lt
    // /g - perform this replace operation multiple times on a string
    // https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065088#questions/7574432
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    // Build a query.
    let query = Tour.find(JSON.parse(queryString));

    // 3. Sorting
    // https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065090#questions/7704598
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      // https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065096#questions/12610996f
      query = query.sort('-createdAt _id');
    }

    // 4. Limiting fields
    // Selecting& displaying only a few fields from the API is called PROJECTION.
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      // Dont display the __v field.
      query = query.select('-__v');
    }

    // 5. Pagination!
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      // https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15065096#questions/7581330
      // const numberOfTours = await Tour.countDocuments();
      const numberOfTours = await Tour.countDocuments(queryString);
      if (skip >= numberOfTours) throw new Error('This page doesnt exist');
    }

    // Execute the query.
    const allTours = await query;

    res.status(200).json({
      status: 'success',
      results: allTours.length,
      data: { tours: allTours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (err) {
    return res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404),
      json({
        status: 'failed',
        message: err,
      });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { tour: updatedTour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};
