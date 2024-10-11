const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
mongoose.connect(process.env.databaseLink)
app.use(express.json())
app.get('/',(req,res)=>{
    res.json({'msg':'Hello World'})
})

const signup = require('./Routers/signup.routes.js')
app.use('/auth/signup',signup)


const login = require('./Routers/login.routes.js')
app.use('/auth/login',login)

app.listen(PORT,()=>{
    console.log(`example app running on ${PORT}`);
    
} )