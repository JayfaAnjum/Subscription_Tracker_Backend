import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const signup =async(req,res,next)=>{
    const session = await mongoose .startSession()
    // Starts a transaction session
    session.startTransaction();

    try{
        const {name,email,password} = req.body
        const existingUser = await User.findOne({email})

        if(existingUser){
            const error = new Error("User already exists");
            error.statusCode=409
            throw error         
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        //without session it deosnt effected by transaction
        const newUser = await User.create([{name,email,password:hashedPassword}],{session})
        const token = jwt . sign({userId:newUser[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
        // Saves all changes permanently
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
    }catch(error){
        // Cancels all changes (rollback)
      await session.abortTransaction()
    //   Closes session and frees resources
      session.endSession();
      next(error)
    }


}
export const signin = async(req,res,next)=>{
    try{
        const {email ,password} =  req.body
        const user  = await User.findOne({email})

        if(!user){
        const error = new Error("User not found")
        error.statusCode=404
        throw error;
        }

        const isPasswordValid = await bcrypt.compare(password , user.password)

        if(!isPasswordValid){
            const error = new Error("Invalid Password")
            error.statusCode = 401
            throw error
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
export const signout = async(req,res,next)=>{
   try{

   }catch(error){
    next(error.message)
   }
}
g