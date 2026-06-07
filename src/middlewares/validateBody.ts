import { ZodError, type ZodSchema } from "zod"
import type { Request, Response, NextFunction } from "express"

export const validateBody = (schema:ZodSchema)=>{
    return async function(req:Request, res:Response, next:NextFunction): Promise<void>{
        try {
            req.body = schema.parse(req.body)
            next()
            
        } catch (error) {
            if(error instanceof ZodError){
                res.status(400).json({
                    status:'fail',
                    message:"Invalid request body",
                    errors:error.message
                })
                // add return to prevent next() call after response
                return
            
            }
            next(error)
        
            
        }
    }
}