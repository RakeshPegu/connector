import dotenv from "dotenv";
dotenv.config();
const envVar = ['PORT', 'DATABASE_URL', 'REFRESH_SECRET_KEY', 'ACCESS_SECRET_KEY'];
const missing = envVar.filter((name) => !process.env[name]);
if (missing.length > 0) {
    throw new Error(`Missing environment variable: ${missing.join(', ')}`);
}
// ??  nullish Coalescing operator to provie a default value
// nullish coalescing only check for null/undefine
export const config = {
    port: Number(process.env.PORT) || 5500,
    databaseUrl: process.env.DATABASE_URL,
    refreshSecretKey: process.env.REFRESH_SECRET_KEY,
    accessSecretKey: process.env.ACCESS_SECRET_KEY,
    // if node_env is null or undefine then use the right side
    nodeEnv: process.env.NODE_ENV ?? 'development',
    razorPayKeyId: process.env.RAZOR_PAY_API_KEY_ID,
    razorPayKeySecret: process.env.RAZOR_PAY_KEY_SECRECT
};
//# sourceMappingURL=config.js.map