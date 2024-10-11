const express = require('express');
const router = express.Router();
const User = require('../Models/user.models.js'); 
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const { name, email, password, mobileNumber,role} = req.body;

  if (!name || !email || !password || !mobileNumber || !role ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    let existingUser = await User.findOne( {$or: [{ email }, { mobileNumber }]} );
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,  
      mobileNumber,
      role
    });
   
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;