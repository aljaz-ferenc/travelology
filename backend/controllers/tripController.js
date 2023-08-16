const Trip = require('../models/tripModel')
const AppError = require('../utils/appError')

exports.getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find()

        res.status(200).json({
            status: 'success',
            data: trips,
            results: trips.length
        })

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.createTrip = async (req, res) => {
    try {
        const trip = await Trip.create({
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            spots: req.body.spots,
            user: req.user.user
        })

        res.status(200).json({
            status: 'success',
            data: trip,
        })

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getTrip = async (req, res, next) => {
    try {
        const trip = await Trip.findById(req.params.tripId)
        if(!trip) return next(new AppError('Trip not found', 404))

        res.status(200).json({
            status: 'success',
            data: trip,
        })
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.deleteTrip = async (req, res, next) => {
    const id = req.params.tripId
    try {
        const trip = await Trip.findByIdAndDelete(id)
        if(!trip) return next(new AppError('Trip not found', 404))

        res.status(200).json({
            status: 'success',
            data: trip
        })

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}

exports.updateTrip = async (req, res, next) => {
    try {
        const trip = await Trip.findByIdAndUpdate(req.body.id, { title: req.body.title }, { new: true })

        if(!trip) return next(new AppError('Trip not found', 404))

        res.status(200).json({
            status: 'success',
            data: trip
        })

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}