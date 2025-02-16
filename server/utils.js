const jwt=require('jsonwebtoken')
const dotenv = require('dotenv')
const cloudinary = require('cloudinary').v2;
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

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

module.exports={authenticate, cloudinary}