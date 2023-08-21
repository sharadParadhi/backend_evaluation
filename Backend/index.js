const express=require("express")
const {connection}=require("./config/db")
const {userRouter}=require("./routes/userRouter")
const {postRouter}=require("./routes/postRoutes")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors())


app.use("/user",userRouter)
app.use("/post",postRouter)



app.listen(8083,async(req,res)=>{
    try{
        await connection;
        console.log("db connected")
        console.log("sever is runing at port 8083")

    }catch(err){
        console.log(err)
    }
})




