const {validate,User} = require("../models/users")
const express = require("express")
const bcrypt = require ("bcrypt")
const {authenticate} = require("../middelwares/authentication")
const { application } = require("express")
const router = express.Router()



router.post("/",async(req,res)=>{
    const {name,password,email} = req.body
    const {error} =await validate({name,password,email})
    if(error) return res.status(400).send(error.details[0].message)
    const salt = await bcrypt.genSalt(10)
    const hashedPass=await bcrypt.hash(password,salt)
    const user = await new User({name,password:hashedPass,email})
    await user.save()
    res.send({name,email})
})

router.use(authenticate)

router.get("/",async(req,res)=>{
    const allUsers = await User.find()
    res.send(allUsers)
})

router.get("/:_id",async(req,res)=>{
    const {_id} = req.params
    const user = await User.findOne({_id})
    res.send(user)
})










module.exports = router