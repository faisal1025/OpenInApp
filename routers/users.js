const express = require('express')
const { handlePostRegister, handlePostLogin } = require('../controllers/users')
const {restrictLoggedIn} = require('../middlewares/auth')
const router = express.Router()

router.route('/signup').post(handlePostRegister)
router.route('/signin').post(handlePostLogin)
router.get('/signout', restrictLoggedIn, (req, res) => {
    res.clearCookie("token")
    req.user = undefined
    return res.status(200).json({
        status: true,
        msg: "user sucessfully logged out"
    })
})

module.exports = router