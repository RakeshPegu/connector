import { userModel } from "#models/db.js";
import { catchAsync } from "#utils/catchAsync.js";
import { AppError } from "#utils/errorHandler.js";
import { generateTokens } from "#utils/generateToken.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {Types} from "mongoose";
interface UserInfo {
    username: string,
    email:string,
    password:string

}
interface Payload {
    _id:Types.ObjectId,
    role:string 
}
export const register = catchAsync(async(req, res)=>{
    const {username, email, password} = req.body
    if(!username || !email || !password){
        throw new  AppError(400, 'All the fields are mandatory')
    } 
    const existingUser = await userModel.findOne({email:email})
    if(existingUser){
        throw new AppError(403, 'Account already exist' )
    }
    const hashPass = await bcrypt.hash(password, 10)
    new userModel({username, email, password:hashPass}).save()
    res.status(200).json({message:"Account created successfully"})
    


})
export const login = catchAsync(async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        throw new AppError(400, 'All the fields are mandatory')
    }
    const existingUser = await userModel.findOne({email:email})
    if(!existingUser){
        throw new AppError(404, 'Account not found')
    }
    const isValidPass = await bcrypt.compare(password, existingUser?.password)
    if(!isValidPass){
        throw new AppError(403, 'Wrong password')
    }
    const payload:Payload = {
        _id:existingUser._id,
        role:existingUser.role
    }
    const {access_token, refresh_token} = await generateTokens(payload)
    
})