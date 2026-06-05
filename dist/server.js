import express, {} from 'express';
import { config } from '#config/config.js';
import authRoutes from '#routes/auth.route.js';
import { AppError } from '#utils/errorHandler.js';
import { ZodError } from 'zod';
const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof ZodError) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid request payload',
            errors: err.format()
        });
    }
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    console.error(err);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
};
app.use(globalErrorHandler);
const server = app.listen(config.port, () => {
    console.log(`The server is listening on port ${config.port}`);
});
//# sourceMappingURL=server.js.map