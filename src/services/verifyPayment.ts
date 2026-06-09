import { config } from "#config/config.js";
import { subscriptionModel } from "#models/db.js";
import { catchAsync } from "#utils/catchAsync.js";
import { AppError } from "#utils/errorHandler.js";
import { type Request, type Response, type NextFunction } from "express";
import crypto from 'node:crypto'

export const verifyPayment = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const tokenUserId = req.userId
  
    const {razorpay_payment_id,  razorpay_signature } = req.body
    const  subscription = await subscriptionModel.findOne({customer_id:tokenUserId})
    if(!subscription){
        throw new AppError(404, 'Subscription not found')
    }
    const body = razorpay_payment_id + "|" + subscription?.id
    const generateSignature = crypto.createHmac('sh256', config.razorPayKeySecret)
                                    .update(body) 
                                    .digest('hex')      
    const isValidSignature = generateSignature === razorpay_signature
    if(!isValidSignature){
        throw new AppError(403, 'Invalid signature')
                
    }   
    subscription.razorpay_payment_id = razorpay_payment_id
    subscription.status = 'active'    
    res.status(200).json({message:"Verified payment successfully", successs:true})                         

    
     
    
})