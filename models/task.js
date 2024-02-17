const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    due_date: {
        type: Date,
        require: true 
    },
    priority: {
        type: Number,
        require: true,
        default: 3
    },
    status: {
        type: String,
        enum: ['TODO', 'IN_PROGRESS', 'DONE'],
        default: 'TODO'
    },
    active: {
        type: Boolean,
        require: true,
        default: true
    }
}, 
{timestamps: true})

const Task = mongoose.model('task', taskSchema)

module.exports = Task