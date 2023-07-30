const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password required'],
        select: false
    },
    mapProvider: {
        type: String,
        default: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
    },
    theme: {
        type: String,
        default: 'dark',
        enum: ['dark', 'light', 'blue']
    }
})

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
})

userSchema.methods.checkPassword = async function (candidatePass, userPass) {
    return await bcrypt.compare(candidatePass, userPass)
}

const userModel = mongoose.model('User', userSchema)
module.exports = userModel