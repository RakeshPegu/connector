import { catchAsync } from "#utils/catchAsync.js";
import { AppError } from "#utils/errorHandler.js";
import { config } from "#config/config.js";
import express from 'express';
import jwt from 'jsonwebtoken';
import {} from "express";
import { Types } from "mongoose";
import { string } from "zod";
export const verifyAccessToken = catchAsync(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const access_token = authHeader && authHeader.split(' ')[1];
    if (!access_token) {
        throw new AppError(401, 'Not authenticated');
    }
    const verified = jwt.verify(access_token, config.accessSecretKey);
    if (typeof verified === 'string' || !verified) {
        throw new AppError(403, 'Not authorized');
    }
    const payload = verified;
    req.userId = payload?._id;
    req.userRole = payload?.role;
    next();
});
//# sourceMappingURL=verifyAccessToken.js.map