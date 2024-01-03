const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8080
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const homeRouter = require('./routes/home')
const UserRouter = require('./routes/user')
const sequelize = require('./config/dbConnection')
const User = require('./model/userModel')


//bodyparser
app.use(express.urlencoded({ extended : false }))
app.use(express.json());

//cors
app.use(cors())


//routes
app.use('/', homeRouter)
app.use('/user', UserRouter)

//listening port
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}...`)
})
