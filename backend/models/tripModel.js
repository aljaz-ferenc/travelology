const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title required']
    },
    description: {
        type: String,
        required: [true, 'content required']
    },
    startDate: {
        type: Date,
        required: [true, 'start date required']
    },
    endDate: {
        type: Date,
        required: [true, 'end date required']
    },
    spots: {
        type: Object,
        required: [true, 'at least one spot required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user required']
    }
})

tripSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name _id'
    })
    next()
})

const tripModel = mongoose.model('Trip', tripSchema)
module.exports = tripModel