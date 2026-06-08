import { config } from "#config/config.js";
import { catchAsync } from "#utils/catchAsync.js";
import {} from "express";
import Razorpay from 'razorpay';
export const webHook = catchAsync(async (req, res, _next) => {
    const secret = config.razorPayKeySecret;
    const signature = req.headers['x-razorpay-signature'] || '';
    const body = req.body && Object.keys(req.body).length ? JSON.stringify(req.body) : '';
    const isValid = Razorpay.validateWebhookSignature(body, signature, secret);
    if (!isValid) {
        res.status(400).send({ message: 'Invalid signature' });
        return;
    }
    res.status(200).send({ message: 'ok' });
});
//# sourceMappingURL=webhookService.js.map