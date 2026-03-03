import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {

        // Check required fields
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });
        if(newUser){
            generateToken(newUser._id,res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });
        //todo:send a welcome email to user
        }else{
            res.status(400).jsom({message:"Invalid user data"})
        }

    } catch (error) {
        console.log("Error in Signup controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login=async(req,res)=>{
    const {email,password}=req.body

    try{
        const user=await User.findOne({email}) //check if already exists are not
        if(!user)   return res.status(400).json({message:"Inavlid credentials"})
        //never tell the client which one is incorrect:password or email

        //password
        const isPasswordCorrect=await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect)  return res.status(400).json({message:"Invalid credentials"});

        generateToken(user._id,res)

         res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });

    }catch(error){
        console.error("Error in login controller:",error);
        res.status(500).json({message:"Internal server error"});

    }
};

export const logout=(_,res)=>{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({messaage:"Logged out successfully"})
}

