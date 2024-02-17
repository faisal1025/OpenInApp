const express = require('express');
const {handleSubTaskCreate, handleSubTaskDelete, handleSubTaskUpdate, handleSubTaskGet, handleSubTaskGetById} = require('../controllers/subTask');
const { isSubTaskActive, isTaskActive } = require('../middlewares/isAvtive');
const router = express.Router();

router.route('/create')
    .post(handleSubTaskCreate)

router.route('/delete/:id')
    .delete(isSubTaskActive, handleSubTaskDelete)

router.route('/update/:id')
    .put(isSubTaskActive, handleSubTaskUpdate)

router.route('')
    .get(handleSubTaskGet)

router.route('/:id')
    .get(isTaskActive, handleSubTaskGetById)

module.exports = router