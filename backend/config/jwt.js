const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET_KEY


const verifyToken = async (req, res, next)=>{
    console.log('i am called')
    const token = await req.headers['authorization'].substr(7)
    console.log(token)

    if(token){
        const validateToken = await jwt.verify(token, secretKey)
        if(validateToken){
            req.decodedToken = validateToken
            console.log(req.decodedToken)
            const {  email } = req.decodedToken;
            res.json({ email })
            next()
        }
        else{
            console.log('token not matched')
        }
        
    }
    else{
        res.json("Token is required")
        console.log('something went wrong')
    }
    
}


module.exports = verifyToken