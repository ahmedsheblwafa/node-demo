const mongoose = require("mongoose")
const joi = require("joi")
const { string } = require("joi")
const User = mongoose.model("user" , new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    }
}))

const schema = joi.object({
    name:joi.string().min(5).max(100).required(),
    email:joi.string().min(5).max(100).required().email(),
    password:joi.string().min(5).max(255).required()
})

const validate = (inputs)=>{
    return schema.validate(inputs)
}


module.exports = {validate,User}