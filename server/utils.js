const jwt=require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


function authenticate(req,res,next)
{
    const token = req.headers.authorization?.split(' ')[1]
    if(!token)  return res.status(400).json({message:"Token not found"});

    jwt.verify(token,process.env.ACCESS_KEY,(err,user)=>{
        if(err) return res.status(400).json({message:err.message});

        res.user=user
        next()
    })
}

module.exports={authenticate}