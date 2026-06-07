import express, {} from 'express';
import { login, loginSchema, logout, refreshToken, register, registerSchema, } from '#services/authService.js';
import { verifyRefreshToken } from '#middlewares/verifyRefreshToken.js';
import { verifyAccessToken } from '#middlewares/verifyAccessToken.js';
import { validateBody } from '#middlewares/validateBody.js';
const router = express.Router();
router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/refresh_token', verifyRefreshToken, refreshToken);
router.post('/logout', verifyAccessToken, logout);
export default router;
//# sourceMappingURL=auth.route.js.map