const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required:true,
    },
    balance:{
        type:Number,
        required:true
    }
})
module.exports = mongoose.model('User', userSchema);