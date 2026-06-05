import dotenv from "dotenv"
dotenv.config()

const envVar = ['PORT', 'DATABASE_URL', 'REFRESH_SECRET_KEY', 'ACCESS_SECRET_KEY']
const missing = envVar.filter((name) => !process.env[name])
if (missing.length > 0) {
  throw new Error(`Missing environment variable: ${missing.join(', ')}`)
}
interface envConfig {
  port: number
  databaseUrl: string
  refreshSecretKey: string
  accessSecretKey: string
  nodeEnv: string
}

export const config: envConfig = {
  port: Number(process.env.PORT) || 5500,
  databaseUrl: process.env.DATABASE_URL as string,
  refreshSecretKey: process.env.REFRESH_SECRET_KEY as string,
  accessSecretKey: process.env.ACCESS_SECRET_KEY as string,
  nodeEnv: process.env.NODE_ENV ?? 'development'
}

