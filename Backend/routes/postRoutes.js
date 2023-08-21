const express =require("express")
const {PostModel}=require("../model/postModel")
const {auth}=require("../middlewares/auth.middleware")


const postRouter=express.Router();


postRouter.post("/add",auth,async(req,res)=>{
    try{
        const post=new PostModel(req.body);
        console.log(post)
        await post.save();
        res.status(200).send({"msg":"new post has been added"});

    }catch(err){
        res.status(400).send({err:err})
    }
})


postRouter.get("/",auth,async(req,res)=>{
    try{
        const data=await PostModel.find({userID:req.body.userID})
        console.log(data)
        res.status(200).send({"postData":data})

    }catch(err){
        res.status(400).send({"err":err})
    }
})




postRouter.get("/top",async(req,res)=>{
    try{

    }catch(err){
        res.status(400).send({"err":err})
    }
})


postRouter.patch("/update/:postID",auth,async(req,res)=>{
    const {postID}=req.params;
    console.log(postID)
    const post=await PostModel.findOne({_id:postID})
    console.log("post",post)
    try{
        if(req.body.userID!=post.userID){
            res.status(400).send({"msg":"user is not authorized"})
        }else{
            await PostModel.findByIdAndUpdate({_id:postID},req.body)
            res.send({"msg":`post of id ${postID} is update suceessfully`})
        }
        
    }catch(err){
        res.status(400).send({"err":err})
    }
})


postRouter.delete("/delete/:postID",auth,async(req,res)=>{
    const {postID}=req.params;
    console.log(postID)
    const post=await PostModel.findOne({_id:postID})
    try{
        if(req.body.userID!=post.userID){
            res.status(400).send({"msg":"user is not authorized"})
        }else{
            await PostModel.findByIdAndDelete({_id:postID})
            res.send({"msg":`post of id ${postID} is delete suceessfully`})
        }
    }catch(err){
        res.status(400).send({"err":err})
    }
})

module.exports={postRouter}