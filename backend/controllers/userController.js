const User = require('../models/userModel')
const Trip = require('../models/tripModel')
const jwt = require('jsonwebtoken')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json({
            status: 'success',
            data: users,
            results: users.length
        })

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        })

        const token = jwt.sign({ user: user._id.toString() }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })

        res.status(200).json({
            status: 'success',
            data: {
                email: user.email,
                id: user._id
            }
        })


    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    const userId = req.user.user
    try {
        const user = await User.findById(userId).select('+password')
        if (!await user.checkPassword(req.body.password, user.password)) throw new Error('Password incorrect')

        const deletedUser = await User.findByIdAndDelete(userId)

        res.clearCookie('jwt')

        res.status(200).json({
            status: 'success',
            data: deletedUser
        })

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getUser = async (req, res) => {
    const userId = req.user.user
    try {
        const user = await User.findById(userId)
        res.status(200).json({
            status: 'success',
            data: {
                email: user.email,
                mapProvider: user.mapProvider,
                theme: user.theme
            }
        })

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.updateUser = async (req, res) => {
    const userId = req.user.user
    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true })

        res.status(200).json({
            status: 'success',
            data: user
        })

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getTripsByUser = async (req, res) => {
    const userId = req.user.user

    try {
        const trips = await Trip.find({ user: userId })
        res.status(200).json({
            status: 'success',
            data: trips
        })

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.changePassword = async (req, res) => {
    const oldPass = req.body.oldPass
    const newPass = req.body.newPass
    const userId = req.user.user

    const user = await User.findById(userId).select('+password')

    try {
        if (!await user.checkPassword(oldPass, user.password)) throw new Error('Password incorrect')

        user.password = newPass
        await user.save()

        res.status(200).json({
            status: 'success'
        })


    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }

}