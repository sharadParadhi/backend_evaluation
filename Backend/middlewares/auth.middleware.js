const jwt=require("jsonwebtoken")
const {BlackListModel}=require("../model/blackList")


const auth=async(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1] || null
        if(token){
            // let existToken=await BlackListModel.find({
            //     blacklist:{$in:token}
            // })
            // if(existToken.length){
            //     res.status(400).send({"errr":"Please login aggain"})
            // }

            let decoded=jwt.verify(token,"masai")
            if(decoded){
                req.body.userID=decoded.userID
                req.body.user=decoded.user
               next()
            }else{
                res.status(400).send({"errr":"Please login aggain"})
            }
           
           
        }else{
           res.status(400).send({"msg":"Accceds denied Please login first"})
        }

    }catch(err){
        res.status(200).send({"err":err})
    }
}


module.exports={auth}