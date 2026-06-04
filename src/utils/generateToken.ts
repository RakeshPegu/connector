import { config } from '#config/config.js'
import jwt from 'jsonwebtoken'
import {Types} from 'mongoose'
interface Payload {
    _id:Types.ObjectId,
    role:string,
}
interface Tokens{
    access_token:string,
    refresh_token: string
}
export const generateTokens = (payload:Payload): Tokens=>{
    const access_token = jwt.sign(payload,  config.accessSecretKey, {expiresIn:'15m'})
    const refresh_token = jwt.sign(payload, config.refreshSecretKey, {expiresIn:"14d"})
    return {access_token, refresh_token}


}
