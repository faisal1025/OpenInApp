const User = require("../models/users")
const {setToken} = require('../services/auth')
const bcrypt = require('bcrypt')

async function handlePostRegister(req, res){
    var {name, email, password, phone} = req.body
    password = await bcrypt.hash(password, 10)
    try {
        const result = await User.create({
            name,
            email,
            password,
            phone
        })
        const token = await setToken(result)
        res.cookie("token", token)
        let user = {...result._doc};
        delete user.password;
        delete user.updatedAt;
        res.status(201).json({
            status: true,
            meta: {
                access_token: token,
            },
            data: user,
        })
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
}

async function handlePostLogin(req, res){
    const {email, password} = req.body;

    const user = await User.findOne({
        email:email
    })

    if(!user){
        return res.status(400).json({
            msg: "User is not registered."
        })
    }

    bcrypt.compare(password, user.password, async (err, same) => {
        if(err){
            return res.status(500).json({
                msg: err.message
            })
        }
        if(same){
            const token = await setToken(user)
            res.cookie("token", token)
            let result = {...user._doc};

            delete result.password;
            delete result.updatedAt;

            return res.status(200).json({
                status: true,
                content: {
                    data: result,
                },
                meta: {
                    access_token: token
                }
            })
        }else{
            return res.status(400).json({
                msg: "Password is wrong"
            })
        }
    })
}


module.exports = {
    handlePostRegister,
    handlePostLogin,
}