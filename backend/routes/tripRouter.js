const express = require('express')
const tripController = require('../controllers/tripController')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/')
    .get(tripController.getAllTrips)
    .post(authController.verify, tripController.createTrip)

router.route('/:tripId')
    .get(tripController.getTrip)
    .patch(tripController.updateTrip)

router.route('/:tripId')
    .delete(tripController.deleteTrip)

module.exports = router