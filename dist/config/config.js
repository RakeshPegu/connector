import dotenv from "dotenv";
dotenv.config();
const envVar = ['PORT', 'DATABASE_URL', 'REFRESH_SECRET_KEY', 'ACCESS_SECRET_KEY'];
const missing = envVar.filter((name) => !process.env[name]);
if (missing.length > 0) {
    throw new Error(`Missing environment variable: ${missing.join(', ')}`);
}
export const config = {
    port: Number(process.env.PORT) || 5500,
    databaseUrl: process.env.DATABASE_URL,
    refreshSecretKey: process.env.REFRESH_SECRET_KEY,
    accessSecretKey: process.env.ACCESS_SECRET_KEY,
    nodeEnv: process.env.NODE_ENV ?? 'development'
};
//# sourceMappingURL=config.js.map