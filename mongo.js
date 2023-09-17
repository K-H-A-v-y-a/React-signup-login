const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://mongo:upthP3mZDkoNSaeX@cluster0.7zmytnl.mongodb.net/?retryWrites=true&w=majority/test")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema)

module.exports=collection