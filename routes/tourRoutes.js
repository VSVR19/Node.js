const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// Creating an alias route to return the top cheap& best routes
router
  .route('/top-5-best')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

// Create a checkBody middleware.
// This middleware will check if the body contains the name and price properties.
// If not, it will send back a 400 status code and a message.
// Add it to the post handler stack.
router
  .route('/')
  .get(tourController.getAllTours)
  // .post(tourController.checkBody, tourController.createTour);
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
