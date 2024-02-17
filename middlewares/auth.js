const { getToken } = require("../services/auth")

async function restrictLoggedIn(req, res, next){
    const token = req.cookies?.token
   
    if(!token) return res.status(401).json({
        status: false,
        msg: "unauthorized"
    })
    const user = await getToken(token)

    if(!user) return res.status(401).json({
        status: false,
        msg: 'token is invalid'
    })
    req.user = user
   
    next()
}

async function isLoggedIn(req, res, next){
    const token = req.cookies?.token
    req.token = token
    next()
}

module.exports = {
    restrictLoggedIn,
    isLoggedIn
}
