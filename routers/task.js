const express = require('express')
const {handleCreateTask, handleDeleteTask, handleUpdateTask, handleTaskGet} = require('../controllers/task')
const { isTaskActive } = require('../middlewares/isAvtive')
const router = express.Router()

router.route('/create')
    .post(handleCreateTask)

router.route('/delete/:id')
    .delete(isTaskActive,  handleDeleteTask)

router.route('/update/:id')
    .put(isTaskActive, handleUpdateTask)

router.route('')
    .get(handleTaskGet)

module.exports = router