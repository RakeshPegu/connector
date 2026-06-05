export class AppError extends Error {
    statusCode;
    status;
    isOperational;
    constructor(statusCode, message) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : "error",
            this.isOperational = true;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=errorHandler.js.map