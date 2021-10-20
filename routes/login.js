const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const {User} = require("../models/users")
const jwt = require("jsonwebtoken")

router.post("/",async(req,res)=>{
        const {email,pass} = req.body
        const user = await User.findOne({email})
        if(!user) return res.status(400).send("enter valid user and password")
        if(! await bcrypt.compare(pass,user.password)) return res.status(400).send("enter valid user and password")
        const token = await jwt.sign({email:user.email,name:user.name},"123456")
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.send({token})
    
})

module.exports=router