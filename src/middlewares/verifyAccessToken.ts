import { catchAsync } from "#utils/catchAsync.js"
import { AppError } from "#utils/errorHandler.js"
import { config } from "#config/config.js"
import express from 'express'
import jwt from 'jsonwebtoken'
import {Types} from 'mongoose'
import { type Request } from "express"
type inRequest = Request&{
    userId: Types.ObjectId,
    userRole:string
}
export const verifyAccessToken=catchAsync(async(req:inRequest, res:express.Response,next:express.NextFunction)=>{
    const authHeader = req.headers['authorization']
    const access_token = authHeader && authHeader.split(' ')[1]
    if(!access_token){
        throw new AppError(401, 'Not authenticated')
    }
    const isVerified = jwt.verify(access_token,  config.accessSecretKey)
    if(!isVerified){
        throw new AppError(403, 'Not authorized')
    }
    // req.userId = isVerified._id,
    // req.userRole = isVerified.role
    next()

})