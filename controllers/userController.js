//Signup a new user

import User from "../models/user_model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
export const signup = async () => {
    const {fullName , email ,password , bio} = req.body;
    try {
        if (!fullName || !email || !password || !bio){
            return res.json({success : false , message : "Missing Details"})
        }
        const user = await User.findOne({email});
        if(user){
            return res.json({success : false , message : "Account Already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            fullName , email , password : hashedPassword , nio
        });
        const token = generateToken(newUser._id);
        res.json({success: true, userData : newUser , token , message: "Account Created Successfully"
        })
    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message})
    }
}

// Controller for login

export const login = async (req , res) =>{
    try {
        const {email , password} = req.body;
        const userData = await User.findOne({email})
        const isPasswordCorrect = await bcrypt.compare(password , userData.password);
        if(!isPasswordCorrect){
            return res.json({success: false , message: "Invalid credentials"});
        }
        const token = generateToken(newUser._id);
        res.json({success: true, userData : newUser , token , message: "User Login Successfully"})
        

    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message})
    }
};

export const logout = async (req , res) => {
    
}

//Controller to update user file details
export const updateProfile = async (req ,res) => {
    try {
        const {profilePic , bio , fullName} = req.body;
        const userId = req.user._id;
        let updatedUser;
        if(!profilePic){
            await User.findByIdAndUpdate(userId , {bio , fullName} ,{new : true});
        } else{
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId , {profilePic : upload.secure_url , bio , fullName }, {new : true});
        }
        res.json({success: true, user : updatedUser});
    } catch (error) {
        res.json({success: false , message: error.message })
    }
}

