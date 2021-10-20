const {User} = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const authenticate=async(req,res,next)=>{
    const {token} = req.headers
    try {
        var decoded = jwt.verify(token, '123456');
    } catch(err) {
      return  res.status(401).send("unautherized user")
    }
    next()
}

module.exports= {authenticate}