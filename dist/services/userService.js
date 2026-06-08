import { userModel } from "#models/db.js";
import { catchAsync } from "#utils/catchAsync.js";
import { AppError } from "#utils/errorHandler.js";
import {} from 'express';
import bcrypt from 'bcrypt';
import { z } from "zod";
export const deleteSchema = z.object({
    password: z.string().min(6, 'password must be atleast 6 characters ')
});
export const updateSchema = z.object({
    username: z.string().min(3, 'User name must be atleast 3 characters')
});
export const getUsers = catchAsync(async (req, res) => {
    const userRole = req.userRole;
    if (userRole !== 'admin') {
        throw new AppError(403, 'only admin is allowed');
    }
    const users = await userModel.find();
    if (users.length === 0) {
        throw new AppError(404, 'Not found');
    }
    res.status(200).json({ users: users });
});
export const getAnyParticularUser = catchAsync(async (req, res) => {
    const userRole = req.userRole;
    const particular_userId = req.params.Id;
    if (userRole !== 'admin') {
        throw new AppError(403, 'Only admin is allowed');
    }
    const user = await userModel.findById(particular_userId);
    if (!user) {
        throw new AppError(404, 'not found');
    }
    res.status(200).json({ user: user });
});
export const deleteAccount = catchAsync(async (req, res) => {
    const tokenUserId = req.userId;
    const { password } = deleteSchema.parse(req.body);
    if (!tokenUserId) {
        throw new AppError(401, 'Authentication is required');
    }
    const user = await userModel.findById(tokenUserId);
    if (!user) {
        throw new AppError(404, 'not found');
    }
    const userInfo = user;
    const isValidPassword = await bcrypt.compare(password, userInfo?.password);
    if (!isValidPassword) {
        throw new AppError(403, 'wrong password');
    }
    await userModel.findOneAndDelete({ _id: tokenUserId });
    res.status(200).json({ message: "Account has been deleted successfully" });
});
export const editsAcccountInfo = catchAsync(async (req, res) => {
    const tokenUserId = req.userId;
    const { username } = updateSchema.parse(req.body);
    if (!tokenUserId) {
        throw new AppError(401, 'Authentication is required');
    }
    const user = await userModel.findById(tokenUserId);
    if (!user) {
        throw new AppError(404, 'account not found');
    }
    const updatedAccountInfo = await userModel.findByIdAndUpdate(tokenUserId, { $set: { username: username } }, { new: true });
    res.status(201).json({ message: "Account has been updated successfully", updateAccount: updatedAccountInfo });
});
//# sourceMappingURL=userService.js.map