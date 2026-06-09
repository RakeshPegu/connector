import {Types} from 'mongoose'
// augment express Request type
declare global{
    namespace Express{
        interface Request {
            userId:Types.ObjectId,
            userRole:string
        }
    }
}