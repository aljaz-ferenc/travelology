const express = require('express')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')

const userRouter = require('./routes/userRoutes')
const tripRouter = require('./routes/tripRouter')
const authRouter = require('./routes/authRouter')

const app = express()

app.use(cors({
  origin: process.env.APP_URL,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));

app.use(express.urlencoded())
app.use(cookieParser())
app.use(helmet())
app.use(express.json())
app.use(mongoSanitize())
app.use(xss())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/trips', tripRouter)
app.use('/api/v1/auth', authRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} not found`, 404))
})

app.use(globalErrorHandler)

module.exports = app

