import mongoose from 'mongoose'


import dotenv from 'dotenv'
dotenv.config()
const db= async()=>{
    try {
    await mongoose.connect(process.env.MONGO_URI) 
    console.log("Database connected Successfully")
    } catch (error) {
        console.log("error occured",error)
    }
}

export default db