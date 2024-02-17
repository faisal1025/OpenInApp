const jwt = require('jsonwebtoken')

const secret = "Iamnotbheriya@123"


const setToken = async (user) => {
    const payload = {
       id: user._id,
       email: user.email
    }
    return jwt.sign(payload, secret)
}

const getToken = async (token) => {
    return jwt.verify(token, secret)
}

module.exports = {
    setToken,
    getToken
}