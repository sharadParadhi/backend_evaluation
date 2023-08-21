const mongoose=require("mongoose")



const connection=mongoose.connect("mongodb+srv://sharadparadhi:"+encodeURIComponent("@2124Paradhi")+"@cluster0.yx1ofwp.mongodb.net/Practice?retryWrites=true&w=majority")


module.exports={connection}