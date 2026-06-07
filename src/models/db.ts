import mongoose, {  } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role: {type:String, enum: ['user', 'admin'], default:'user'}

}, {timestamps:true})
export const userModel = mongoose.model('User', userSchema)
const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    refreshToken:{
        type:String,
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
    razorpay_plan_id:{
        type: String,
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
const subscriptinSchema = new mongoose.Schema({
    planId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Plan'
    },
    razorpay_plan_id:{
        type:String,
        required:true,
    },
    razorpay_subscription_id: {
        type: String,
        required:true, 
        unique:true
    },
    customer_id: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'

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
        enum: ['created', 'authenticated', 'active', 'pending', 'halted', 'cancelled', 'expired'],
        default: 'created'

    },
    // start_at is the date when the subscription officially begins
    // if you set the subscription start date to 1st july, the customer will not be charged before this date
    start_at: {
        type:Number,
        requird:true
    },
    // this indicates the start time of the current billing cyle of the subscription
    // it changes with every billing cycle
    // eg. if the subscription  is monthly and started on 1st of july, the current_start for the billing cycle would be 1st of july
    //and for the second billing cyle it would be 1 of August and so on
    current_start:{
        type:Number,
    },
    // current_at tell you when the current billing cycle ends
    // ended-at tell you when the subscription itself ended or or cancelled
    current_end:{
        type:Number,
        required:true
    },
    charge_at: {
        type:Number,
        required:true

    },
    expire_by:{
        type:Number,
        required:true
    },

    ended_at : {
        type:Number,

    },    
    paid_count :{
        type: Number,
        requird:true
    },
    end_at : {
        type:Number,
        required:true
    },
    // track authetication attempt
    auth_attempts:{
        count:{type:Number, default:0},
        last_attempt_at:Number,
        next_retry_at:Number
    },
    // payment failure tracking
    last_payments_status:{
        type:String,
        enum: ['success', 'failed', 'pending']
    },
    last_payment_error: String,
    short_url: String,    

    



    
}, {timestamps:true})
export const subscriptionModel = mongoose.model('Subscription', subscriptinSchema)
const paymentSchema = new mongoose.Schema({
    subscription_id: {
        type : mongoose.Schema.Types.ObjectId,
        ref:'Subscription',
        required:true

    },
    customer_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ['authorized', 'captured', 'refunded', 'failed']
    },
    // failure tracking
    failed_reason:String,
    failed_status: String,


    // refund  tracking
    refund_id:String,
    refunded_amount: Number,
    refunded_at: Number,
    // retry tracking
    retry_count :{
        type:Number,
        default:0
    },
    last_retry_at:Number




})
export const paymentModel = mongoose.model('Payment', paymentSchema)