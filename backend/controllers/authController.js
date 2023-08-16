const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email }).select('+password')

        if (!user) return next(new AppError('This user does not exist', 404))
        if (!await user.checkPassword(password, user.password)) return next(new AppError('Password incorrect', 401))

        user.password = undefined

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
                id: user._id,
                theme: user.theme
            }
        })

    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.verify = async (req, res, next) => {
    const token = req.cookies.jwt
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()

    } catch (err) {
        res.clearCookie('jwt')
        return res.redirect('/welcome')
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('jwt')
    res.end()
}