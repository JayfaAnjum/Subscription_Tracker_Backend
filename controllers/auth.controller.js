import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import AppError from "../utils/AppError.js";

export const signup =async(req,res,next)=>{
    const session = await mongoose .startSession()
    session.startTransaction();

    try{
        const {name,email,password} = req.body
        const existingUser = await User.findOne({email})

        if(!name || !email || !password){
            throw new AppError("All fields are required",400,"MISSING_FIELDS")
        }

        else if(password.length<8){
            throw new AppError("Password must be at least 8 characters",400,"WEAK_PASSWORD")
        }

        else if(existingUser){
              throw new AppError("An account with this email already exists",409,"EMAIL_ALREADY_EXISTS")
        }
        else{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = await User.create([{name,email,password:hashedPassword}],{session})
        const token = jwt . sign({userId:newUser[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
        await session.commitTransaction();
        session.endSession()

        res.status(201).json({
            success:true,
            message:"User created successfully",
            data:{
                token,
                user:newUser
            }
        })
    }
    }catch(error){
      await session.abortTransaction()
      session.endSession();
      next(error)
    }


}
export const signin =async(req,res,next)=>{
    try{
   
        const {email ,password} =  req.body
        const user  = await User.findOne({email})
        if(!email || !password){
            throw new AppError("Email and Password are required",400,"MISSING_FIELDS")
        }

        if(!user){
        throw new AppError("Invalid email or password",401,"INVALID_CREDENTIALS")
        }

        const isPasswordValid = await bcrypt.compare(password , user.password)

        if(!isPasswordValid){
            throw new AppError("Invalid email or password",401,"INVALID_CREDENTIALS")
        }
         const token = jwt . sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
        res.status(200).json({success:true,
            message:"User signed in successfully",
            data:{
                token,
                user
            }
        })
    }catch(error){
        next(error)
    }

}
