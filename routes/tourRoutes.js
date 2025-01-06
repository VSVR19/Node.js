const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// Use a new middleware, param.
// This middleware will only run for certain parameters.
// In this case, it will only run for the id parameter.
router.param('id', tourController.checkId);

// Create a checkBody middleware.
// This middleware will check if the body contains the name and price properties.
// If not, it will send back a 400 status code and a message.
// Add it to the post handler stack.
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
