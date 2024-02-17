const express = require('express')
const taskRoutes = require('./routers/task')
const userRoutes = require('./routers/users')
const subTaskRoutes = require('./routers/subTask')
const connectMongoDb = require('./connection')
const expressLayout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const path = require('path')
const { restrictLoggedIn } = require('./middlewares/auth')

const app = express()
const port = 8000

connectMongoDb("mongodb://127.0.0.1:27017/openInApp").then(()=>{
    console.log('Mongodb Connected');
})
app.use(expressLayout)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.get('/', async (req, res)=>{
    res.send("This is the home page")
})

app.use('/v1/task', restrictLoggedIn, taskRoutes)
app.use('/v1/user', userRoutes)
app.use('/v1/sub-task', restrictLoggedIn, subTaskRoutes)


app.listen(port, ()=>console.log(`Server is running on port ${port}`))