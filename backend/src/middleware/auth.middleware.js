import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";


export const protectRoute=async(req,res,next)=>{
try{
    const token=req.cookies.jwt
    if(!token)  return res.status(401).json({message:"Unauthorized -No token provided"})  //existed or not

    const decoded=jwt.verify(token,ENV.JWT_SECRET)
    if(!decoded)    return res.status(401).json({message:"unauthorized-Invalid token"})  //valid or not

    const user=await User.findById(decoded.userId).select("-password")
    if(!user)   return res.status(404).json({messaage:"User not found"});  //user is in databse or not

    req.user=user
    next()
    }
    catch(error){
        console.log("Error in protectRoute middlewaare:",error);
        res.status(500).json({message:"Internl server error"});

    }

}