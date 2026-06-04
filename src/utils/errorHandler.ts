export class AppError extends Error{
    readonly statusCode: number
    readonly status : 'fail' | 'error'
    readonly isOperational: boolean
    constructor( statusCode:number, message:string){
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail':"error",
        this.isOperational = true
        Object.setPrototypeOf(this, new.target.prototype)
        Error.captureStackTrace(this, this.constructor)
    }
}