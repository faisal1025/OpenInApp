const mongoose = require('mongoose')

const subTaskSchema = mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "task",
        require: true
    },
    status: {
        type: Boolean,
        require: true,
        default: false
    },
    deleted_at: {
        type: Date
    },
    active: {
        type: Boolean,
        require: true,
        default: true
    }
},
{timestamps: true})

const SubTask = mongoose.model('subtask', subTaskSchema)

module.exports = SubTask