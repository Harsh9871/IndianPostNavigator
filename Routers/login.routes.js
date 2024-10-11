const express = require('express');
const router = express.Router();
const User = require('../Models/user.models.js'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
router.post('/',async(req,res)=>{
    const {email,password,role} = req.body;
    const user = User.findOne({email:email})
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    console.log(hashedPassword,"\n",token);
    res.json({hashedPassword,token})
})

module.exports = router;