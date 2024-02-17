const SubTask = require('../models/subTask')
const Task = require('../models/task')

async function handleSubTaskCreate(req, res) {
    const {taskId} = req.body
    const subTask = await SubTask.create({
        taskId
    })
    return res.status(200).json(subTask)
}

async function handleSubTaskDelete(req, res) {
    const id = req.params['id']

    const updatedSubTask = await SubTask.updateOne({_id: id}, {
        active: false
    })
    return res.status(200).json(updatedSubTask)
}

async function handleSubTaskUpdate(req, res) {
    const {status} = req.body;
    const id = req.params['id']
   
    const updateSubTask = await SubTask.findOneAndUpdate({_id: id}, {
        status
    })
    const taskId = updateSubTask.taskId;
    const totalSubTask = await SubTask.aggregate([
        {
            $match: {
                taskId: taskId
            }
        },
        {
            $group: {
                _id: null,
                count: {$sum: 1}
            }
        }
    ])
    const totalCompletedSubTask = await SubTask.aggregate([
        {
            $match: {
                taskId: taskId,
                status: true
            }
        },
        {
            $group: {
                _id: null,
                count: {$sum: 1}
            }
        }
    ])
    
    let taskStatus = "IN_PROGRESS";
    if(totalCompletedSubTask.length === 0){
        taskStatus = "TODO";
    }else if(totalCompletedSubTask[0].count === totalSubTask[0].count){
        taskStatus = "DONE";
    }else{
        taskStatus = "IN_PROGRESS";
    }
    const updateTaskStatus = await Task.findOneAndUpdate({_id: taskId}, {
        status: taskStatus
    })

    return res.status(200).json({
        msg: "sub-task successfully updated",
        status: true,
        subtask: updateSubTask,
        task: updateTaskStatus
    })
}

async function handleSubTaskGet(req, res) {
    const page = req.query.page || 0;
    const perpage = req.query.row || 5;
    const totalSubTask = await SubTask.find({active: true}).count()

    if(page*perpage >= totalSubTask){
        return res.status(200).json({
            status: false,
            msg: "page ends"
        })
    }

    const allSubTask = await SubTask.find({active: true})
                                    .skip(page*perpage)
                                    .limit(perpage)
    return res.status(200).json({
        status: true,
        meta: {
            subTaskInPage: allSubTask.length,
            totalSubTask: totalSubTask
        },
        data: {
            allSubTask
        }
    })
    
}

async function handleSubTaskGetById(req, res) {
    const page = req.query.page || 0;
    const perpage = req.query.row || 5;
    const taskId = req.params['id'];
    const totalSubTask = await SubTask.find({taskId, active: true}).count()

    if(page*perpage >= totalSubTask){
        return res.status(200).json({
            status: false,
            msg: "page ends"
        })
    }

    const allSubTask = await SubTask.find({taskId, active: true})
                                    .skip(page*perpage)
                                    .limit(perpage)
    return res.status(200).json({
        status: true,
        meta: {
            subTaskInPage: allSubTask.length,
            totalSubTask: totalSubTask
        },
        data: {
            allSubTask
        }
    })
}

module.exports = {
    handleSubTaskCreate,
    handleSubTaskDelete,
    handleSubTaskUpdate,
    handleSubTaskGet,
    handleSubTaskGetById
}