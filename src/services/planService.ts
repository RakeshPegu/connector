import { planModel } from "#models/db.js";
import { catchAsync } from "#utils/catchAsync.js";
import { AppError } from "#utils/errorHandler.js";
import { instance } from "#utils/razorpay.js";
import { type Request, type Response, type NextFunction } from "express";
import {z} from 'zod'
const planSchema = z.object({
    period: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
    interval: z.number().min(1, 'Interval should be atleast 1'),
    name: z.string().min(6, 'Name must be atleast 6 characters'),
    amount:z.number(),
    currency:z.string(),
    description: z.string().min(10, 'Description must be atleast 10 characters')
})

export const createPlan = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const {period, interval, name, amount, currency, description}  = planSchema.parse(req.body)
    const response = await instance.plans.create({
        period: period,
        interval:interval,
        item: {
            name:name,
            amount:Number(`${amount}00`),
            currency: currency,
            description:description
        }
    })

    const planDetails = await planModel.create({
       name:name,
       interval:interval,
       amount:amount, 
       currency:currency,
       description:description
    })
    res.status(201).json({message:"New plan is created", planDetails, status:true })
})
export const getPlans = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const plans = await planModel.find()
    res.status(200).json(plans)


})
export const getAPlanDetails = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const planId = req.params.planId
    if(!planId){
        throw new AppError(400, 'Plan Id is required')
    }
    const planDetails = await planModel.findById(planId)
    if(!planDetails){
        throw new AppError(404, 'Plan not found')
    }
    res.status(200).json(planDetails)
})
export const deleteAPlan = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const planId = req.params.userId
    const userRole = req.userRole
    if(!planId){
        throw new AppError(400, 'Plan Id is required ')
    }
    if(userRole !== 'admin'){
        res.status(403).json({message:"Only admin is required"})
    }
    const existingPlan = await planModel.findById(planId)
    if(!existingPlan){
        throw new AppError(404, `plan with ${planId} Id not found`)
    }
    await planModel.findByIdAndDelete(planId)
    res.status(200).json({message:"Plan deleted successfully", success:true})

})
