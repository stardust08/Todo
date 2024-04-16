const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter your firstname']
    },
    lastname: {
        type: String,
        required: [true, 'Please enter your firstname']
    },
   
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password']
    }
})

module.exports = mongoose.model('User', userSchema)
