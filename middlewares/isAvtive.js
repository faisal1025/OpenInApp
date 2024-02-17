const SubTask = require("../models/subTask");
const Task = require("../models/task");

async function isSubTaskActive(req, res, next) {
    const id = req.params['id']
    const subtask = await SubTask.findOne({
        _id: id,
        active: true
    })
    if(subtask) next();
    else return res.status(404).json({
        msg: "subtask doesn't exist",
        status: false
    })
}

async function isTaskActive(req, res, next) {
    const id = req.params['id']
    const task = await Task.findOne({
        _id: id,
        active: true
    })
    if(task) next();
    else return res.status(404).json({
        msg: "task doesn't exist",
        status: false
    })
}

module.exports = {
    isSubTaskActive,
    isTaskActive
}