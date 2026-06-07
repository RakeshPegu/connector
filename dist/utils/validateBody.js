import { ZodError } from "zod";
export const validateBody = (schema) => {
    return async function (req, res, next) {
        try {
            req.body = schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    status: "fail",
                    message: "Invalid request body",
                    errors: error.message
                });
            }
            next(error);
        }
    };
};
//# sourceMappingURL=validateBody.js.map