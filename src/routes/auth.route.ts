import express from 'express'
import {ZodError, type ZodSchema} from 'zod'
import { login, loginSchema, register, registerSchema,  } from '#services/authService.js'

const router = express.Router()
const validateBody = (schema:ZodSchema)=>{ 
    return function(req:express.Request, res:express.Response, next:express.NextFunction){
    try {
        req.body = schema.parse(req.body)
        
    } catch (error) {
        if(error instanceof ZodError){
            return res.status(400).json({
                status:'fail',
                message:"Invalid request body",
                errors:error.issues
            })
        }
        next(error)
        
    }

}
}



router.post('/register', validateBody(registerSchema), register)
router.post('/login', validateBody(loginSchema), login)

export default router
