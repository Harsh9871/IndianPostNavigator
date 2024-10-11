const mongoose = require('mongoose')
const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    mobileNumber: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid mobile number'] 
    },
    role:{
        type:String,
        require:true,
        enum:['personal','professional']
    }

},{timestamps:true})

const User = mongoose.model('User',userShema)
module.exports = User
