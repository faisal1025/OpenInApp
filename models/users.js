const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true,
    },
    priority: {
        type: Number,
        require: true,
        default: 0,
    }

},
{timestamps: true})

const User = mongoose.model('user', userSchema)

module.exports = User