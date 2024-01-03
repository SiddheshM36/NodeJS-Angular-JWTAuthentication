const express = require('express')
const router = express.Router()
const User = require('../model/userModel')
const sequelize = require('../config/dbConnection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET_KEY
const verifyToken = require('../config/jwt')

//insert in table
router.post('/' , async (req, res)=>{
    console.log('link activated')
    const user = { name : req.body.name, email : req.body.email, password :req.body.password }
    
    //bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user.password, salt)
    console.log(hashPassword)
    user.password = hashPassword

    //if email already exixts
    const presentUser = await User.findOne({ where : { email: user.email } })
    if(presentUser){
        console.log('user already present') 
        res.status(400).json('User with this email already exists')
    } 
    else{
        User.create({ name :  user.name, email : user.email, password : user.password }).then(user=>{
            console.log('Data inserted')
            res.json( 'I am sending the data' )
        }).catch(err=>{
            console.log(err)
        })    
    }

    
})

//jwt part 1
const createToken = (id, email)=>{
    return jwt.sign({ id, email }, secretKey)
}


router.post('/login', async (req, res)=>{
    console.log('login roue is called')
    const user = { email : req.body.email, password : req.body.password }
    console.log(user)
    const findUser = await User.findOne({ where : { email : user.email } })
    if(findUser){
        console.log('user found in db', findUser.password)
        const passwordMatch = await bcrypt.compare(user.password, findUser.password)
        if(passwordMatch){
            console.log('login success')
            //jwt part 2
            const token = await createToken(findUser.id, findUser.email)
            res.json({status : '200', data : { token, passwordMatch, findUser }})
            // res.json(token)


            // console.log(token)
            // res.send(token)
        } 
        else{
            console.log('invalid email or pass')
        }
    } 
    else{
        console.log('user not found')
    }

})



router.get('/dashboard', verifyToken, async (req, res)=>{
    console.log('dashboard url call')
})


module.exports = router