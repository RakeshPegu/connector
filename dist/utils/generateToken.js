import { config } from '#config/config.js';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
export const generateTokens = (payload) => {
    const access_token = jwt.sign(payload, config.accessSecretKey, { expiresIn: '15m' });
    const refresh_token = jwt.sign(payload, config.refreshSecretKey, { expiresIn: "14d" });
    return { access_token, refresh_token };
};
//# sourceMappingURL=generateToken.js.map