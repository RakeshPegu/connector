import { type Request, type Response, type NextFunction} from 'express'
type AsyncFn=(req:Request, res:Response, next:NextFunction)=> Promise<void>
export const catchAsync =(fn:AsyncFn)=>{
    return (req:Request, res:Response, next:NextFunction)=>{
        return Promise.resolve(fn(req, res, next)).catch(next)

    }
}