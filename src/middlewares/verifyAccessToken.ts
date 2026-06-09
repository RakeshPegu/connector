import { catchAsync } from "#utils/catchAsync.js"
import { AppError } from "#utils/errorHandler.js"
import { config } from "#config/config.js"
import express from 'express'
import jwt from 'jsonwebtoken'
import { type Request } from "express"
import { Types } from "mongoose"
import { Session } from "#models/db.js"
interface Payload{
    _id:Types.ObjectId,
    role:string
}
export const verifyAccessToken=catchAsync(async(req:Request, res:express.Response,next:express.NextFunction)=>{
    const authHeader = req.headers['authorization']
    const access_token = authHeader && authHeader.split(' ')[1]
    if(!access_token){
        throw new AppError(401, 'Not authenticated')
    }
    const  verified = jwt.verify(access_token,  config.accessSecretKey)
    if(typeof verified === 'string' ||!verified){
        throw new AppError(403, 'Not authorized')
    }
    
    const payload :Payload = verified as Payload
    const session = await Session.findOne({userId:payload._id })
    if(!session){
        throw new AppError(401, 'Session invalidated')
    }
    req.userId = payload?._id
    req.userRole = payload?.role
    next()

})