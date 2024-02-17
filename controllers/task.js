const SubTask = require('../models/subTask');
const Task = require('../models/task');
const { findTaskPriority } = require('../services/findTaskPriority');

async function handleCreateTask(req, res) {
    const {title, description, due_date} = req.body;
    const priority = findTaskPriority(due_date)
    const task = await Task.create({
        title, description, due_date, priority
    })

    return res.status(200).json(task)
}

async function handleDeleteTask(req, res) {
    const id = req.params['id'];
    const updatedTask = await Task.updateOne({_id: id}, {
        active: false
    })
    const updatedSubTask = await SubTask.updateMany({taskId: id}, {
        active: false
    })

    return res.status(200).json({
        task: updatedTask,
        relatedSubTask: updatedSubTask
    })
}

async function handleUpdateTask(req, res) {
    const {due_date, status} = req.body
    const id = req.params['id']
    const priority = findTaskPriority(due_date)

    const updatedTask = await Task.updateOne({_id: id}, {
        due_date,
        priority,
        status
    })

    if(status == "DONE"){
        const updateSubTaskOnStatus = await SubTask.updateMany({taskId: id}, {
            status: true
        })
    }else if(status === "TODO"){
        const updateSubTaskOnStatus = await SubTask.updateMany({taskId: id}, {
            status: false
        })
    }

    return res.status(200).json({
        msg: "task and subtask according to task status updated successfully",
        status: true,
        task: updatedTask
    })
}

async function handleTaskGet(req, res) {
    const page = req.query.page || 0;
    const perpage = req.query.row || 5;
    const priority = req.query.priority || null;
    const due_date = req.query.due_date || null;

    let totalTask, allTask;

    if(priority && due_date === null){
        totalTask = await Task.find({priority, active: true}).count()
    
        if((page*perpage) >= totalTask){
            console.log("ye kr rha h", totalTask);
            return res.status(200).json({
                status: false,
                msg: "page ends"
            })
        }
        
        allTask = await Task.find({priority, active: true})
                                        .skip(page*perpage)
                                        .limit(perpage)
    }
    else if(due_date && priority === null){
        totalTask = await Task.find({due_date: {$gte: due_date}, active: true}).count()
    
        if(page*perpage >= totalTask){
            return res.status(200).json({
                status: false,
                msg: "page ends"
            })
        }
        
        allTask = await Task.find({due_date: {$gte: due_date}, active: true})
                                        .skip(page*perpage)
                                        .limit(perpage)

    }
    else if(due_date && priority){
        totalTask = await Task.find({priority, due_date: {$gte: due_date}, active: true}).count()
    
        if(page*perpage >= totalTask){
            return res.status(200).json({
                status: false,
                msg: "page ends"
            })
        }
        
        allTask = await Task.find({priority, due_date: {$gte: due_date}, active: true})
                                        .skip(page*perpage)
                                        .limit(perpage)

    }else{
        totalTask = await Task.find({active: true}).count()
    
        if(page*perpage >= totalTask){
            return res.status(200).json({
                status: false,
                msg: "page ends"
            })
        }
        
        allTask = await Task.find({active: true})
                                        .skip(page*perpage)
                                        .limit(perpage)

    }

    return res.status(200).json({
        status: true,
        meta: {
            subTaskInPage: allTask.length,
            totalSubTask: totalTask,
            totalPages: Math.ceil(totalTask/perpage)
        },
        data: {
            allTask
        }
    })
}

module.exports = {
    handleCreateTask,
    handleDeleteTask,
    handleUpdateTask,
    handleTaskGet
}