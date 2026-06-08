import { planModel, subscriptionModel } from "#models/db.js";
import { catchAsync } from "#utils/catchAsync.js";
import { AppError } from "#utils/errorHandler.js";
import { instance } from "#utils/razorpay.js";
import {} from 'express';
export const createASubscription = catchAsync(async (req, res, next) => {
    const tokenUserId = req.userId;
    if (!tokenUserId) {
        throw new AppError(401, 'Authentication is required');
    }
    const planId = req.params.planId;
    if (!planId) {
        throw new AppError(400, 'Plan Id is required');
    }
    const existingPlanDetails = await planModel.findById(planId);
    if (!existingPlanDetails) {
        throw new AppError(404, `Plan with ${planId} Id doesn't exist`);
    }
    const razorpayPlanId = existingPlanDetails.razorpay_plan_id;
    const subscription = await instance.subscriptions.create({
        plan_id: razorpayPlanId,
        total_count: 12,
        customer_notify: true,
        notes: {
            plan_price: existingPlanDetails.amount,
            plan_name: existingPlanDetails.name
        }
    });
    const plan_id = planId;
    await subscriptionModel.create({
        planId: plan_id,
        razorpay_plan_id: existingPlanDetails.razorpay_plan_id,
        razorpay_subscription_id: subscription.id,
        customer_id: tokenUserId,
        start_at: subscription.start_at,
        end_at: subscription.end_at,
        charge_at: subscription.charge_at,
        total_count: subscription.total_count
    });
    res.status(201).json({
        status: 'success',
        data: { subscription },
    });
});
//# sourceMappingURL=subscriptionService.js.map