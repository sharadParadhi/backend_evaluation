const express=require("express")
const {UserModel}=require("../model/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const {BlackListModel}=require("../model/blackList")

const userRouter=express.Router()


userRouter.post("/register",async(req,res)=>{
   try{

    const {name,email,gender,password,age,city,is_married}=req.body

        const existUser=await UserModel.findOne({email})

        if(existUser){
            res.status(200).send("user already present Please login!")
        }else{

            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.send({"err":err})
                }else{
                    const user=new UserModel({name,email,gender,age,city,is_married,password:hash})
                    await user.save();
                    console.log(user)
                    res.status(200).send({"msg":"new user has been added"})
                }
            }) 


        }
            
   }catch(err){
    res.status(400).send({"error":err})
   }
})



// user list
userRouter.get("/",async(req,res)=>{
    try{
        const data=await UserModel.find();
        res.status(200).send({"data":data})

    }catch(err){
        res.send({"err":err})
    }
})

//user delete

userRouter.delete("/delete/:noteID",async(req,res)=>{
    const {noteID}=req.params;
    try{
        const data=await UserModel.Delete({_id:noteID});
        res.status(200).send({"data":`use of if ${noteID} deleted`})

    }catch(err){
        res.send({"err":err})
    }
})



// login
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await UserModel.findOne({email})
        console.log("user",user)
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user._id,user:user.name},"masai")
                    res.status(200).send({"msg":"User Logged In!",token})
                }else{
                    res.status(400).send({"err":err})
                }
            })
        }else{
            res.status(200).send({"msg":"User does not exist, Please register!"})
        }

    }catch(err){
        res.status(400).send({"error":err})
    }
})

userRouter.get("/logout",async(req,res)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1] || null;
        token && (
            await BlackListModel.UpdateMany({},{$push:{blacklist:[token]}})
        )
        res.status(200).send({"msg":"logout successfully"})

    }catch(err){
        res.status(400).send({"err":err})
    }
})


module.exports={userRouter}

