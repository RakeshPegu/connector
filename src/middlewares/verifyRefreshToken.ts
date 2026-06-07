import { config } from "#config/config.js";
import  { catchAsync } from "#utils/catchAsync.js";
import { AppError } from "#utils/errorHandler.js";
import type { Request, Response,  NextFunction } from "express";
import jwt from 'jsonwebtoken'
import {Types} from 'mongoose'
interface Payload{
    _id:Types.ObjectId,
    role:string
}
export const verifyRefreshToken = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const refreshToken = req.cookies.refresh_token
    if(!refreshToken){
        throw new AppError(401, 'Authentication required')
    }
    const isVerified = await jwt.verify(refreshToken, config.refreshSecretKey)
    if(!isVerified){
        throw new AppError(403, 'Invalid token')
    }
    const payload:Payload = isVerified as Payload
    req.userId = payload._id
    req.userRole = payload.role
    next()

    


})
