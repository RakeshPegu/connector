import dotenv from "dotenv"
dotenv.config()

const envVar = ['PORT', 'DATABASE_URL', "REFRESH_SECRET_KEY"]
const missing = envVar.filter((name)=> !process.env[name])
if(missing.length >0){
    throw new Error(`Missing enviroment variable: ${missing.join(', ')}`)
}
interface envConfig {
    port : number,
    databaseUrl:string,
    refreshSecretKey:string,
    accessSecretKey:string
}
// as key word is used for type assertion which explicitly tel the compiler to treat a value as a specific type
export const config: envConfig = {
    port : Number(process.env.PORT) || 5500,
    databaseUrl: process.env.DATABASE_URL as string,
    refreshSecretKey : process.env.REFRESH_SECRET_KEY as string,
    accessSecretKey : process.env.ACCESS_SECRET_KEY as string
}
