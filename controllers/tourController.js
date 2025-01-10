// const fs = require('fs');
const Tour = require('../models/tourModel');

// Read the simple-tours.json file
// const simpleTours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: simpleTours.length,
    // data: { tours: simpleTours },
  });
};

exports.createTour = (req, res) => {
  // const newId = simpleTours[simpleTours.length - 1].id + 1;
  // const newTour = { id: newId, ...req.body };
  // simpleTours.push(newTour);

  // fs.writeFile(
  // `${__dirname}/dev-data/data/tours-simple.json`,
  // JSON.stringify(simpleTours, null, 4),
  // (err) => {
  res.status(201).json({
    status: 'success',
    // data: { tour: newTour },
  });
};
// );
// };

exports.getTour = (req, res) => {
  const requestId = Number(req.params.id);
  // const tour = simpleTours.find((item) => item.id === requestId);
  // res.status(200).json({ status: 'success', data: { tours: tour } });
};

exports.updateTour = (req, res) =>
  res
    .status(200)
    .json({ status: 'success', data: { tour: 'Updated tour here' } });

exports.deleteTour = (req, res) =>
  res.status(204).json({ status: 'success', data: null });

// exports.checkId = (req, res, next, val) => {
//   if (Number(val) > simpleTours.length)
//     return res.status(404).json({ status: 'fail', message: 'Invalid ID' });

//   // DONT FORGET TO CALL NEXT IN A MIDDELEWARE FUNCTION!
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing tour name in the request body',
//     });
//   }
//   if (!req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing tour price in the request body',
//     });
//   }
//   next();
// };
