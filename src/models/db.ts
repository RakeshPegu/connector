import mongoose from "mongoose";
import { timeStamp } from "node:console";
import { type } from "node:os";
import { start } from "node:repl";
import { number, string } from "zod";
import { required } from "zod/mini";
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
const planSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    period:{
        type: String,
        enum: ['daily', 'weekly','monthly', 'quarterly', 'yearly'],
        required:true

    },
    interval:{
        type: Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true,
        default:'INR'
    },
    description:{
        type:String,
        
    }


}, {timestamps:true})
export const planModel = mongoose.model('Plan', planSchema)
export const subscriptionModel = new mongoose.Schema({
    planId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    razorpay_plan_id: {
        type: String,
        required:true
    },
    customer_id: {
        type:mongoose.Schema.Types.ObjectId,
        required:true

    },
    quantity: {
        type:Number,
        default:1

    },
    total_count:{
        type: Number,
        required:true
    },
    status:{
        type:String,
        enum: ['created', 'authenticated', 'active', 'pending', 'halted', 'cancelled', 'expired']
    },
    // start_at is the date when the subscription officially begins
    // if you set the subscription start date to 1st july, the customer will not be charged before this date
    started_at: {
        type:Date,
        requird:true
    },
    // this indicates the start time of the current billing cyle of the subscription
    // it changes with every billing cycle
    // eg. if the subscription  is monthly and started on 1st of july, the current_start for the billing cycle would be 1st of july
    //and for the second billing cyle it would be 1 of August and so on
    current_at:{
        type:Date,
        required:true
    },
    // current_at tell you when the current billing cycle ends
    // ended-at tell you when the subscription itself ended or or cancelled
    current_end:{
        type:Date,
        required:true
    },
    ended_at : {
        type:Date,

    },    
    paid_count :{
        type: Number,
        requird:true
    }

    



    
}, {timestamps:true})