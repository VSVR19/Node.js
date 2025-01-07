const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// Middleware for logging concise request summaries on the CLI.
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware for working with JSON data sent as a part of a request body.
app.use(express.json());
// Middleware for serving static files on a browser.
app.use(express.static(`${__dirname}/public`));

// Sample middleware
app.use((req, res, next) => {
  // console.log('Hello from the middleware 👋');
  next();
});

// Sample middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id?', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// app.route('/api/v1/tours').get(getAllTours).post(createTour);
// app
//   .route('/api/v1/tours/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(deleteTour);

// app.route('/api/v1/users').get(getAllUsers).post(createUser);
// app
//   .route('/api/v1/users/:id')
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
