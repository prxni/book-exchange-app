const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Tokens = require('../models/tokens')

router.post('/signup',encrypt,async(req,res)=>{
    // Validate required fields
    if(!req.body.name) return res.status(400).json({ message: "Name is required" });
    if(!req.body.email) return res.status(400).json({ message: "Email is required" });
    if(!req.body.phone) return res.status(400).json({ message: "Phone is required" });
    
    const user = new User({ 
        username: req.body.username, 
        password: req.body.password,
        name: req.body.name, 
        email: req.body.email, 
        phone: req.body.phone, 
        location: req.body.location || "",
        address: req.body.address || "",
        bio: req.body.bio || "",
        tags: req.body.tags || []
    })
    
    try {
        const result = await user.save();
        const accessToken = getAccessToken(result);
        const refreshToken = getRefreshToken(result);
        res.status(201).json({ accessToken, refreshToken });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ message: `${field} already exists` });
        }
        res.status(400).json({ message: error.message });
    }
})

router.post('/login',async(req,res)=>{
    const user = await User.findOne({ username: req.body.username }); 
    if (!user) {
        if(!user) return res.status(201).json({ errorCode: 104, message: "User not found" });
    }
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(!result) return res.status(201).json({ errorCode: 103, message: "Wrong password" });

        const accessToken=getAccessToken(user)
        const refreshToken=getRefreshToken(user)
        return res.status(201).json({accessToken,refreshToken});
    })
})

router.post('/refresh',async(req,res)=>{
    const token = req.body.token
    if(!token) return res.status(403).json({ message: "Token not found" });

    const result = await Tokens.deleteOne().where('token').equals(token);
    if(!result.deletedCount) return res.status(403).json({ message: "Authorization failed" });

    jwt.verify(token, process.env.REFRESH_KEY, (err,user) => {
        if(err) return res.status(403).json(err.message);

        const data = { _id: user.id,name: user.name, username: user.username, ...user }
        const accessToken = getAccessToken(data)
        const refreshToken = getRefreshToken(data)
        res.status(201).json({ accessToken, refreshToken })
    })
})

router.post('/logout',(req,res)=>{
    const token = req.body.token
    Tokens.deleteOne().where('token').equals(token)
    .then(result => res.status(201).json({ message: "Logged out succesfully" }))
    .catch(err => res.status(400).json(err))
})

async function encrypt (req,res,next)
{
    if(!req.body.username)  return res.status(400).json({ message: "Username is required" });
    if(!req.body.password) return res.status(400).json({ message: "Password is required" });

    const user = await User.findOne({ username: req.body.username }); 
    if (user) {
        return res.status(400).json({ message: "Username already taken" });
    }

    bcrypt.hash(req.body.password,10, (err, hash) => {
        if(err){
            return res.status(500).json({ message: "Server error. Please try again" })
        }
        req.body.password = hash
        next()
    })
}

function getAccessToken(user) {
    const data = { id: user._id, name: user.name, username: user.username }
    return jwt.sign(data, process.env.ACCESS_KEY, { expiresIn: '5m' })
}

function getRefreshToken(user)
{
    const data = { id: user._id, name: user.name, username: user.username }
    const token = jwt.sign(data, process.env.REFRESH_KEY, { expiresIn: '1h' })
    const newToken = new Tokens({ token })
    newToken.save()
    return token
}

module.exports = router;
