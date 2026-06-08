import { config } from "#config/config.js";
import { catchAsync } from "#utils/catchAsync.js";
import { type Request, type Response, type NextFunction } from "express";
import Razorpay from 'razorpay'

export const webHook = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
	const secret = config.razorPayKeySecret
	const signature = (req.headers['x-razorpay-signature'] as string) || ''
	const body = req.body && Object.keys(req.body).length ? JSON.stringify(req.body) : ''

	const isValid = Razorpay.validateWebhookSignature(body, signature, secret)

	if (!isValid) {
		res.status(400).send({ message: 'Invalid signature' })
		return
	}

	res.status(200).send({ message: 'ok' })
})