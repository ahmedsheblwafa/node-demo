const mongoose =require("mongoose")
const joi = require("joi")



const ToDo = mongoose.model("Todo", new mongoose.Schema({
    id:Number,
    name:String,
    mession:String
}))


const valid = joi.object({
    id:joi.number().min(5).max(5000).required(),
    name:joi.string().required(),
    mession:joi.string().min(5).max(50).required()
})

const validate = async(inputs)=>{
    return valid.validate(inputs);
}



module.exports = {ToDo,validate}
