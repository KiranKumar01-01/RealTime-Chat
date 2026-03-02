//allows us to connect to our databse

import mongoose, { mongo } from "mongoose"

export const connectDB = async ()=>{
    try{
        const { MONGO_URI }=process.env;
        if(!MONGO_URI)  throw new Error("Mongo_URI s not set")
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECTED:",conn.connection.host)

    }
    catch(error){
        console.log("Error connection to MongoDB:",error)
        process.exit(1); // 1 status code means fail,0 means success
    }
}