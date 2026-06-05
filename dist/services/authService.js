import {} from 'express';
import { userModel } from '#models/db.js';
import { catchAsync } from '#utils/catchAsync.js';
import { AppError } from '#utils/errorHandler.js';
import { generateTokens } from '#utils/generateToken.js';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { z } from 'zod';
export const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.email('Email must be valid'),
    password: z.string().min(3, 'Password must be atleast 6 characters')
});
export const loginSchema = z.object({
    email: z.email('Email must be valid'),
    password: z.string().min(6, 'Password must be at least 6 characters')
});
export const register = catchAsync(async (req, res) => {
    const { username, email, password } = registerSchema.parse(req.body);
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new AppError(403, 'Account already exists');
    }
    const hashPass = await bcrypt.hash(password, 10);
    await new userModel({ username, email, password: hashPass }).save();
    res.status(201).json({ message: 'Account created successfully' });
});
export const login = catchAsync(async (req, res) => {
    const { email, password } = loginSchema.parse(req.body);
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
        throw new AppError(404, 'Account not found');
    }
    const isValidPass = await bcrypt.compare(password, existingUser.password);
    if (!isValidPass) {
        throw new AppError(403, 'Wrong password');
    }
    const payload = {
        _id: existingUser._id,
        role: existingUser.role
    };
    const { access_token, refresh_token } = await generateTokens(payload);
    res.cookie('refreshToken', refresh_token, {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        secure: false,
        sameSite: 'none'
    });
    res.status(200).json({
        message: 'Login successfully',
        access_token,
        user: {
            _id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
            role: existingUser.role
        }
    });
});
//# sourceMappingURL=authService.js.map