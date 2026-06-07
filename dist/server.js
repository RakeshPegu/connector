import express, {} from 'express';
import { config } from '#config/config.js';
import authRoutes from '#routes/auth.route.js';
import { AppError } from '#utils/errorHandler.js';
import { success, ZodError } from 'zod';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { logger } from '#utils/logger.js';
import mongoose from 'mongoose';
import client from 'prom-client';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timeStamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
mongoose.connect(config.databaseUrl).then(() => {
    logger.info('Database connected successfully');
}).catch((error) => {
    logger.error(`error in connecting to database, ${error}`);
});
app.post('/api/v1/test', (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "this is test route", success: true });
});
app.use('/api/v1/auth', authRoutes);
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
    logger.error('Unhandled error in request', { error: err.message });
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
};
app.use(globalErrorHandler);
const server = app.listen(config.port, () => {
    logger.info(`The server is listening on port ${config.port}`);
});
async function gracefulShutdown(signal) {
    logger.info('Received shutdown signal, closing server', { signal });
    // stop accepting new connections
    server.close(async (err) => {
        if (err) {
            logger.error('Error while closing server', { error: err.message });
            process.exit(1);
        }
        try {
            await mongoose.disconnect();
            logger.info('Database disconnected');
            // allow logger to flush if necessary (depending on transport)
            setTimeout(() => process.exit(0), 200);
        }
        catch (e) {
            logger.error('Error during shutdown', { error: e.message });
            process.exit(1);
        }
    });
    // force exit if not closed in time
    setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
    }, 30000);
}
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('unhandledRejection', async (reason, promise) => {
    logger.error('Unhandled Rejection', { reason, promise });
    await gracefulShutdown('unhandledRejection');
});
process.on('uncaughtException', async (error) => {
    logger.error('Uncaught exception', { error: error instanceof Error ? error.message : String(error) });
    await gracefulShutdown('uncaughtException');
});
//# sourceMappingURL=server.js.map