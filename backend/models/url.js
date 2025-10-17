import mongoose from 'mongoose'

const urlSchema=new mongoose.Schema({

shortID:{
    type:String,
    unique:true,
    required:true
},
shortUrl:{
    type:String,
    unique:true,
    required:true
},
longUrl:{
    type:String,
    required:true

},
clicks:{
    type:Number,
    default:0
}



},{timestamps:true})



export default mongoose.model("Url",urlSchema)