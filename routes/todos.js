const express = require("express")
const router = express.Router()
const {ToDo,validate} = require("../models/todos")
const {authenticate} = require("../middelwares/authentication")

router.get("/",async(req,res)=>{
    const allTodos =await ToDo.find()
    res.send(allTodos)
})
router.use(authenticate)
router.get("/:id",async(req,res)=>{
    const {id} = req.params
    const todo = await ToDo.findOne({_id:id})
    if(!todo) return res.status(400).send("this id doesn't exist")
    res.send(todo)
})
router.post("/",async(req,res)=>{
    const {id,name,mession} = req.body
    const {error} =await validate({id,name,mession})
    if (error) return res.status(400).send(error.details[0].message)
    const todo = new ToDo({id,name,mession})
    const result = await todo.save()
    res.send(result)
})

router.put("/:id",async (req,res)=>{
    const {id} = req.params
    const todo = await ToDo.findOne({_id:id})
    if(!todo) return res.status(400).send("this id doesn't exist")
    const {name,mession} = req.body
    const {error} =await validate({name,mession})
    if(error) return res.status(400).send(error.details[0].message)

    res.send(await (todo.set({name,mession})).save());
   
})

router.delete("/:id",async (req,res)=>{
    const {id} = req.params
    const todo = await ToDo.findOne({_id:id})
    if(!todo) return res.status(400).send("this id doesn't exist")
    await ToDo.deleteOne({_id:id})
    res.send(todo);
})


module.exports = router
