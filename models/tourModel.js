const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    // Array of strings
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    // Array of dates
    startDates: [Date],
    slug: String,
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Use a regular function here.
// I cant use an arrow function as an arrow function doesnt get its own 'this' keyword.
// But here we need a 'this' keyword in this function.
// Thats why we use a regular function.
tourSchema.virtual('durationInWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE
// Runs only before .save() and .create() events
// Doesnt run on any other event like insertMany()
tourSchema.pre('save', function (next) {
  // this- points to the currently processing MongoDB document.
  // console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function (next) {
//   console.log('Will save document...');
//   next();
// });

// tourSchema.post('save', function (document, next) {
//   console.log(document);
//   next();
// });

// QUERY MIDDLEWARE
// A pre middleware for find
// Runs only when a find query is executed
tourSchema.pre(/^find/, function (next) {
  // tourSchema.pre('find', function (next) {
  // this- points to the current query/ query object
  // We arent processing any documents here

  // Select only tours whose secret is not equal to true
  this.find({ secretTour: { $ne: true } });
  this.queryExecutionStartTime = Date.now();
  next();
});

// A post middleware for find
// In a post middleware, we get access to all the documents returned by a MongoDB query.
tourSchema.post(/^find/, function (documents, next) {
  const queryExecutionTime = Date.now() - this.queryExecutionStartTime;
  // console.log(`The query took ${queryExecutionTime} milliseconds to execute.`);
  // console.log(documents);
  next();
});

// AGGREGATION MIDDLEWARE
// Runs before any aggregation query is executed
tourSchema.pre('aggregate', function (next) {
  // this- points to the current aggregation object
  // console.log(this);

  // Select only tours whose secret is not equal to true
  this.pipeline().unshift({
    $match: { secretTour: { $ne: true } },
  });

  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
