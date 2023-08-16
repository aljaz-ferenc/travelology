const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = require('./app')

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...')
    console.log(err.name, err.message)
    process.exit(1)
})

dotenv.config({ path: '.env' })

const DB = process.env.DATABASE
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con => console.log('DB connection successful!'))

const port = 10000
// const port = process.env.PORT || 10000

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! Shutting down...')
    console.log(err.name, err.message)

    server.close(() => {
        process.exit(1)
    })
})

module.exports = server