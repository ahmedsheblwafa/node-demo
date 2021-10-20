const express = require("express")
const mongoose =require ("mongoose")
const config = require("config");
const helmet = require("helmet");
const compress = require("compress");
const todoRouter=require("./routes/todos")
const userRouter=require("./routes/usersRoute")
const loginRouter=require("./routes/login")
const {authenticate} = require("./middelwares/authentication")

// connect to database
mongoose.connect(config.get("todos_connectionString"))
.then(()=>console.log("connected"))
.catch(err=>console.log(err))

const app = express()
console.log(config.get("mail.server"));
app.use(express.json())
app.use(helmet())
// app.use(compress())
// app.use(authenticate)

app.use("/api/todos",todoRouter)
app.use("/api/users",userRouter)
app.use("/api/login",loginRouter)

app.get("/",(req,res)=>{
    res.send("<h1>first page</h1>")
})



app.listen(process.env.PORT,()=>{console.log(`listening on port ${process.env.PORT}`)})