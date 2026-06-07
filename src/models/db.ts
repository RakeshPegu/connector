import { refreshToken } from "#services/authService.js";
import mongoose from "mongoose";
import { number, string } from "zod";
const userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role: {type:String, enum: ['user', 'admin'], default:'user'}

}, {timestamps:true})
export const userModel = mongoose.model('User', userSchema)
const sessionSchema = new mongoose.Schema({
    userId: {
        type: string,
        required:true
    },
    refreshToken:{
        type:string,
        required:true
    },
    expiresAt:{
        type: Date,
        required:true
    }

}, {timestamps:true})
export const Session = mongoose.model('Session', sessionSchema)